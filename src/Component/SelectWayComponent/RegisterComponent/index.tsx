import {App, Button, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {useVerifyCode} from "../../../Hooks/useVerifyCode";
import AxiosManager from "../../../Managers/AxiosManager";
import UrlConfig from "../../../Config/UrlConfig";
import Account from "../../../Model/Account";
import AuthorityEnum from "../../../Enums/AuthorityEnum";
import StatusCodeEnum from "../../../Enums/StatusCodeEnum";
import VerifyCodeComponent from "../../VerifyCodeComponent";

const RegisterComponent = () => {
    const [form] = Form.useForm<string>();
    const VCode = useVerifyCode();
    const app = App.useApp();
    const [isCommonPassword, setIsCommonPassword] = useState(true);

    function Submit() {
        if (!VCode.notNullVerify(VCode.lastChecked)) return;
        VCode.refresh();
        if (form.getFieldValue("password") !== form.getFieldValue("repeatpassword")) {
            setIsCommonPassword(false);
            return;
        }
        setIsCommonPassword(true);
        AxiosManager.post(UrlConfig.backendUrl + "/api/account/register", new Account(form.getFieldValue("userID"), form.getFieldValue("password"), AuthorityEnum.Asker)).then(r => {
            console.log(r.data);
            if (r.data.code === StatusCodeEnum.Success) app.message.success("注册成功！").then();
            else app.message.error("注册失败，原因:  " + r.data.msg).then();
        }, e => {
            app.message.error("注册失败，原因:  " + e.toString()).then();
        });
    }

    return (<Form form={form} onFinish={Submit}>
        <Form.Item name="userID">
            <Input placeholder="userGameID" prefix={<UserOutlined/>}/>
        </Form.Item>
        <Form.Item name="password">
            <Input.Password placeholder="password" onChange={() => setIsCommonPassword(true)}
                            prefix={<LockOutlined/>}/>
        </Form.Item>
        <Form.Item name="repeatpassword" help={isCommonPassword ? "" : "两次输入的密码不一致！"}
                   validateStatus={isCommonPassword ? "success" : "error"}>
            <Input.Password placeholder="repeatpassword"
                            prefix={<LockOutlined/>}
                            onChange={() => setIsCommonPassword(true)}/>
        </Form.Item>
        <VerifyCodeComponent/>
        <Button type="primary" htmlType="submit">SubMit</Button>
    </Form>)
}
export default RegisterComponent;