import {RouteObject} from "react-router-dom";
import ClubRequestList from "./ClubRequests";

const adminRoutes: RouteObject[] = [
    {
        path: "",
        element: <div>this is default page</div>,
    },
    {
        path: "club-requests",
        element: (
            <div>
                <ClubRequestList />
            </div>
        ),
    },
];

export default adminRoutes;
