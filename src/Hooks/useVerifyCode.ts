import {createGlobalStore} from "hox";
import {useState} from "react";
import FunctionManager from "../Managers/FunctionManager";
import {App} from "antd";

type vCodeBody = {
    url: string,
    code: string
}
export const [useVerifyCode, getVerifyCode] = createGlobalStore(() => {
    const app = App.useApp();
    const [vCode, setVCode] = useState<vCodeBody>({url: "", code: "IDontWantToCommon"});
    const [vCodeStatus, setVCodeStatus] = useState<boolean>(true);
    const [lastChecked, setLastChecked] = useState<string>("Init")
    const refresh = (): void => {
        FunctionManager.getVerifyCode().then(r => {
            setVCode({
                url: r.verifyCodeImgUrl,
                code: r.verifyCode.toLowerCase()
            });
        }, e => {
            app.message.error("验证码生成失败：原因：" + e.toString()).then();
        })
    }
    const verifyStr = (str: string): boolean => {
        str = str.toLowerCase();
        setLastChecked(str);
        if (str === "" || str === vCode.code) {
            setVCodeStatus(true);
            return true;
        } else {
            setVCodeStatus(false);
            return false;
        }
    }
    const notNullVerify = (str: string): boolean => {
        str = str.toLowerCase();
        setLastChecked(str);
        if (str === vCode.code) {
            setVCodeStatus(true);
            return true;
        } else {
            setVCodeStatus(false);
            return false;
        }
    }
    return {vCode, vCodeStatus, lastChecked, refresh, verifyStr, notNullVerify}
})