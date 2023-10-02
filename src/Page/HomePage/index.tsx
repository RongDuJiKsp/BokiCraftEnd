import back from "./back.jpg"
import SelectWayComponent from "../../Component/SelectWayComponent";
import {Col, Row} from "antd";
import {useLoginState} from "../../Hooks/useLoginState";
import AuthorityEnum from "../../Enums/AuthorityEnum";

const HomePage = () => {
    const stat = useLoginState();
    const loginWindow =
        <Col span={8} className={"bg-purple-300/30 p-3 rounded-lg border-8 border-purple-400 h-[340px]"}>
            <SelectWayComponent/>
        </Col>
    const nullWindow =
        <Col span={8} className={" p-3 h-[340px]"}>
        </Col>
    return <div>
        <div style={{backgroundImage: `url(${back})`}}
             className={"py-48 bg-no-repeat bg-cover content-center items-center"}>
            <Row>
                <Col span={8}></Col>
                <Col span={6}></Col>
                {stat.userAuthority === AuthorityEnum.None ? loginWindow : nullWindow}
                <Col span={2}>

                </Col>
            </Row>
        </div>
    </div>
}
export default HomePage;