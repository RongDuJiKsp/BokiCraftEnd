import Ticket from "../../../Model/Ticket";
import AxiosManager from "../../../Managers/AxiosManager";
import UrlConfig from "../../../Config/UrlConfig";
import StatusCodeEnum from "../../../Enums/StatusCodeEnum";
import {useState} from "react";
import ProcessingStateEnum from "../../../Enums/ProcessingStateEnum";
import {App, Button, Form, Input, Radio, Space} from "antd";
import {useLoginState} from "../../../Hooks/useLoginState";
import AuthorityEnum from "../../../Enums/AuthorityEnum";

type prop = {
    element: Ticket,
    toFresh: () => void
}
const WriteResponseComponent = (props: prop) => {
    const [inputText, setInputText] = useState("");
    const [pendingStatus, setPendingStatus] = useState(ProcessingStateEnum.Resolved);
    const app = App.useApp();
    const loginState = useLoginState();
    const onSubmit = () => {
        props.element.pendingStatus = pendingStatus;
        props.element.response = inputText;
        props.element.responseTime = new Date().toString();
        console.log(props.element);
        AxiosManager.post(UrlConfig.backendUrl + "/api/ticket/updateone", props.element, {}).then(r => {
            if (r.data.code === StatusCodeEnum.Success) {
                app.message.success(r.data.msg).then();
                props.toFresh();
            } else app.message.error(r.data.msg).then();
        }, e => {
            app.message.error(e.toString()).then();
        })
    }
    const showWindow = {
        Asker: <div>
                <p>反馈内容：{props.element.context}</p>
                <p>回复内容：{props.element.response}</p>
        </div>,
        Acceptor: <div>
            <p>反馈内容：{props.element.context}</p>
            <Form.Item label={"回复内容"}>
                <Input.TextArea autoSize={{maxRows: 8, minRows: 4}} showCount maxLength={250}
                                onChange={(e) => {
                                    setInputText(e.target.value)
                                }}/>
            </Form.Item>
            <Space>
                <Form.Item label={"设置状态"}>
                    <Radio.Group onChange={(e) => {
                        setPendingStatus(e.target.value);
                    }} defaultValue={ProcessingStateEnum.Resolved}>
                        <Radio.Button value={ProcessingStateEnum.Delayed}>Delayed</Radio.Button>
                        <Radio.Button value={ProcessingStateEnum.Pending}>Pending</Radio.Button>
                        <Radio.Button value={ProcessingStateEnum.Rejected}>Rejected</Radio.Button>
                        <Radio.Button value={ProcessingStateEnum.Resolved}>Resolved</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Space>
            <Button type={"primary"} onClick={onSubmit}>提交所有内容</Button>
        </div>
    }
    return loginState.userAuthority === AuthorityEnum.Acceptor ? showWindow.Acceptor : showWindow.Asker;
}
export default WriteResponseComponent;