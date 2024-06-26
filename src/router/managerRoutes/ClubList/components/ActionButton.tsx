import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {BsThreeDots} from "react-icons/bs";
import {PiCourtBasketball} from "react-icons/pi";
import {FiPlus} from "react-icons/fi";
function ActionButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <BsThreeDots />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <PiCourtBasketball className="text-2xl mr-4" />
                    <span>Detail</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <FiPlus className="text-2xl mr-4" />
                    <span>Add Court</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
export default ActionButton;
