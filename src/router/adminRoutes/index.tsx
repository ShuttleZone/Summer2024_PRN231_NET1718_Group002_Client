import {RouteObject} from "react-router-dom";
import ClubRequestList from "./ClubRequests";
import applicationRoles from "@/constants/role.constants";
import PrivateRoute from "../PrivateRoute";
import PackageManagement from "./PackageManagement";
import ClubList from "./ClubList";

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
    {
        path: "packages",
        element: (
            <div>
                <PackageManagement />
            </div>
        ),
    },
    {
        path: "clubs",
        element: (
            <div>
                <ClubList />
            </div>
        ),
    },
];

export default [
    {
        element: <PrivateRoute allowedRoles={[applicationRoles.ADMIN]} />,
        children: [...adminRoutes],
    },
];
