import {Outlet, useLocation} from "react-router-dom";
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
    {
        title: "Quản lý ví",
        to: "/manager/wallet",
        icon: FaWallet,
    },
];

const getPageTitle = (pathname: string) => {
    const item = managerNavItems.find((item) => item.to === pathname);
    return item?.title ?? "Trang quản lý";
};

function ManagerLayout() {
    const location = useLocation();

    return (
        <>
            <div className="min-h-screen w-full grid grid-cols-12 overflow-y-auto absolute">
                <div className="col-span-2 bg-slate-900">
                    <Sidebar navItems={managerNavItems} />
                </div>
                <div className="col-span-10 flex flex-col">
                    <div className="px-8 py-8">
                        <h2 className="text-[2.5rem] font-semibold">
                            {getPageTitle(location.pathname)}
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
