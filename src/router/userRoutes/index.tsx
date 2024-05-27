import {RouteObject} from "react-router-dom";
import Home from "./Home";
import PrivateRoute from "../PrivateRoute";
import ClubsList from "./ClubsList";
import ClubDetail from "./ClubDetail";

const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/clubs",
        element: <ClubsList />,
    },
    {
        path: "/clubs/:clubId",
        element: <ClubDetail />,
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
