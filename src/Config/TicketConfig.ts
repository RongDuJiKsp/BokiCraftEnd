type ConfigUnit = {
    description: string,
    priority: number,
    color: string
}
type Tickets = {
    Bug: ConfigUnit,
    Invalid: ConfigUnit,
    Wanted: ConfigUnit,
    Question: ConfigUnit,
    Null: ConfigUnit
}
const TicketConfig: Tickets = {
    Bug: {
        description: "Something isn't working",
        priority: 9,
        color: "red"
    },
    Invalid: {
        description: "This doesn't seem right",
        priority: 8,
        color: "yellow"
    },
    Wanted: {
        description: "Extra attention is needed",
        priority: 7,
        color: "orange"
    },
    Question: {
        description: "Further information is requested",
        priority: 6,
        color: "blue"
    },
    Null: {
        description: "Please Select A Tag",
        priority: 0,
        color: "write"
    }
}
export default TicketConfig;