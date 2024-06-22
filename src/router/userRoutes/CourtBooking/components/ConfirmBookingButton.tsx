import {FormEvent} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

interface ConfirmBookingButtonProps {
    onClick: (e: FormEvent) => void;
}
const ConfirmBookingButton: React.FC<ConfirmBookingButtonProps> = ({
    onClick,
}) => {
    return (
        <div>
            {/* <button
                className="mx-auto w-56 h-20 border-2 border-green-600 rounded-3xl flex flex-row justify-center items-center text-green-600  hover:bg-green-600 hover:text-white transition-colors duration-300"
                onClick={onClick}
            >
                <h1 className="text-xl font-semibold">Make reservation</h1>
            </button> */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="mx-auto w-56 h-20 border-2 border-green-600 rounded-3xl flex flex-row justify-center items-center text-green-600  hover:bg-green-600 hover:text-white transition-colors duration-300 text-xl"
                    >
                        Make reservation
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            Are you sure to make reservation
                        </DialogTitle>
                        <DialogDescription className="text-lg">
                            Check the information again before doing further
                            action
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            className="border-2 bg-white border-green-600 rounded-md flex flex-row justify-center items-center text-green-600  hover:bg-green-600 hover:text-white transition-colors duration-200"
                            onClick={onClick}
                        >
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
export default ConfirmBookingButton;
