import StatusCodeEnum from "../Enums/StatusCodeEnum";

class BackendBody {
    code: StatusCodeEnum;
    data: object;
    msg: string;
    dataText: string;

    constructor(code: StatusCodeEnum, msg?: string, data?: object, dataText?: string) {
        if (data !== undefined) this.data = data;
        else this.data = {};
        if (msg !== undefined) this.msg = msg;
        else this.msg = "";
        if (dataText !== undefined) this.dataText = dataText;
        else this.dataText = "";
        this.code = code;
    }
}

export default BackendBody;