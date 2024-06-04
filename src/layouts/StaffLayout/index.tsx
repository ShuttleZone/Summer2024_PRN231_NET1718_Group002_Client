import {Outlet} from "react-router-dom";
import Sidebar from "@/layouts/AdminLayout/components/Sidebar";
import {IoHome} from "react-icons/io5";
import {FaNewspaper, FaThList} from "react-icons/fa";

const staffNavItems = [
    {
        title: "Home",
        to: "/staff/home",
        icon: IoHome,
    },
    {
        title: "Something",
        to: "/staff/something",
        icon: FaThList,
    },
    {
        title: "Something Else",
        to: "/staff/something",
        icon: FaNewspaper,
    },
];

function StaffLayout() {
    return (
        <div className="min-h-screen grid grid-cols-12">
            <div className="col-span-2 bg-slate-900">
                <Sidebar navItems={staffNavItems} />
            </div>
            <div className="col-span-10">
                <div className="px-8 py-8">
                    <h2 className="text-2xl font-semibold">Staff Panel</h2>
                </div>
                <main className="px-8 h-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default StaffLayout;
