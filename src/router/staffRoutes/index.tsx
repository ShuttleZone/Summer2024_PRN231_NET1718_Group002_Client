import {RouteObject} from "react-router-dom";
import ReservationList from "./ReservationList";
import PrivateRoute from "../PrivateRoute";
import applicationRoles from "@/constants/role.constants";
import ContestDetail from "./ContestDetail";
import ReservationCreate from "./ReservationCreate";
import ContestList from "./ContestList";

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
        path: "reservations/new",
        element: <ReservationCreate />,
    },
    {
        path: "contest",
        element: <ContestDetail />,
    },
    {
        path: "club-contests",
        element: <ContestList />,
    },
];

export default [
    {
        element: <PrivateRoute allowedRoles={[applicationRoles.STAFF]} />,
        children: [...staffRoutes],
    },
];
