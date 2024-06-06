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
import ContestDetail from "./ContestDetail";
import MyReservationList from "./reservations";
import LoginForm from "../guestRoutes/Login";
import RegisterForm from "../guestRoutes/Register/RegisterForm";
const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <LoginForm />,
    },
    {
        path: "/register",
        element: <RegisterForm />,
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
        path: "/contests/details/:contestId",
        element: <ContestDetail />,
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
    {
        path: "/my-reservation",
        element: <MyReservationList />,
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
