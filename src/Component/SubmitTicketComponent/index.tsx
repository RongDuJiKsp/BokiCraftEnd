import {App, Button, Form, Input} from "antd";
import Ticket from "../../Model/Ticket";
import AxiosManager from "../../Managers/AxiosManager";
import UrlConfig from "../../Config/UrlConfig";
import StatusCodeEnum from "../../Enums/StatusCodeEnum";

const SubmitTicketComponent = () => {
    const [form] = Form.useForm<string>();
    const APP = App.useApp();
    const Submit = () => {
        let data = new Ticket(form.getFieldValue("userName"), form.getFieldValue("context"), new Date().toString());
        console.log(data);
        AxiosManager.post(UrlConfig.backendUrl + "/api/ticket", data, {}).then(r => {
            if (r.data === StatusCodeEnum.Success) APP.message.success("Submit Success").then();
            else APP.message.error(r.data.toString()).then();
        }, e => {
            APP.message.error(e.toString()).then();
        });
    }
    return <Form form={form} onFinish={Submit}>
        <Form.Item name="userName" label="游戏内名称" rules={[{
            required: true,
            message: "请输入您的游戏内名称！"
        }]}><Input/></Form.Item>
        <Form.Item name="context" label="反馈内容" rules={[{
            required: true,
            message: "反馈为空！请不要提交空反馈"
        }, {
            message: "输入内容包含危险内容！",
            pattern: /^(?!use|root|Xieyu|adminstor|admin|select|update|union|and|or|delete|insert|truncate|char|into|substr|ascii|declare|exec|count|master|drop|execute)/
        }]}><Input.TextArea/></Form.Item>
        <Button type="primary" htmlType="submit">SUBMIT</Button>
    </Form>
}
export default SubmitTicketComponent;