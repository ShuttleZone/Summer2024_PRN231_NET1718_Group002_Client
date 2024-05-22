import AppLogo from "@/assets/images/app-logo.png";
import {Link} from "react-router-dom";

function Logo() {
    return (
        <Link to="/">
            <img src={AppLogo} alt="logo" className="h-12 rounded-xl" />
        </Link>
    );
}

export default Logo;
