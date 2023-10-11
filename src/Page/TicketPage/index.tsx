import SubmitTicketComponent from "../../Component/SubmitTicketComponent";
import {Col, Row} from "antd";
import {Link, useSearchParams} from "react-router-dom";
import GetTicketListComponent from "../../Component/GetTicketListComponent";
import {useLoginState} from "../../Hooks/useLoginState";
import AuthorityEnum from "../../Enums/AuthorityEnum";

const TicketPage = () => {
    const loginState=useLoginState();
    const [param] = useSearchParams();
    const extra = <>
        <Col span={8} className={"bg-amber-100  text-center"}>
            <div className={"my-16 text-3xl text-gray-600"}>您的反馈会使得我们做的更好！</div>
            <div className={"my-16 text-3xl text-gray-700"}>
                <p>广告位招租，详情请发邮件至下面邮箱</p>
                <p>rdjksp@gmail.com</p>
                <p>rdjksp@qq.com</p>
            </div>
        </Col>
        <Col span={2}></Col>
    </>
    const NoUser = <div className={"my-16 text-center"}>
        未检测到您的登录信息，请
        <Link to={"/"}>登录</Link>
    </div>
    const Rander = <Row className={"my-12"}>
        <Col span={2}></Col>
        <Col span={param.get("p") === "0" ? 10 : 20} className={"my-16"}>
            {param.get("p") === "0" ? <SubmitTicketComponent/> : <GetTicketListComponent/>}
        </Col>
        <Col span={2}></Col>
        {param.get("p") === "0" ? extra : <></>}
    </Row>
    return loginState.userAuthority===AuthorityEnum.None?NoUser:Rander;
}
export default TicketPage;