import AxiosManager from "./AxiosManager";
import UrlConfig from "../Config/UrlConfig";

type VerifyCodeResponse = {
    verifyCode: string,
    verifyCodeImgUrl: string,
    verifyCodeBase64: string,
    whRatio: string
}
const FunctionManager = {
    getVerifyCode: function (): Promise<VerifyCodeResponse> {
        return new Promise<VerifyCodeResponse>((resolve, reject) => {
            AxiosManager.get(UrlConfig.backendUrl + "/api/function/vcode").then(r => {
                    if (r.status !== 200) reject(r.statusText);
                    if (r.data.code !== 1) reject(r.data["msg"]);
                    resolve(r.data.data as VerifyCodeResponse);
                }, e => {
                    reject(e);
                }
            )
        })
    }
}
export default FunctionManager;