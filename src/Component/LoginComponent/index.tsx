import {Form, Input} from "antd";
import {useEffect, useState} from "react";
import FunctionManager from "../../Managers/FunctionManager";

type vCodeBody = {
    url: string,
    code: string
}
const LoginComponent = () => {
    const [form] = Form.useForm<string>();
    const [vCode, setVCode] = useState<vCodeBody>();
    const refresh = () => {
        FunctionManager.getVerifyCode().then(r => {
            console.log(r);
            setVCode({
                url: r.verifyCodeImgUrl,
                code: r.verifyCode
            });
        }, e => {
            console.log(e);
        })
    }
    useEffect(refresh, []);
    return (<Form form={form}>
        <Form.Item name="userID" label="账号"><Input/></Form.Item>
        <Form.Item name="password" label="密码"><Input/></Form.Item>
        <span>
            <Form.Item><Input/></Form.Item>
            <img onClick={refresh} alt="点击切换验证码" src={vCode === undefined ? "" : vCode.url}/>
        </span>
    </Form>)
}
export default LoginComponent;