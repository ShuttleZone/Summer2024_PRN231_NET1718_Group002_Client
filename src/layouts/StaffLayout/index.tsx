import {Outlet} from "react-router-dom";
import Sidebar from "@/layouts/AdminLayout/components/Sidebar";
import {IoHome} from "react-icons/io5";
import {FaNewspaper, FaThList} from "react-icons/fa";
import {Toaster} from "@/components/ui/toaster";

const staffNavItems = [
    // {
    //     title: "Home",
    //     to: "/staff/home",
    //     icon: IoHome,
    // },
    // {
    //     title: "Reservation Management",
    //     to: "/staff/reservations",
    //     icon: FaThList,
    // },
    {
        title: "Tạo đơn đặt sân",
        to: "/staff/reservations/new",
        icon: FaThList,
    },
    {
        title: "Quản lý cuộc đấu tại CLB",
        to: "/staff/club-contests",
        icon: FaThList,
    },
    // {
    //     title: "Something Else",
    //     to: "/staff/something",
    //     icon: FaNewspaper,
    // },
];

function StaffLayout() {
    return (
        <div className="min-h-screen grid grid-cols-12 overflow-y-auto">
            <div className="col-span-2 bg-slate-900 min-h-screen">
                <Sidebar navItems={staffNavItems} />
            </div>
            <div className="col-span-10 flex flex-col">
                <div className="px-8 py-8">
                    <h2 className="text-2xl font-semibold">
                        Trang quản lý của nhân viên
                    </h2>
                </div>
                <main className="px-8 h-full">
                    <Outlet />
                </main>
            </div>
            <Toaster />
        </div>
    );
}

export default StaffLayout;
