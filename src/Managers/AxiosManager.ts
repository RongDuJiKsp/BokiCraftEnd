import axios, {AxiosResponse} from "axios";
import BackendBody from "../Body/BackendBody";

const AxiosManager = {
    post: (url: string, dataObj?: object, extraObj?: object) => {
        if (dataObj === undefined) dataObj = {};
        if (extraObj === undefined) extraObj = {};
        return new Promise<AxiosResponse<BackendBody>>((resolve, reject) => {
            axios({
                headers: {"Content-Type": "application/json;charset=utf8"},
                data: dataObj,
                url: url,
                method: "post",
                ...extraObj
            }).then(r => {
                resolve(r as AxiosResponse<BackendBody>);
            }, e => {
                reject(e);
            });
        })
    },
    get: (url: string, dataObj?: object, extraObj?: object) => {
        if (dataObj === undefined) dataObj = {};
        if (extraObj === undefined) extraObj = {};
        return new Promise<AxiosResponse<BackendBody>>((resolve, reject) => {
            axios({
                data: dataObj,
                url: url,
                method: "get",
                ...extraObj
            }).then(r => {
                resolve(r as AxiosResponse<BackendBody>);
            }, e => {
                reject(e);
            });
        })
    }
}
export default AxiosManager
