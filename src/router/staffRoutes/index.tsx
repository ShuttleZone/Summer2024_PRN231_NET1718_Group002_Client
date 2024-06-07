import {RouteObject} from "react-router-dom";
import ReservationList from "./ReservationList";

const staffRoutes: RouteObject[] = [
    {
        path: "",
        element: <div>Home</div>,
    },
    {
        path: "reservations",
        element: <ReservationList />,
    },
];

export default staffRoutes;
