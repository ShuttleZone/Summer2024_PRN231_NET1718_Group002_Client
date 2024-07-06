import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {useNavigate} from "react-router-dom";

interface MenuItemLinkProps {
    href: string;
    text: string;
}

function MenuItemLink({href, text}: MenuItemLinkProps) {
    const navigate = useNavigate();

    return (
        <DropdownMenuItem onClick={() => navigate(href)}>
            {text}
        </DropdownMenuItem>
    );
}

export default MenuItemLink;
