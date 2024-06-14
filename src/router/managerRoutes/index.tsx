import {RouteObject} from "react-router-dom";
import CreateClub from "./CreateClub";
import CreateCourt from "./CreateCourt";
import PrivateRoute from "../PrivateRoute";
import ClubList from "./ClubList";
import CourtList from "./CourtList";

const managerRoutes: RouteObject[] = [
    {
        path: "",
        element: <div>Home</div>,
    },
    {
        path: "courts",
        element: <CourtList />,
    },
    {
        path: "courts/new",
        element: <CreateCourt />,
    },
    {
        path: "clubs/new",
        element: <CreateClub />,
    },
    {
        path: "clubs",
        element: <ClubList />,
    },
];

export default [
    {
        element: <PrivateRoute />,
        children: [...managerRoutes],
    },
];
