import {Button, Col, Layout, Row} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import RootRouter from "../../Router/RootRouter";
import boki from "./boki.png"
import {NavLink} from "react-router-dom";
import {useLoginState} from "../../Hooks/useLoginState";
import AuthorityEnum from "../../Enums/AuthorityEnum";

const RootComponent = () => {
    const inUser = useLoginState();
    const userTip = <>
        <>Welcome , {inUser.userID}</>
        <Button  className={"m-2"} type={"primary"} onClick={inUser.logout}>退出登录</Button>
    </>
    return <Layout>
        <Header className={"bg-white h-24 pt-4 pb-6 overflow-hidden"}>
            <Row>
                <Col span={8} className={"flex items-center overflow-hidden"}>
                    <img src={boki} className={"w-16 h-16 me-8 "} alt="Boki"/>
                    <div className={"flex flex-col leading-5 "}>
                        <strong className={"text-3xl font-sans text-blue-400"}>BokiCraft</strong>
                        <small className={"text-red-300 font-mono text-sm"}>A fantasy server you ever played</small>
                    </div>
                </Col>
                <Col span={2} className={"text-center "}>
                    <NavLink to={"/"} className={(props) => {
                        if (props.isActive) return " text-blue-400 hover:text-green-500";
                        else return "text-red-300 hover:text-yellow-600 ";
                    }}>
                        <p className={"text-xl pt-3 pb-4 m-0"}>主页</p>
                    </NavLink>
                </Col>
                <Col span={2} className={"text-center"}>
                    <NavLink to={"/about"} className={(props) => {
                        if (props.isActive) return " text-blue-400 hover:text-green-500";
                        else return "text-red-300 hover:text-yellow-600";
                    }}>
                        <p className={"text-xl  pt-3 pb-4 m-0"}>关于我们</p>
                    </NavLink>
                </Col>
                <Col span={2} className={"text-center"}>
                    <NavLink to={"/download"} className={(props) => {
                        if (props.isActive) return " text-blue-400 hover:text-green-500";
                        else return "text-red-300 hover:text-yellow-600";
                    }}>
                        <p className={"text-xl  pt-3 pb-4 m-0"}>下载资源</p>
                    </NavLink>
                </Col>
                <Col span={2} className={"text-center"}>
                    <NavLink to={"/ticket"} className={(props) => {
                        if (props.isActive) return " text-blue-400 hover:text-green-500";
                        else return "text-red-300 hover:text-yellow-600";
                    }}>
                        <p className={"text-xl  pt-3 pb-4 m-0"}>提交反馈</p>
                    </NavLink>
                </Col>
                <Col span={8} className={"text-center text-pink-400 align-bottom pt-1 text-xl"}>
                    {inUser.userAuthority === AuthorityEnum.None ? <></> : userTip}
                </Col>
            </Row>
        </Header>
        <Content>
            <RootRouter/>
        </Content>
        <Footer className={"flex justify-center items-center bg-gray-700 text-center text-yellow-200"}>
            BokiCraft ©2023 Created by MihuYouGemHsi
        </Footer>
    </Layout>
}
export default RootComponent;