import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {RiUserSettingsLine} from "react-icons/ri";
import {BsThreeDots} from "react-icons/bs";
import {useState} from "react";
function ActionButton() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <BsThreeDots />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <RiUserSettingsLine className="text-2xl mr-4" />
                    <span>Detail</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
export default ActionButton;
