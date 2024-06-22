import {IoChevronDown} from "react-icons/io5";
import {Link} from "react-router-dom";

interface NavItem {
    name: string;
    link: string;
    hasDropdown?: boolean;
}

const navItems: NavItem[] = [
    {name: "Home", link: "/"},
    {name: "My Reservations", link: "/my-reservation", hasDropdown: true},
    {name: "Invoices", link: "/my-invoices", hasDropdown: true},
    {name: "Clubs", link: "/clubs", hasDropdown: true},
    {name: "Contest", link: "/contests", hasDropdown: true},
    {name: "Profile", link: "/profile"},
    {name: "Manager Role", link: "/manager"},
];

function Navbar() {
    return (
        <nav>
            <ul className="flex justify-between gap-6 font-semibold">
                {navItems.map((item) => (
                    <li
                        key={item.name}
                        className="flex justify-between items-center gap-2 cursor-pointer hover:text-green-400 transition-colors"
                    >
                        <Link to={item.link}>{item.name}</Link>
                        {item.hasDropdown && <IoChevronDown size={16} />}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;
