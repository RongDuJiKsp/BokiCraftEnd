import {App, Button, Form, Input} from "antd";
import React from "react";
import {BugOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import {useLoginState} from "../../../Hooks/useLoginState";
import {useVerifyCode} from "../../../Hooks/useVerifyCode";
import StatusCodeEnum from "../../../Enums/StatusCodeEnum";


const LoginComponent = () => {
    const [form] = Form.useForm<string>();
    const user = useLoginState();
    const VCode = useVerifyCode();
    const app = App.useApp();

    function Submit(): void {
        user.login(form.getFieldValue("userID"), form.getFieldValue("password")).then(r => {
            if (r.data.code === StatusCodeEnum.Success) app.message.success("Welcome," + r.data.dataText).then();
            else app.message.error("发生错误：" + r.data.msg).then();
        }, e => {
            app.message.error("发生错误：" + e.toString()).then();
        });
    }

    return (<Form form={form} onFinish={Submit}>
        <Form.Item name="userID"><Input placeholder="userGameID" prefix={<UserOutlined/>}/></Form.Item>
        <Form.Item name="password"><Input.Password placeholder="password" prefix={<LockOutlined/>}/></Form.Item>
        <div>
            <Form.Item name="vcode"
                       help={VCode.vCodeStatus ? "看不清？点击图片换一个 (不区分大小写)" : "验证码错误！请检查"}
                       validateStatus={VCode.vCodeStatus ? "success" : "error"}>
                <Input placeholder="VerifyCode" prefix={<BugOutlined/>} onChange={(e) => {
                    VCode.verifyStr(e.target.value);
                }}/></Form.Item>
            <img onClick={VCode.refresh} alt="点击切换验证码" src={VCode.vCode.url}/>
        </div>
        <Button type="primary" htmlType="submit">SubMit</Button>
    </Form>)
}
export default LoginComponent;