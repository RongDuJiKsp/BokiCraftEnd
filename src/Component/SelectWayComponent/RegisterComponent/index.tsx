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
            if (r.data.code === StatusCodeEnum.Success) app.message.success("注册成功！").then();
            else app.message.error("注册失败，原因:  " + r.data.msg).then();
        }, e => {
            app.message.error("注册失败，原因:  " + e.toString()).then();
        });
    }

    return (<Form form={form} onFinish={Submit}>
        <Form.Item rules={[{
            required: true,
            message: "请输入待注册的账号"
        }, {
            message: "输入内容包含危险内容！",
            pattern: /^(?!use|root|Xieyu|adminstor|admin|select|update|union|and|or|delete|insert|truncate|char|into|substr|ascii|declare|exec|count|master|drop|execute)/
        },{
            message:"账号只允许数字字母下划线！",
            pattern:/^\w+$/,
        }]} name="userID">
            <Input placeholder="userGameID" allowClear prefix={<UserOutlined/>}/>
        </Form.Item>
        <Form.Item rules={[{
            required: true,
            message: "请输入密码"
        }, {
            message: "输入内容包含危险内容！",
            pattern: /^(?!use|root|Xieyu|adminstor|admin|select|update|union|and|or|delete|insert|truncate|char|into|substr|ascii|declare|exec|count|master|drop|execute)/
        },{
            message:"密码只允许数字字母下划线！",
            pattern:/^\w+$/,
        }]} name="password">
            <Input.Password placeholder="password" allowClear onChange={() => setIsCommonPassword(true)}
                            prefix={<LockOutlined/>}/>
        </Form.Item>
        <Form.Item rules={[{
            required: true,
            message: "请输入密码"
        }, {
            message: "输入内容包含危险内容！",
            pattern: /^(?!use|root|Xieyu|adminstor|admin|select|update|union|and|or|delete|insert|truncate|char|into|substr|ascii|declare|exec|count|master|drop|execute)/
        },{
            message:"密码只允许数字字母下划线！",
            pattern:/^\w+$/,
        }]} name="repeatpassword" help={isCommonPassword ? "" : "两次输入的密码不一致！"}
                   validateStatus={isCommonPassword ? "success" : "error"}>
            <Input.Password placeholder="repeatpassword" allowClear
                            prefix={<LockOutlined/>}
                            onChange={() => setIsCommonPassword(true)}/>
        </Form.Item>
        <VerifyCodeComponent/>
        <Button type="primary" htmlType="submit">SubMit</Button>
    </Form>)
}
export default RegisterComponent;