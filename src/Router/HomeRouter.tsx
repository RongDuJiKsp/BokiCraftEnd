import {useRoutes} from "react-router-dom";
import LoginComponent from "../Component/LoginComponent";

const HomeRouter = () => {
    return useRoutes([{
        path: "/login/*",
        element: <LoginComponent/>
    },{
        path:"/*",
        element:<div>$)$ NOT FOUND</div>
    }]);
}
export default HomeRouter;