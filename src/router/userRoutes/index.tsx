import {RouteObject} from "react-router-dom";
import Home from "./Home";
import PrivateRoute from "../PrivateRoute";

const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },
];

const privateRoutes: RouteObject[] = [];

const userRoutes: RouteObject[] = [
    {
        element: <PrivateRoute />,
        children: privateRoutes,
    },
    ...publicRoutes,
];

export default userRoutes;
