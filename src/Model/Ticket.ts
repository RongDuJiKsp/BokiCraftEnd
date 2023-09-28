import StatusCodeEnum from "../Enums/StatusCodeEnum";

class Ticket {
    submitUserName: string;
    context: string;
    pendingStatus: StatusCodeEnum;
    response:string;

    constructor(submitUserName: string, context: string, pendingStatus: StatusCodeEnum) {
        this.submitUserName = submitUserName;
        this.pendingStatus = pendingStatus;
        this.context = context;
        this.response="";
    }

}

export default Ticket;