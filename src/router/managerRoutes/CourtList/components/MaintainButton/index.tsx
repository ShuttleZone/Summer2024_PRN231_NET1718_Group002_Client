import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";

interface MaintainButtonProps {
    onClick: () => void;
    title: string;
    content: string;
    buttonTitle: string;
    children: React.ReactNode;
}

function MaintainButton({
    onClick,
    title,
    content,
    buttonTitle,
    children,
}: MaintainButtonProps) {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <h3>{title}</h3>
                </DialogHeader>
                <DialogDescription>{content}</DialogDescription>
                <DialogFooter>
                    <DialogClose>
                        <Button variant={"outline"}>Hủy</Button>
                    </DialogClose>
                    <DialogClose>
                        <Button onClick={onClick}>{buttonTitle}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default MaintainButton;
