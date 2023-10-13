import AxiosManager from "./AxiosManager";
import UrlConfig from "../Config/UrlConfig";
import StatusCodeEnum from "../Enums/StatusCodeEnum";

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
                    else if (r.data.code === StatusCodeEnum.Fatal) reject(r.data.msg);
                    else if ("code" in r.data.data && "msg" in r.data.data && r.data.data.code !== 1) reject(r.data.data.msg);
                    else if ("data" in r.data.data) resolve(r.data.data.data as VerifyCodeResponse);
                    else reject("Unknown Error in Manager")
                }, e => {
                    reject(e);
                }
            )
        })
    },
    getBase64: function (file: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });

    }
}
export default FunctionManager;