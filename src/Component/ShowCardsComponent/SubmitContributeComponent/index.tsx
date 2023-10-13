import {App, Form, Input, Rate, Segmented, Space, Upload} from "antd";
import {SegmentedLabeledOption} from "antd/es/segmented";
import {BarsOutlined, CameraOutlined, LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {forwardRef, JSX, useImperativeHandle, useState} from "react";
import FunctionManager from "../../../Managers/FunctionManager";
import {RcFile} from "antd/es/upload";
import Contribute from "../../../Model/Contribute";
import AxiosManager from "../../../Managers/AxiosManager";
import UrlConfig from "../../../Config/UrlConfig";
import StatusCodeEnum from "../../../Enums/StatusCodeEnum";

const SubmitContributeComponent = forwardRef((props: any, ref: any) => {
    const app = App.useApp();
    const [selectForm, setSelectForm] = useState<string>("card");
    const [headBase64, setHeadBase64] = useState<string>("");
    const [headLoading, setHeadLoading] = useState<boolean>(false);
    const [coverBase64, setCoverBase64] = useState<string>("");
    const [coverLoading, setCoverLoading] = useState<boolean>(false);
    const form = Form.useForm()[0];
    const beforeHeadUpload = async (file: RcFile) => {
        setHeadLoading(true);
        let base64: string = await FunctionManager.getBase64(file);
        app.message.success("Ok");
        setHeadBase64(base64);
        setHeadLoading(false);
        return false;
    }
    const beforeCoverUpload = async (file: RcFile) => {
        setCoverLoading(true);
        let base64: string = await FunctionManager.getBase64(file);
        app.message.success("Ok");
        setCoverBase64(base64);
        setCoverLoading(false);
        return false;
    }
    const onSubmit = (): void => {
        props.methods.setIsModalLoading(true);
        let toSubmit: Contribute | null = null;
        if (selectForm === "card") toSubmit = new Contribute(888, form.getFieldValue("mainTag"), form.getFieldValue("othTag"),
            coverBase64, headBase64, form.getFieldValue("userName"), form.getFieldValue("commitName"),
            new Date().toLocaleString(), 0, true, 0, form.getFieldValue("commit"));
        else toSubmit = new Contribute(888, "", "", "", headBase64, form.getFieldValue("userName"), form.getFieldValue("commitName"),
            new Date().toLocaleString(), 0, false, form.getFieldValue("rate"), form.getFieldValue("commit"));
        AxiosManager.post(UrlConfig.backendUrl + "/api/contribute/submit", {
            ...toSubmit,
            token: form.getFieldValue("token")
        }, {}).then(r => {
            if (r.data.code === StatusCodeEnum.Success) app.message.success("OK!").then(r => {
                props.methods.setIsModalOpen(false);
            });
            else {
                app.message.error(r.data.msg).then();
            }
            props.methods.setIsModalLoading(false);
        }, e => {
            props.methods.setIsModalLoading(false);
            app.message.error(e.toString()).then();
        })
    }
    useImperativeHandle(ref, () => {
        return {
            onSubmit: onSubmit
        };
    })


    const segOption: SegmentedLabeledOption[] = [{
        value: "card",
        label: "提交评价",
        icon: <CameraOutlined/>
    }, {
        value: "commit",
        label: "提交反馈",
        icon: <BarsOutlined/>
    }];
    const uploadButton = (loading: boolean) => {
        return (
            <div>
                {loading ? <LoadingOutlined/> : <PlusOutlined/>}
                <div style={{marginTop: 8}}>Upload</div>
            </div>
        )
    }
    const render: { card: JSX.Element, commit: JSX.Element } = {
        card: <>
            <Space>
                <Form.Item label="主标签" name="mainTag">
                    <Input/>
                </Form.Item>
                <Form.Item label="辅助标签" name="othTag">
                    <Input/>
                </Form.Item>
            </Space>
            <Form.Item label="标题" name="commit">
                <Input/>
            </Form.Item>
            <Form.Item label={"上传评价封面"}>
                <Upload listType={coverBase64 ? "text" : "picture-circle"} showUploadList={false}
                        beforeUpload={beforeCoverUpload}>
                    {coverBase64 ?
                        <img src={coverBase64} alt="avatar" className={"w-full h-full"}/> : uploadButton(coverLoading)}
                </Upload>
            </Form.Item>
        </>,
        commit: <>
            <Form.Item label="评分" name="rate">
                <Rate allowHalf allowClear/>
            </Form.Item>
            <Form.Item label="评价" name="commit">
                <Input.TextArea allowClear autoSize={{minRows: 3, maxRows: 7}} showCount maxLength={128}/>
            </Form.Item>
        </>
    }

    return <>
        <Segmented defaultValue={"card"} options={segOption} onChange={e => setSelectForm(e as string)}/>
        <Form form={form} className={"my-8"}>
            <Form.Item label="口令" name={"token"}>
                <Input/>
            </Form.Item>
            <Form.Item label="用户名称" name={"userName"}>
                <Input/>
            </Form.Item>
            <Form.Item label="用户称号" name={"commitName"}>
                <Input/>
            </Form.Item>
            <Form.Item label="上传头像">
                <Upload listType="picture-card" showUploadList={false} beforeUpload={beforeHeadUpload}>
                    {headBase64 ?
                        <img src={headBase64} alt="avatar" style={{width: '100%'}}/> : uploadButton(headLoading)}
                </Upload>
            </Form.Item>
            {selectForm === "card" ? render.card : render.commit}
        </Form>
    </>
})
export default SubmitContributeComponent;