import {RouteObject} from "react-router-dom";
import Home from "./Home";
import PrivateRoute from "../PrivateRoute";
import ClubsList from "./ClubsList";

const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/clubs",
        element: <ClubsList />,
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
