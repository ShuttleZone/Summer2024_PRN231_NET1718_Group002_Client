import AppLogo from "@/assets/images/app-logo.png";
import {Link} from "react-router-dom";
import NavItem from "./components/NavItem";
import {IoHome} from "react-icons/io5";
import {FaThList} from "react-icons/fa";
import {FaNewspaper} from "react-icons/fa6";
import {Button} from "@/components/ui/button";

const navItems = [
    {
        title: "Home",
        to: "/admin/home",
        icon: IoHome,
    },
    {
        title: "Clubs List",
        to: "/admin/clubs",
        icon: FaThList,
    },
    {
        title: "Club Requests",
        to: "/admin/club-requests",
        icon: FaNewspaper,
    },
];

function Sidebar() {
    return (
        <div className="w-full h-full flex flex-col justify-between px-4 py-4">
            <div>
                <Link
                    to="/admin"
                    className="flex justify-start items-center gap-4 cursor-pointer"
                >
                    <img src={AppLogo} alt="logo" className="h-12 rounded-xl" />
                    <h1 className="text-white text-3xl font-extrabold">
                        Shuttle Zone
                    </h1>
                </Link>
                <nav className="mt-8">
                    <ul className="flex flex-col justify-start items-start">
                        {navItems.map((navItem) => (
                            <li key={navItem.title} className="w-full">
                                <NavItem
                                    title={navItem.title}
                                    link={navItem.to}
                                    Icon={navItem.icon}
                                />
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
                <img src={AppLogo} alt="logo" className="h-12 rounded-full" />
                <div className="flex flex-col">
                    <span className="text-white">Shuttle Zone</span>
                    <span className="text-white text-sm font-medium">
                        amdin@shuttlezone.com
                    </span>
                </div>
                <Button className="w-full h-12 bg-red-500 text-white hover:bg-slate-700 transition-colors duration-300 text-lg font-medium">
                    Logout
                </Button>
            </div>
        </div>
    );
}

export default Sidebar;
