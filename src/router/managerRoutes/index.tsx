import {RouteObject} from "react-router-dom";
import CreateCourt from "./CreateCourt";
import CreateClub from "./CreateClub";

const managerRoutes: RouteObject[] = [
    {
        path: "",
        element: <div>Home</div>,
    },
    {
        path: "courts/new",
        element: <CreateCourt />,
    },
    {
        path: "clubs/new",
        element: <CreateClub />,
    },
];

export default managerRoutes;
