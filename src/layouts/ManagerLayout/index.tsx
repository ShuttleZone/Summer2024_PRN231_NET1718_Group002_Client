import {Outlet} from "react-router-dom";
import Sidebar from "../AdminLayout/components/Sidebar";
import {IoHome} from "react-icons/io5";
import {FaNewspaper, FaThList} from "react-icons/fa";
import {IoCreateOutline} from "react-icons/io5";

const managerNavItems = [
    {
        title: "Home",
        to: "/manager/home",
        icon: IoHome,
    },
    {
        title: "New Court",
        to: "/manager/courts/new",
        icon: FaThList,
    },
    {
        title: "Courts List",
        to: "/manager/club-requests",
        icon: FaNewspaper,
    },
    {
        title: "New Club",
        to: "/manager/clubs/new",
        icon: IoCreateOutline,
    },
];

function ManagerLayout() {
    return (
        <div className="min-h-screen grid grid-cols-12">
            <div className="col-span-2 bg-slate-900">
                <Sidebar navItems={managerNavItems} />
            </div>
            <div className="col-span-10 overflow-y-auto">
                <div className="px-8 py-8">
                    <h2 className="text-2xl font-semibold">Manager Panel</h2>
                </div>
                <main className="px-8 h-fit">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default ManagerLayout;
