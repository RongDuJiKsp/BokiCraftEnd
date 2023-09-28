enum ProcessingStateEnum {
    Unsolved="Unsolved",//提交，但是未受理
    Pending="Pending",//已经受理，正在修复
    Delayed="Delayed",//由于原因，暂时被推迟
    Rejected="Rejected",//已经被拒绝
    Resolved="Resolved",//已经被解决
}
export  default  ProcessingStateEnum;