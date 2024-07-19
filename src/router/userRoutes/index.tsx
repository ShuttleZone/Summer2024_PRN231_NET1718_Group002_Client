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
import LoginForm from "../guestRoutes/Login";
import RegisterForm from "../guestRoutes/Register/RegisterForm";

import ClubCreate from "./ClubCreate";
import MyReservationDetailList from "./ReservationDetail";
import MyReservationInvoiceList from "./Reservation";
import ContestCreate from "./ContestCreate";
import UserProfile from "./UserProfile";
import applicationRoles from "@/constants/role.constants";
import PaymentOption from "./Payment/PaymentOption";
import AfterPayment from "./AfterPayment";
import MyContest from "./MyContests";

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
    // {
    //     path: "/clubs/:id/court-booking",
    //     element: <CourtBooking />,
    //     children: [
    //         {
    //             path: "",
    //             element: <TypeOfBooking />,
    //         },
    //         {
    //             path: "time-date",
    //             element: <TimeAndDateBooking />,
    //         },
    //         {
    //             path: "personal-info",
    //             element: <PersonalInformation />,
    //         },
    //         {
    //             path: "confirm",
    //             element: <ConfirmBooking />,
    //         },
    //     ],
    // },
    {
        path: "/clubs/register",
        element: <ClubCreate />,
    },
    {
        path: "/my-reservation",
        element: <MyReservationDetailList />,
    },
];

const privateRoutes: RouteObject[] = [
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
        path: "/clubs/:id/contests/new",
        element: <ContestCreate />,
    },
    {
        path: "/clubs/register",
        element: <ClubCreate />,
    },
    {
        path: "/my-reservation",
        element: <MyReservationDetailList />,
    },
    {
        path: "/my-invoices",
        element: <MyReservationInvoiceList />,
    },
    {
        path: "/profile",
        element: <UserProfile />,
    },
    // {
    //     path: "/payment",
    //     element: <PaymentOption />,
    // },
    // {
    //     path: "/payment-result",
    //     element: <AfterPayment />,
    // },
    {
        path: "/my-contests",
        element: <MyContest />,
    },
];

const userRoutes: RouteObject[] = [
    {
        element: <PrivateRoute allowedRoles={[applicationRoles.CUSTOMER]} />,
        children: privateRoutes,
    },
    ...publicRoutes,
];

export default userRoutes;
