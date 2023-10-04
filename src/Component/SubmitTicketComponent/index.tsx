import {App, Button, Form, Input, Radio} from "antd";
import Ticket from "../../Model/Ticket";
import AxiosManager from "../../Managers/AxiosManager";
import UrlConfig from "../../Config/UrlConfig";
import StatusCodeEnum from "../../Enums/StatusCodeEnum";
import {useLoginState} from "../../Hooks/useLoginState";
import TicketConfig from "../../Config/TicketConfig";
import TicketTagEnum from "../../Enums/TicketTagEnum";
import {useState} from "react";

const SubmitTicketComponent = () => {
    const [form] = Form.useForm<string>();
    const loginState = useLoginState();
    const APP = App.useApp();
    const [tag, setTag] = useState(TicketTagEnum.Null);
    const Submit = () => {
        let data = new Ticket(loginState.userID, form.getFieldValue("context"), new Date().toString(), tag);
        AxiosManager.post(UrlConfig.backendUrl + "/api/ticket", data, {}).then(r => {
            if (r.data.code === StatusCodeEnum.Success) APP.message.success("Submit Success").then();
            else APP.message.error(r.data.msg).then();
        }, e => {
            APP.message.error(e.toString()).then();
        });
    }
    return <Form form={form} onFinish={Submit}>
        <Form.Item name={"tag"} label={"反馈标签"}
                   help={TicketConfig[tag].description}  rules={[{
            required: true,
            message: "请填写反馈标签！"
        }]}>
            <Radio.Group  onChange={(e) => {
                setTag(e.target.value);
            }}>
                <Radio.Button value="Bug">Bug</Radio.Button>
                <Radio.Button value="Invalid">Invalid</Radio.Button>
                <Radio.Button value="Wanted">Wanted</Radio.Button>
                <Radio.Button value="Question">Question</Radio.Button>
            </Radio.Group>
        </Form.Item>
        <Form.Item name="context" label="反馈内容" rules={[{
            required: true,
            message: "反馈为空！请不要提交空反馈"
        }, {
            message: "输入内容包含危险内容！",
            pattern: /^(?!use|root|Xieyu|adminstor|admin|select|update|union|and|or|delete|insert|truncate|char|into|substr|ascii|declare|exec|count|master|drop|execute)/
        }]}><Input.TextArea autoSize={{minRows: 20, maxRows: 20}} showCount maxLength={250}/></Form.Item>
        <div className={"text-center"}><Button type="primary" htmlType="submit">SUBMIT</Button></div>
    </Form>;
}
export default SubmitTicketComponent;