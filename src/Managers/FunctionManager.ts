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
                    if ("code" in r.data.data && "msg" in r.data.data && r.data.data.code !== 1) reject(r.data.data.msg);
                    if ("data" in r.data.data) resolve(r.data.data.data as VerifyCodeResponse);
                    reject("Unknown Error in Manager")
                }, e => {
                    reject(e);
                }
            )
        })
    }
}
export default FunctionManager;