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
import guestRoutes from "./guestRoutes";
import LoginPage from "./guestRoutes/Login";
import RegisterPage from "./guestRoutes/Register";
import ConfirmEmail from "./guestRoutes/ConfirmEmail";
import CallbackConfirmEmail from "./guestRoutes/CallbackConfirmEmail";

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
        element: <LoginPage />,
        children: [...guestRoutes],
    },
    {
        path: "/register",
        element: <RegisterPage />,
        children: [...guestRoutes],
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
]);

export default router;
