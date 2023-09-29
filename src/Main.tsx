import SubmitTicketComponent from "./Component/SubmitTicketComponent";
import useLoginState from "./Hooks/useLoginState";

const Main = () => {
    const ad = useLoginState();
    return (<SubmitTicketComponent></SubmitTicketComponent>)
}
export default Main;