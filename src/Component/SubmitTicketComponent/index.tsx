import {App, Button, Form, Input} from "antd";
import Ticket from "../../Model/Ticket";
import AxiosManager from "../../Managers/AxiosManager";
import UrlConfig from "../../Config/UrlConfig";
import StatusCodeEnum from "../../Enums/StatusCodeEnum";
import {useLoginState} from "../../Hooks/useLoginState";
import {Link} from "react-router-dom";
import AuthorityEnum from "../../Enums/AuthorityEnum";

const SubmitTicketComponent = () => {
    const [form] = Form.useForm<string>();
    const loginState = useLoginState();
    const APP = App.useApp();
    const Submit = () => {
        let data = new Ticket(loginState.userID, form.getFieldValue("context"), new Date().toString());
        AxiosManager.post(UrlConfig.backendUrl + "/api/ticket", data, {}).then(r => {
            if (r.data.code === StatusCodeEnum.Success) APP.message.success("Submit Success").then();
            else APP.message.error(r.data.toString()).then();
        }, e => {
            APP.message.error(e.toString()).then();
        });
    }
    const RForm = <Form form={form} onFinish={Submit}>
        <Form.Item name="context" label="反馈内容" rules={[{
            required: true,
            message: "反馈为空！请不要提交空反馈"
        }, {
            message: "输入内容包含危险内容！",
            pattern: /^(?!use|root|Xieyu|adminstor|admin|select|update|union|and|or|delete|insert|truncate|char|into|substr|ascii|declare|exec|count|master|drop|execute)/
        }]}><Input.TextArea autoSize={{minRows:20,maxRows:20}} showCount  maxLength={1500}/></Form.Item>
        <div className={"text-center"}><Button  type="primary" htmlType="submit">SUBMIT</Button></div>
    </Form>
    const NoUser = <>
        未检测到您的登录信息，请
        <Link to={"/"}>登录</Link>
    </>
    return loginState.userAuthority === AuthorityEnum.None ? NoUser : RForm;
}
export default SubmitTicketComponent;