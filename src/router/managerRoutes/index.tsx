import {RouteObject} from "react-router-dom";
import CreateCourt from "./CreateCourt";

const managerRoutes: RouteObject[] = [
    {
        path: "",
        element: <div>Home</div>,
    },
    {
        path: "courts/new",
        element: <CreateCourt />,
    },
];

export default managerRoutes;
