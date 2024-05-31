import {RouteObject} from "react-router-dom";
import Home from "./Home";
import PrivateRoute from "../PrivateRoute";
import ClubsList from "./ClubsList";
import ContestList from "./ContestList";
import ClubDetail from "./ClubDetail";
import CourtBooking from "./CourtBooking";
import TypeOfBooking from "./CourtBooking/TypeOfBooking";
import TimeAndDateBooking from "./CourtBooking/TimeAndDateBooking";
import PersonalInformation from "./CourtBooking/PersonalInformation";
import ConfirmBooking from "./CourtBooking/ConfirmBooking";

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
        path: "/contests",
        element: <ContestList />,
    },
    {
        path: "/clubs/:clubId",
        element: <ClubDetail />,
    },
    {
        path: "/clubs/:id/court-booking",
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
            {
                path: "personal-info",
                element: <PersonalInformation />,
            },
            {
                path: "confirm",
                element: <ConfirmBooking />,
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
