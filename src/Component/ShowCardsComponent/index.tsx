import {App, Avatar, Button, Card, Col, Image, List, Modal, Rate, Row, Space, Tag} from "antd";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Contribute from "../../Model/Contribute";
import SubmitContributeComponent from "./SubmitContributeComponent";
import AxiosManager from "../../Managers/AxiosManager";
import UrlConfig from "../../Config/UrlConfig";
import StatusCodeEnum from "../../Enums/StatusCodeEnum";
import {FieldTimeOutlined, LikeTwoTone} from "@ant-design/icons";

const ShowCardsComponent = () => {
    const app = App.useApp();
    const refs = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isModelLoading, setIsModelLoading] = useState<boolean>(false)
    const [cardList, setCardList] = useState<Contribute[]>([]);
    const [commitList, setCommitList] = useState<Contribute[]>([]);
    const [mapping, setMapping] = useState<Map<number, boolean>>(new Map<number, boolean>());
    const refreshCardList = useCallback(async () => {
        console.log("rrrr");
        try {
            const response = await AxiosManager.get(UrlConfig.backendUrl + "/api/contribute/getcard", {}, {});
            if (response.data.code === StatusCodeEnum.Success) {
                setCardList(response.data.listData);
                let mapped = new Map<number, boolean>();
                response.data.listData.forEach(e => {
                    mapped.set((e as Contribute).id, false);
                })
                setMapping(mapped);
            } else app.message.error(response.data.msg);
        } catch (e: any) {
            app.message.error(e.toString());
        }
    }, [app.message])
    const refreshCommitList = useCallback(async () => {
        console.log("rrrr");
        try {
            const response = await AxiosManager.get(UrlConfig.backendUrl + "/api/contribute/getcommit", {}, {});
            if (response.data.code === StatusCodeEnum.Success) {
                setCommitList(response.data.listData);
            } else app.message.error(response.data.msg);
        } catch (e: any) {
            app.message.error(e.toString());
        }
    }, [app.message]);
    useEffect(() => {
        refreshCardList().then();
        refreshCommitList().then();
    }, [refreshCardList, refreshCommitList]);
    const onLiked = useCallback((that: Contribute) => {
        AxiosManager.post(UrlConfig.backendUrl + "/api/contribute/like", that, {}).then();
        setMapping(mp => {
            mp.set(that.id, true);
            return new Map<number, boolean>(mp);
        })
    }, []);
    const showListRender = useCallback((item: Contribute, index: number) => {
        const card = <Card hoverable={true} className={"my-8 mx-4"}
                           cover={<Image src={item.showBase64}/>}>
            <Space><Tag color={"gold"}>{item.mainTag}</Tag> <Tag color={"orange"}>{item.othTag}</Tag></Space>
            <h1>{item.commit}</h1>
            <Row>
                <Col span={12}>
                    <Card.Meta avatar={<Avatar src={item.headBase64}/>} title={item.userName}
                               description={item.commitName}></Card.Meta>
                </Col>
                <Col span={6} offset={6}>
                    <Space>
                        <LikeTwoTone twoToneColor={mapping.get(item.id) ? "red" : "blue"} onClick={() => {
                            onLiked(item);
                            item.liked++;
                        }}/>
                        {item.liked}
                    </Space>
                </Col>
            </Row>
            <Space className={"m-3"}>
                <FieldTimeOutlined/>
                {item.dateStr}
            </Space>
        </Card>
        const commit = <Card className={"my-8 mx-4"}>
            <Row>
                <Col span={4}>
                    <Card.Meta avatar={<Avatar src={item.headBase64}/>} title={item.userName}
                               description={item.commitName}></Card.Meta>
                </Col>
                <Col span={8} offset={12}>
                    <Rate disabled allowHalf value={item.starCnt}/>
                </Col>
            </Row>
            <p>
                {item.commit}
            </p>
        </Card>
        return item.hasPicture ? card : commit;
    }, [mapping,onLiked])
    return (<>
        <div className={"mx-16"}>
            <h1>照片展示</h1>
            <h3 className={"text-gray-600"}><strong>(不定期更新)</strong> 可以向腐竹投稿自己的精美截图，征集各类照片</h3>
            <List pagination={{
                position: 'bottom',
                align: 'end',
                pageSize: 6,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
            }} grid={{column: 3}} renderItem={showListRender}
                  dataSource={cardList}/>
            <Button className={"mx-4"} onClick={() => setIsModalOpen(true)}>点击投稿或者评论</Button>
        </div>
        <div className={"bg-blue-50 text-center py-16 my-4"}>
            <h1>收到的玩家反馈</h1>
            <div className={"mx-16"}>
                <List pagination={{position: 'bottom', align: 'start', pageSize: 2, simple: true}} grid={{column: 2}}
                      renderItem={showListRender}
                      dataSource={commitList}/>
            </div>
        </div>
        <Modal title="创建一个投稿" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => {
            if (refs.current && "onSubmit" in refs.current) (refs.current as any).onSubmit();
        }}
               destroyOnClose={true}
               confirmLoading={isModelLoading}>
            <SubmitContributeComponent methods={{
                setIsModalLoading: setIsModelLoading,
                setIsModalOpen: setIsModalOpen
            }} ref={refs}/>
        </Modal>
    </>)
}
export default ShowCardsComponent