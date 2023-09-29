import ProcessingStateEnum from "../Enums/ProcessingStateEnum";

class Ticket {
    submitUserName: string;
    context: string;
    submitTime: string;
    pendingStatus: ProcessingStateEnum;
    response: string;
    responseTime: string;

    constructor(submitUserName: string, context: string, submitTime: string) {
        this.submitUserName = submitUserName;
        this.pendingStatus = ProcessingStateEnum.Unsolved;
        this.context = context;
        this.submitTime = submitTime;
        this.response = "";
        this.responseTime = "";
    }

}

export default Ticket;