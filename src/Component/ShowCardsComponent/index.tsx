import {App, Avatar, Button, Card, Col, Image, List, Modal, Row, Space, Tag} from "antd";
import React, {useEffect, useRef, useState} from "react";
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
    const refreshCardList = async () => {
        try {
            const response = await AxiosManager.get(UrlConfig.backendUrl + "/api/contribute/getcard", {}, {});
            if (response.data.code === StatusCodeEnum.Success) {
                setCardList(response.data.listData);
            } else app.message.error(response.data.msg);
        } catch (e: any) {
            app.message.error(e.toString());
        }
    }
    const refreshCommitList = () => {
        setCommitList([new Contribute(1, "", "", "", "", "BoBo", "King", "date", 111, false, 2, "999")]);
    }
    useEffect(() => {
        refreshCommitList();
        refreshCardList()
    }, []);
    const onLiked = (that: Contribute) => {
        AxiosManager.post(UrlConfig.backendUrl+"/api/contribute/like",that,{}).then();
    }
    const showListRender = (item: Contribute, index: number) => {
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
                        <LikeTwoTone twoToneColor={true ? "red" : "blue"} onClick={() =>{
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
        const commit = <Card>

        </Card>
        return item.hasPicture ? card : commit;
    }
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
                <List pagination={{position: 'bottom', align: 'start', pageSize: 3, simple: true}} grid={{column: 3}}
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