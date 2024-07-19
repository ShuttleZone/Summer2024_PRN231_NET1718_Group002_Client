import AppLogo from "@/assets/images/app-logo.png";
import {Link, useNavigate} from "react-router-dom";
import NavItem from "./components/NavItem";
import {Button} from "@/components/ui/button";
import {IconType} from "react-icons/lib";
import {useAppDispatch, useAppSelector} from "@/store";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {toast} from "@/components/ui/use-toast";
import {clearAuth} from "@/store/slices/auth.slice";

interface SidebarProps {
    navItems: {
        title: string;
        to: string;
        icon: IconType;
    }[];
}

function Sidebar({navItems}: SidebarProps) {
    const {username, email} = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // give it some time to logout because otherwise the page will be unresponsive, idk why :((
        setTimeout(() => dispatch(clearAuth()), 500);
        toast({
            title: "Đăng xuất thành công",
            description: "Bạn đã đăng xuất khỏi tài khoản của bạn",
        });
        navigate("/login");
    };

    return (
        <div className="w-full h-full flex flex-col justify-between px-4 py-4">
            <div>
                <Link
                    to="/"
                    className="flex justify-start items-center gap-4 cursor-pointer"
                >
                    <img src={AppLogo} alt="logo" className="h-12 rounded-xl" />
                    <h1 className="text-white text-3xl font-extrabold">
                        Shuttle Zone
                    </h1>
                </Link>
                <nav className="mt-8">
                    <ul className="flex flex-col justify-start items-start gap-1">
                        {navItems.map((navItem) => (
                            <li key={navItem.title} className="w-full">
                                <NavItem
                                    title={navItem.title}
                                    link={navItem.to}
                                    Icon={navItem.icon}
                                    isActive={
                                        window.location.pathname === navItem.to
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
                <img src={AppLogo} alt="logo" className="h-12 rounded-full" />
                <div className="flex flex-col">
                    <span className="text-white">{username}</span>
                    {/* <span className="text-white text-sm font-medium">
                        {email}
                    </span> */}
                </div>
                <AlertDialog>
                    <AlertDialogTrigger className="w-full">
                        <Button className="w-full h-12 bg-red-500 text-white hover:bg-slate-700 transition-colors duration-300 text-lg font-medium">
                            Đăng xuất
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Bạn có chắc chắn là muốn đăng xuất ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Bạn sẽ thoát ra khỏi tài khoản hiện tại và cần
                                đăng nhập lại để sử dụng
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Huỷ</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLogout}>
                                Đăng xuất
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}

export default Sidebar;
