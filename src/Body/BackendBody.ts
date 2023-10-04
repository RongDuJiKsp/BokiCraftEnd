import StatusCodeEnum from "../Enums/StatusCodeEnum";

class BackendBody {
    code: StatusCodeEnum;
    data: object;
    msg: string;
    dataText: string;
    listData: any[];

    constructor(code: StatusCodeEnum, msg?: string, data?: object, dataText?: string, listData?: any[]) {
        if (data !== undefined) this.data = data;
        else this.data = {};
        if (msg !== undefined) this.msg = msg;
        else this.msg = "";
        if (dataText !== undefined) this.dataText = dataText;
        else this.dataText = "";
        if (listData !== undefined) this.listData = listData;
        else this.listData = [];
        this.code = code;
    }
}

export default BackendBody;