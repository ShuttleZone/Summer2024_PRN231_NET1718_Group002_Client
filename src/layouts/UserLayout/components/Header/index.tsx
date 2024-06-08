import Logo from "./components/Logo";
import Navbar from "./components/Navbar";
import {IoPeopleOutline} from "react-icons/io5";
import {Link} from "react-router-dom";
import ButtonWithIcon from "@/components/ui/buttonWithIcon";
import {useAppSelector} from "@/store";

function Header() {
    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );

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
                <div />
            )}
        </header>
    );
}

export default Header;
