type ConfigUnit = {
    textColor: string
}
type ProcessingStates = {
    Unsolved: ConfigUnit,
    Pending: ConfigUnit,
    Delayed: ConfigUnit,
    Rejected: ConfigUnit,
    Resolved: ConfigUnit,
}
const ProcessingStateConfig: ProcessingStates = {
    Delayed: {
        textColor: "text-orange-600"
    },
    Pending: {
        textColor: "text-blue-500"
    },
    Rejected: {
        textColor: "text-red-600"
    },
    Resolved: {
        textColor: "text-green-400"
    },
    Unsolved: {
        textColor: "text-yellow-400"
    }
}
export default ProcessingStateConfig;