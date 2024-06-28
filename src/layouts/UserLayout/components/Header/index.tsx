import Logo from "./components/Logo";
import Navbar from "./components/Navbar";
import {IoPeopleOutline} from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom";
import ButtonWithIcon from "@/components/ui/buttonWithIcon";
import {useAppDispatch, useAppSelector} from "@/store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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

interface DropdownItemType {
    href: string;
    text: string;
}

const dropdownItems: DropdownItemType[] = [
    {href: "/my-reservation", text: "My reservations"},
    {href: "/my-invoices", text: "My invoices"},
    {href: "/contests", text: "My contests"},
    {href: "/profile", text: "Profile"},
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
            title: "Logged out successfully",
            description: "You have been logged out from your account.",
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
                        text="Login/Register"
                    />
                </Link>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>Avatar</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {dropdownItems.map((item) => (
                            <DropdownMenuItem key={item.href}>
                                <Link to={item.href}>{item.text}</Link>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <div className="flex items-center px-2 text-sm">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you sure to logout?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You will be logged out from your
                                        account.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction onClick={handleLogout}>
                                        Logout
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </header>
    );
}

export default Header;
