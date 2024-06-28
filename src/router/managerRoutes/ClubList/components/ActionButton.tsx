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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {useState} from "react";
import CreateCourtPopUp from "../../CourtList/components/CreateCourtPopUp";

interface ActionButtonProps {
    clubId: string;
}

function ActionButton({clubId}: ActionButtonProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleClickAddCourt = () => {
        setIsDialogOpen(true);
        setIsDropdownOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DropdownMenu
                open={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
            >
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
                    <DropdownMenuItem onSelect={handleClickAddCourt}>
                        <FiPlus className="text-2xl mr-4" />
                        <span>Add Court</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new court</DialogTitle>
                </DialogHeader>
                <CreateCourtPopUp clubId={clubId} />
            </DialogContent>
        </Dialog>
    );
}
export default ActionButton;
