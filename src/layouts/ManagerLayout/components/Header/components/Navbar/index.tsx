import {IoChevronDown} from "react-icons/io5";
import {Link} from "react-router-dom";

interface NavItem {
    name: string;
    link: string;
    hasDropdown?: boolean;
}

const navItems: NavItem[] = [
    {name: "Home", link: "/"},
    {name: "Coaches", link: "/coaches", hasDropdown: true},
    {name: "User", link: "/user", hasDropdown: true},
    {name: "Pages", link: "/pages", hasDropdown: true},
    {name: "Blog", link: "/blog", hasDropdown: true},
    {name: "Contact Us", link: "/contact-us"},
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
