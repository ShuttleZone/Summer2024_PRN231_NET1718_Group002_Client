import {Outlet} from "react-router-dom";
import Sidebar from "../AdminLayout/components/Sidebar";
import {IoHome} from "react-icons/io5";
import {FaNewspaper} from "react-icons/fa";
import {IoCreateOutline} from "react-icons/io5";
import Spinner from "@/components/Spinner";
import {Toaster} from "@/components/ui/toaster";
import {RiUserSettingsLine} from "react-icons/ri";
import {FaWallet} from "react-icons/fa6";

const managerNavItems = [
    {
        title: "Home",
        to: "/manager/home",
        icon: IoHome,
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
    {
        title: "Staff Management",
        to: "/manager/staffs",
        icon: RiUserSettingsLine,
    },
    {
        title: "Wallet Management",
        to: "/manager/wallet",
        icon: FaWallet,
    },
];

function ManagerLayout() {
    return (
        <>
            <div className="min-h-screen w-full grid grid-cols-12 overflow-y-auto absolute">
                <div className="col-span-2 bg-slate-900">
                    <Sidebar navItems={managerNavItems} />
                </div>
                <div className="col-span-10 flex flex-col">
                    <div className="px-8 py-8">
                        <h2 className="text-2xl font-semibold">
                            Manager Panel
                        </h2>
                    </div>
                    <main className="px-8 h-full">
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
