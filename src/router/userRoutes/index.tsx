import {RouteObject} from "react-router-dom";
import Home from "./Home";

const userRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },
];

export default userRoutes;
