import {useRoutes} from "react-router-dom";
import HomePageComponent from "../Page/HomePage";
import TicketPage from "../Page/TicketPage";

const RootRouter = () => {
    return useRoutes([{
        path: "/ticket/*",
        element: <TicketPage/>
    }, {
        path: "/*",
        element: <HomePageComponent/>
    }]);
}
export default RootRouter;