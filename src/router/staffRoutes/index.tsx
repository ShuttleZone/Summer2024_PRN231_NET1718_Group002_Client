import {RouteObject} from "react-router-dom";
import ReservationList from "./ReservationList";
import PrivateRoute from "../PrivateRoute";
import applicationRoles from "@/constants/role.constants";
import ContestDetail from "./ContestDetail";

const staffRoutes: RouteObject[] = [
    {
        path: "",
        element: <div>Home</div>,
    },
    {
        path: "reservations",
        element: <ReservationList />,
    },
    {
        path: "contest",
        element: <ContestDetail />,
    },
];

export default [
    {
        element: <PrivateRoute allowedRoles={[applicationRoles.STAFF]} />,
        children: [...staffRoutes],
    },
];
