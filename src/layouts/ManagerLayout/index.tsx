import {Outlet} from "react-router-dom";
import Sidebar from "../AdminLayout/components/Sidebar";
import {IoHome} from "react-icons/io5";
import {FaNewspaper, FaThList} from "react-icons/fa";
import {IoCreateOutline} from "react-icons/io5";
import Spinner from "@/components/Spinner";
import {Toaster} from "@/components/ui/toaster";

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
        to: "/manager/courts",
        icon: FaNewspaper,
    },
    {
        title: "Club Management",
        to: "/manager/clubs",
        icon: IoCreateOutline,
    },
    {
        title: "New Club",
        to: "/manager/clubs/new",
        icon: IoCreateOutline,
    },
];

function ManagerLayout() {
    return (
        <>
            <div className="min-h-screen grid grid-cols-12 overflow-y-auto absolute">
                <div className="col-span-2 bg-slate-900">
                    <Sidebar navItems={managerNavItems} />
                </div>
                <div className="col-span-10">
                    <div className="px-8 py-8">
                        <h2 className="text-2xl font-semibold">
                            Manager Panel
                        </h2>
                    </div>
                    <main className="px-8 h-fit">
                        <Outlet />
                    </main>
                </div>
            </div>
            <Spinner />
            <Toaster />
        </>
    );
}

export default ManagerLayout;
