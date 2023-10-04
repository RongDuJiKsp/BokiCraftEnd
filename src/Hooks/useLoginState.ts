import {useState} from "react";
import AuthorityEnum from "../Enums/AuthorityEnum";
import {AxiosResponse} from "axios";
import AxiosManager from "../Managers/AxiosManager";
import UrlConfig from "../Config/UrlConfig";
import ExceptionEnum from "../Enums/ExceptionEnum";
import {createGlobalStore} from "hox";
import StatusCodeEnum from "../Enums/StatusCodeEnum";
import BackendBody from "../Body/BackendBody";
import Account from "../Model/Account";

export const [useLoginState, getLoginState] = createGlobalStore(function () {
        const [userID, setUserId] = useState<string>("");
        const [userAuthority, setUserAuthority] = useState<AuthorityEnum>(AuthorityEnum.None);

        function login(userGameID: string, password: string): Promise<AxiosResponse<BackendBody>> {
            return new Promise<AxiosResponse<BackendBody>>((resolve, reject) => {
                AxiosManager.post(UrlConfig.backendUrl + "/api/account/login", new Account(userGameID, password), {}).then(r => {
                    if (r.data.dataText === AuthorityEnum.None) reject(ExceptionEnum.MessageNotFoundException);
                    else if (r.data.code === StatusCodeEnum.Fatal) reject(r.data.msg);
                    else {
                        setUserId(userGameID);
                        setUserAuthority(r.data.dataText as AuthorityEnum);
                        resolve(r);
                    }
                }, e => {
                    reject(e);
                });
            })
        }

        function logout(): boolean {
            if (userAuthority === AuthorityEnum.None) return false;
            setUserAuthority(AuthorityEnum.None);
            setUserId("");
            return true;
        }

        return {
            userID,
            userAuthority,
            login,
            logout,
        }
    }
);