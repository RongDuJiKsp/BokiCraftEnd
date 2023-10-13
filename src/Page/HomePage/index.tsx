import back from "./Boki.png"
import SelectWayComponent from "../../Component/SelectWayComponent";
import {Col, Row} from "antd";
import {useLoginState} from "../../Hooks/useLoginState";
import AuthorityEnum from "../../Enums/AuthorityEnum";
import UrlConfig from "../../Config/UrlConfig";

const HomePage = () => {
    const stat = useLoginState();
    const loginWindow =
        <Col span={8} className={"bg-purple-300/30 p-3 rounded-lg border-8 border-purple-400 h-[400px]"}>
            <SelectWayComponent/>
        </Col>
    const nullWindow =
        <Col span={8} className={" p-3 h-[340px]"}>
        </Col>
    return <div>
        <div style={{backgroundImage: `url(${back})`}}
             className={"bg-no-repeat scale-90 bg-cover"}>
            <div className={"py-48  content-center items-center bg-purple-400/40"}>
                <Row>
                    <Col span={10} className={"text-center"}>
                        <h1><strong className={"text-white text-6xl font-sans"}>速来加入我们</strong></h1>
                        <p className={"text-white text-2xl font-mono"}>把力所能及的做到最好的呈现给你</p>
                        <a href={UrlConfig.inviteGroupUrl} rel="noreferrer" target={"_blank"}>
                            <div
                                className={"mt-3 w-1/2 h-1/6 text-xl pb-16 text-white mx-auto rounded-full border-2 border-green-500 hover:bg-blue-300/30  border-solid duration-300"}>
                                <p>点击加入讨论群</p>
                            </div>
                        </a>
                        <p className={"text-white text-2xl font-mono"}>官网注册后才可进入服务器！</p>
                    </Col>
                    <Col span={4}></Col>
                    {stat.userAuthority === AuthorityEnum.None ? loginWindow : nullWindow}
                    <Col span={2}>

                    </Col>
                </Row>
            </div>

        </div>
    </div>
}
export default HomePage;