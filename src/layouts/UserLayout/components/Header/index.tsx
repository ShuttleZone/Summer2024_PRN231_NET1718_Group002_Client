import Logo from "./components/Logo";
import Navbar from "./components/Navbar";
import {IoPeopleOutline} from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom";
import ButtonWithIcon from "@/components/ui/buttonWithIcon";
import {useAppDispatch, useAppSelector} from "@/store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {LogOut} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {AlertDialogDescription} from "@radix-ui/react-alert-dialog";
import {clearAuth} from "@/store/slices/auth.slice";
import {useToast} from "@/components/ui/use-toast";
import {hideSpinner, showSpinner} from "@/store/slices/spinner.slice";
import NotificationsDropdown from "./components/Notification/Notifications";
import MenuItemLink from "./components/MenuItem";

interface DropdownItemType {
    href: string;
    text: string;
}

const dropdownItems: DropdownItemType[] = [
    {href: "/my-reservation", text: "Lịch đặt sân"},
    {href: "/my-invoices", text: "Hóa đơn"},
    {href: "/contests", text: "Cuộc thi đấu"},
    {href: "/profile", text: "Hồ sơ"},
    {href: "/transactions", text: "Giao dịch"},
];

function Header() {
    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {toast} = useToast();

    const handleLogout = async () => {
        dispatch(showSpinner());
        // give it some time to logout because otherwise the page will be unresponsive, idk why :((
        setTimeout(() => dispatch(clearAuth()), 500);
        toast({
            title: "Đăng xuất",
            description: "Bạn đã đăng xuất khỏi hệ thống",
        });
        navigate("/");
        dispatch(hideSpinner());
    };

    return (
        <header className="flex justify-between items-center px-6 py-4">
            <Logo />
            <Navbar />

            {!isAuthenticated ? (
                <Link to="/login">
                    <ButtonWithIcon
                        icon={<IoPeopleOutline size={20} />}
                        text="Đăng nhập/Đăng ký"
                    />
                </Link>
            ) : (
                <div className="flex justify-between items-center  ">
                    <div className="px-6">
                        <NotificationsDropdown />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>Avatar</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {dropdownItems.map((item) => (
                                <MenuItemLink
                                    key={item.href}
                                    href={item.href}
                                    text={item.text}
                                />
                            ))}
                            <DropdownMenuSeparator />
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <div className="flex items-center px-2 text-sm">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Đăng xuất</span>
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Bạn có chắc chắn muốn đăng xuất?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Đăng xuất sẽ đưa bạn trở lại trang
                                            đăng nhập
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Hủy
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleLogout}
                                        >
                                            Đăng xuất
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </header>
    );
}

export default Header;
