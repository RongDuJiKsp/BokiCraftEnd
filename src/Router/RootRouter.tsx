import {useRoutes} from "react-router-dom";
import SubmitTicketComponent from "../Component/SubmitTicketComponent";
import HomePageComponent from "../Page/HomePage";

const RootRouter = () => {
    return useRoutes([{
        path: "/ticket/*",
        element: <SubmitTicketComponent/>
    }, {
        path: "/*",
        element: <HomePageComponent/>
    }]);
}
export default RootRouter;