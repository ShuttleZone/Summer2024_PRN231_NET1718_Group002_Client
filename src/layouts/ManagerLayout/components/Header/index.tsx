import Logo from "./components/Logo";
import Navbar from "./components/Navbar";
import {IoPeopleOutline} from "react-icons/io5";
import {Link} from "react-router-dom";
import ButtonWithIcon from "@/components/ui/buttonWithIcon";

function Header() {
    return (
        <header className="flex justify-between items-center px-6 py-4">
            <Logo />
            <Navbar />
            <Link to="/login">
                <ButtonWithIcon
                    icon={<IoPeopleOutline size={20} />}
                    text="Login/Register"
                />
            </Link>
        </header>
    );
}

export default Header;
