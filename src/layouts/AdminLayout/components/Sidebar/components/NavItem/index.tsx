import {IconType} from "react-icons/lib";
import {useNavigate} from "react-router-dom";

interface NavItemProps {
    title: string;
    Icon: IconType;
    link: string;
}

function NavItem({title, Icon, link}: NavItemProps) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(link);
    };

    return (
        <div
            onClick={handleNavigate}
            className="w-full h-full flex justify-start items-center gap-3 px-3 py-3 rounded-md text-white hover:bg-slate-600 cursor-pointer transition-all duration-300 ease-in-out"
        >
            <Icon size={20} />
            <span className="text-md font-medium">{title}</span>
        </div>
    );
}

export default NavItem;
