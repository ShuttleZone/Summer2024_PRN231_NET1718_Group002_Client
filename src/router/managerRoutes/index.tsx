import {RouteObject} from "react-router-dom";

const managerRoutes: RouteObject[] = [
    {
        path: "",
        element: <div>Home</div>,
    },
    {
        path: "courts/new",
        element: <div>new court</div>,
    },
];

export default managerRoutes;
