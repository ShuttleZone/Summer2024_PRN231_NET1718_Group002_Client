import {createBrowserRouter} from "react-router-dom";
import UserLayout from "@/layouts/UserLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ManagerLayout from "@/layouts/ManagerLayout";
import StaffLayout from "@/layouts/StaffLayout";
import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";
import managerRoutes from "./managerRoutes";
import staffRoutes from "./staffRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        children: [...userRoutes],
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
]);

export default router;
