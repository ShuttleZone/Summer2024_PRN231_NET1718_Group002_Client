import {RouteObject} from "react-router-dom";

const adminRoutes: RouteObject[] = [
    {
        path: "",
        element: <div>this is default page</div>,
    },
    {
        path: "home",
        element: <div>Home</div>,
    },
];

export default adminRoutes;
