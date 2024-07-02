import {RouteObject} from "react-router-dom";
import CreateClub from "./CreateClub";
import CreateCourt from "./CreateCourt";
import PrivateRoute from "../PrivateRoute";
import ClubList from "./ClubList";
import CourtList from "./CourtList";
import ClubReview from "./ClubReview";
import applicationRoles from "@/constants/role.constants";
import StaffList from "./StaffList";

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
    {
        path: "club-reviews/:Id",
        element: <ClubReview />,
    },
    {
        path: "staffs",
        element: <StaffList />,
    },
];

export default [
    {
        element: <PrivateRoute allowedRoles={[applicationRoles.MANAGER]} />,
        children: [...managerRoutes],
    },
];
