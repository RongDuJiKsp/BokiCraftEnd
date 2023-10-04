import {App, Button, Space, Table, Tag} from "antd";
import Ticket from "../../Model/Ticket";
import TicketConfig from "../../Config/TicketConfig";
import TicketTagEnum from "../../Enums/TicketTagEnum";
import AxiosManager from "../../Managers/AxiosManager";
import UrlConfig from "../../Config/UrlConfig";
import {useLoginState} from "../../Hooks/useLoginState";
import Account from "../../Model/Account";
import {useState} from "react";
import ProcessingStateConfig from "../../Config/ProcessingStateConfig";
import ProcessingStateEnum from "../../Enums/ProcessingStateEnum";
import StatusCodeEnum from "../../Enums/StatusCodeEnum";
import WriteResponseComponent from "../SubmitTicketComponent/WriteResponseComponent";
import AuthorityEnum from "../../Enums/AuthorityEnum";

type columnIndex = {
    id: string,
    title: string,
    dataIndex: string
    render?: (element: any, record?: any) => any
}
const GetTicketListComponent = () => {
    const loginState = useLoginState();
    const [dataSources, setDataSources] = useState<Ticket[]>([]);
    const app = App.useApp();
    const onDelete = (element: Ticket) => {
        AxiosManager.post(UrlConfig.backendUrl + "/api/ticket/deleteone", element, {}).then(r => {
            if (r.data.code === StatusCodeEnum.Success) {
                app.message.success(r.data.msg).then();
                freshData();
            } else app.message.error(r.data.msg).then();
        }, e => {
            app.message.error(e.toString()).then();
        })
    }
    const onWatch = (element: Ticket) => {
        app.modal.info({
            content: <WriteResponseComponent element={element} toFresh={freshData}/>
        });
    }

    const freshData = () => {
        AxiosManager.post(UrlConfig.backendUrl + "/api/ticket/" + (loginState.userAuthority === AuthorityEnum.Acceptor ? "getall" : "getone"), new Account(loginState.userID)).then(r => {
            setDataSources(r.data.listData);
        }, e => {
            app.message.error(e.toString()).then();
        })
    }
    const columns: columnIndex[] = [{
        id: "context",
        title: "内容",
        dataIndex: "context",
        render: (e): string => {
            const str: string = e as string;
            if (str.length <= 8) return str;
            else return str.substring(0, 8) + "....";
        }
    }, {
        id: "submitTime",
        title: "提交时间",
        dataIndex: "submitTime",
        render(e): string {
            const dateStr = e as string;
            return new Date(dateStr).toLocaleString();
        }
    }, {
        id: "pendingStatus",
        title: "判断状态",
        dataIndex: "pendingStatus",
        render: (element) => {
            return <div className={ProcessingStateConfig[element as ProcessingStateEnum].textColor}>{element}</div>
        }
    }, {
        id: "response",
        title: "回复",
        dataIndex: "response",
        render: (e): string => {
            const str: string = e as string;
            if (str === "") return "尚未得到回复";
            if (str.length <= 8) return str;
            else return str.substring(0, 8) + "....";
        }
    }, {
        id: "responseTime",
        title: "回复时间",
        dataIndex: "responseTime",
        render(e): string {
            const dateStr = e as string;
            if (dateStr === "") return "尚未得到回复";
            return new Date(dateStr).toLocaleString();
        }
    }, {
        id: "tag",
        title: "标签",
        dataIndex: "tag",
        render: (element) => {
            if (element === undefined || element === null) return <></>;
            return <Tag color={TicketConfig[element as TicketTagEnum].color}>{element}</Tag>
        }
    }, {
        id: "action",
        title: "操作",
        dataIndex: "action",
        render: (_, record) => {
            const r = record as Ticket;
            return <Space>
                <Button type={"primary"} onClick={() => onWatch(r)}>详细信息</Button>
                <Button type={"primary"} onClick={() => onDelete(r)} danger={true}>删除</Button>
            </Space>
        }
    }];

    return <>
        <Table bordered={true} dataSource={dataSources} columns={columns}/>
        <Button onClick={freshData} className={"my-8"}>刷新数据</Button>
    </>
}
export default GetTicketListComponent;