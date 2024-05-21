import {Button} from "@/components/ui/button";
import Logo from "./components/Logo";
import Navbar from "./components/Navbar";
import {IoPeopleOutline} from "react-icons/io5";
import {Link} from "react-router-dom";

function Header() {
    return (
        <header className="flex justify-between items-center px-6 py-4">
            <Logo />
            <Navbar />
            <Link to="/login">
                <Button className="bg-[#0a7e53] flex justify-between items-center gap-1">
                    <IoPeopleOutline size={20} />
                    <span>Login/Register</span>
                </Button>
            </Link>
        </header>
    );
}

export default Header;
