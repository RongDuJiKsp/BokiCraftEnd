import {useRoutes} from "react-router-dom";
import HomePageComponent from "../Page/HomePage";
import TicketPage from "../Page/TicketPage";
import AboutPage from "../Page/AboutPage";
import DownloadPage from "../Page/DownloadPage";

const RootRouter = () => {
    return useRoutes([{
        path: "/ticket/*",
        element: <TicketPage/>
    }, {
        path: "/about/*",
        element: <AboutPage/>

    }, {
        path: "/download/*",
        element: <DownloadPage/>
    }, {
        path: "/*",
        element: <HomePageComponent/>
    }]);
}
export default RootRouter;