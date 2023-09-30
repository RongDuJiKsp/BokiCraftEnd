import {useState} from "react";
import AuthorityEnum from "../Enums/AuthorityEnum";
import {AxiosResponse} from "axios";
import AxiosManager from "../Managers/AxiosManager";
import UrlConfig from "../Config/UrlConfig";
import ExceptionEnum from "../Enums/ExceptionEnum";
import {createGlobalStore} from "hox";
export const [useLoginState, getLoginState] = createGlobalStore(function () {
        const [userID, setUserId] = useState<string>("");
        const [userAuthority, setUserAuthority] = useState<AuthorityEnum>(AuthorityEnum.None);

        function login(userGameID: string, password: string): Promise<AxiosResponse> {
            return new Promise<AxiosResponse>((resolve, reject) => {
                AxiosManager.get(UrlConfig.backendUrl + "/api/login", {
                    id: userGameID,
                    password: password,
                }, {}).then(r => {
                    if (r.data === AuthorityEnum.None) reject(ExceptionEnum.MessageNotFoundException);
                    setUserId(userGameID);
                    setUserAuthority(r.data);
                    resolve(r);
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