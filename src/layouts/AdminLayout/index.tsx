import {Outlet} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import {IoHome} from "react-icons/io5";
import {FaNewspaper, FaThList} from "react-icons/fa";

const adminNavItems = [
    {
        title: "Home",
        to: "/admin/home",
        icon: IoHome,
    },
    {
        title: "Danh sách câu lạc bộ",
        to: "/admin/clubs",
        icon: FaThList,
    },
    {
        title: "Quản lý đăng kí CLB",
        to: "/admin/club-requests",
        icon: FaNewspaper,
    },
    {
        title: "Quản lý gói đăng kí",
        to: "/admin/packages",
        icon: FaNewspaper,
    },
];

function AdminLayout() {
    return (
        <div className="min-h-screen grid grid-cols-12">
            <div className="col-span-2 bg-slate-900">
                <Sidebar navItems={adminNavItems} />
            </div>
            <div className="col-span-10">
                <div className="px-8 py-8">
                    <h2 className="text-2xl font-semibold">Trang quản lý</h2>
                </div>
                <main className="px-8 h-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
