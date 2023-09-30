import {Button, Form, Input} from "antd";
import {BugOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import React from "react";
import {useVerifyCode} from "../../../Hooks/useVerifyCode";

const RegisterComponent = () => {
    const [form] = Form.useForm<string>();
    const VCode = useVerifyCode();

    function Submit() {

    }

    return (<Form form={form} onFinish={Submit}>
        <Form.Item name="userID"><Input placeholder="userGameID" prefix={<UserOutlined/>}/></Form.Item>
        <Form.Item name="password"><Input.Password placeholder="password" prefix={<LockOutlined/>}/></Form.Item>
        <Form.Item name="repeatpassword"><Input.Password placeholder="repeatpassword"
                                                         prefix={<LockOutlined/>}/></Form.Item>
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
export default RegisterComponent;