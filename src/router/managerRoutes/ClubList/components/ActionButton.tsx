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
import {FiPlus} from "react-icons/fi";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {useState} from "react";
import CreateCourtPopUp from "../../CourtList/components/CreateCourtPopUp";
// import {FaRegUser} from "react-icons/fa";

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
                    <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem>
                        <PiCourtBasketball className="text-2xl mr-4" />
                        <span>Chi tiết</span>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem onSelect={handleClickAddCourt}>
                        <FiPlus className="text-2xl mr-4" />
                        <span>Thêm sân</span>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>
                        <FaRegUser className="text-2xl mr-4" />
                        <span>Staff list</span>
                    </DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tạo sân mới</DialogTitle>
                </DialogHeader>
                <CreateCourtPopUp clubId={clubId} />
            </DialogContent>
            {/* <DialogContent>
                <DialogHeader>
                    <DialogTitle>StaffList</DialogTitle>
                </DialogHeader>
            </DialogContent> */}
        </Dialog>
    );
}
export default ActionButton;
