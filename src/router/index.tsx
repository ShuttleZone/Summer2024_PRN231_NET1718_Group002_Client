import {createBrowserRouter} from "react-router-dom";
import UserLayout from "@/layouts/UserLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ManagerLayout from "@/layouts/ManagerLayout";
import StaffLayout from "@/layouts/StaffLayout";
import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";
import managerRoutes from "./managerRoutes";
import staffRoutes from "./staffRoutes";
import NotFound from "@/components/pages/NotFound";
import LoginPage from "./guestRoutes/Login";
import RegisterPage from "./guestRoutes/Register";
import ConfirmEmail from "./guestRoutes/ConfirmEmail";
import CallbackConfirmEmail from "./guestRoutes/CallbackConfirmEmail";
import Unauthorized from "@/components/pages/Unauthorized";
import guestRoutes from "./guestRoutes";
import AfterPayment from "./userRoutes/AfterPayment";
import PaymentOption from "./userRoutes/Payment/PaymentOption";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import GoogleOAuthCallback from "./userRoutes/GoogleOAuthCallback";

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        children: [...userRoutes],
        errorElement: <NotFound />,
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [...adminRoutes],
    },
    {
        path: "/manager",
        element: <ManagerLayout />,
        children: [...managerRoutes],
    },
    {
        path: "/staff",
        element: <StaffLayout />,
        children: [...staffRoutes],
    },
    {
        path: "/login",
        element: <UnauthenticatedRoute />,
        children: [
            {
                path: "",
                element: <LoginPage />,
            },
        ],
    },
    {
        path: "/register",
        element: <UnauthenticatedRoute />,
        children: [
            {
                path: "",
                element: <RegisterPage />,
            },
        ],
    },
    {
        path: "/oauth/gg",
        element: <UnauthenticatedRoute />,
        children: [
            {
                path: "",
                element: <GoogleOAuthCallback />,
            },
        ],
    },
    // {
    //     path: "/register",
    //     element: <RegisterPage />,
    //     children: [...guestRoutes],
    // },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },
    {
        path: "/email-confirmation",
        element: <ConfirmEmail />,
        children: [...guestRoutes],
    },
    {
        path: "/email-confirming",
        element: <CallbackConfirmEmail />,
        children: [...guestRoutes],
    },
    {
        path: "/payment-result",
        element: <AfterPayment />,
        children: [...guestRoutes],
    },
    {
        path: "/payment",
        element: <PaymentOption />,
    },
]);

export default router;
