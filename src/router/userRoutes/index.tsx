import {RouteObject} from "react-router-dom";
import Home from "./Home";
import PrivateRoute from "../PrivateRoute";
import ClubsList from "./ClubsList";
import CourtBooking from "./CourtBooking";
import TypeOfBooking from "./CourtBooking/TypeOfBooking";
import TimeAndDateBooking from "./CourtBooking/TimeAndDateBooking";

const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/clubs",
        element: <ClubsList />,
    },
    {
        path: "/court-booking",
        element: <CourtBooking />,
        children: [
            {
                path: "",
                element: <TypeOfBooking />,
            },
            {
                path: "time-date",
                element: <TimeAndDateBooking />,
            },
        ],
    },
];

const privateRoutes: RouteObject[] = [];

const userRoutes: RouteObject[] = [
    {
        element: <PrivateRoute />,
        children: privateRoutes,
    },
    ...publicRoutes,
];

export default userRoutes;
