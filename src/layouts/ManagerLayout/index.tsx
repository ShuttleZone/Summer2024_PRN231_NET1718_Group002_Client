import {Outlet} from "react-router-dom";
import Sidebar from "../AdminLayout/components/Sidebar";
import {IoHome} from "react-icons/io5";
import {FaNewspaper} from "react-icons/fa";
import {IoCreateOutline} from "react-icons/io5";
import Spinner from "@/components/Spinner";
import {Toaster} from "@/components/ui/toaster";
import {RiUserSettingsLine} from "react-icons/ri";

const managerNavItems = [
    {
        title: "Home",
        to: "/",
        icon: IoHome,
    },
    {
        title: "Quản lý sân",
        to: "/manager/courts",
        icon: FaNewspaper,
    },
    {
        title: "Quản lý câu lạc bộ",
        to: "/manager/clubs",
        icon: IoCreateOutline,
    },
    {
        title: "Thêm câu lạc bộ mới",
        to: "/manager/clubs/new",
        icon: IoCreateOutline,
    },
    {
        title: "Quản lý nhân viên",
        to: "/manager/staffs",
        icon: RiUserSettingsLine,
    },
    {
        title: "Gói cước của bạn",
        to: "/manager/packages",
        icon: RiUserSettingsLine,
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
                            Trang quản lý
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
