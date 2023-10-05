import {Col, Form, Input, Row} from "antd";
import {BugOutlined} from "@ant-design/icons";
import React from "react";
import {useVerifyCode} from "../../Hooks/useVerifyCode";

const VerifyCodeComponent = () => {
    const VCode = useVerifyCode();
    return <Row>
        <Col span={8}>
            <Form.Item help={VCode.vCodeStatus ? "看不清？点击图片换一个 (不区分大小写)" : "验证码错误！请检查"}
                       validateStatus={VCode.vCodeStatus ? "success" : "error"}>
                <Input allowClear placeholder="VerifyCode" prefix={<BugOutlined/>} onChange={(e) => {
                    VCode.verifyStr(e.target.value);
                }}/></Form.Item>
        </Col>
        <Col span={8}>
            <img onClick={VCode.refresh} alt="点击切换验证码" src={VCode.vCode.url} className={"h-1/2"}/>
        </Col>
    </Row>
}
export default VerifyCodeComponent