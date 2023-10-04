import AuthorityEnum from "../Enums/AuthorityEnum";

class Account {
    userID: string;
    password: string;
    authority: AuthorityEnum;

    constructor(userID: string, password?: string, authority?: AuthorityEnum) {
        if (authority === undefined) this.authority = AuthorityEnum.None;
        else this.authority = authority;
        this.password = password === undefined ? "" : password;
        this.userID = userID;
    }
}

export default Account;