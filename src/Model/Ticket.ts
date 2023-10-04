import ProcessingStateEnum from "../Enums/ProcessingStateEnum";
import TicketTagEnum from "../Enums/TicketTagEnum";

class Ticket {
    submitUserName: string;
    context: string;
    submitTime: string;
    pendingStatus: ProcessingStateEnum;
    response: string;
    responseTime: string;
    tag:TicketTagEnum;
    id:number|undefined;

    constructor(submitUserName: string, context: string, submitTime: string,tag:TicketTagEnum) {
        this.submitUserName = submitUserName;
        this.pendingStatus = ProcessingStateEnum.Unsolved;
        this.context = context;
        this.submitTime = submitTime;
        this.response = "";
        this.responseTime = "";
        this.tag=tag;
    }

}

export default Ticket;