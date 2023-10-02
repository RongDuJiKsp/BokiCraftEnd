import {App, Button, Form, Input} from "antd";
import React from "react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useLoginState} from "../../../Hooks/useLoginState";
import {useVerifyCode} from "../../../Hooks/useVerifyCode";
import StatusCodeEnum from "../../../Enums/StatusCodeEnum";
import VerifyCodeComponent from "../../VerifyCodeComponent";

const LoginComponent = () => {
    const [form] = Form.useForm<string>();
    const user = useLoginState();
    const VCode = useVerifyCode();
    const app = App.useApp();

    function Submit(): void {
        if (!VCode.notNullVerify(VCode.lastChecked)) return;
        VCode.refresh();
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
        <VerifyCodeComponent/>
        <Button type="primary" htmlType="submit">SubMit</Button>
    </Form>)
}
export default LoginComponent;