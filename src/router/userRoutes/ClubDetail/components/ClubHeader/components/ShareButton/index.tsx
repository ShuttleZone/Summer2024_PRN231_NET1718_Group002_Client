import {Copy} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {CiShare2} from "react-icons/ci";
import {useLocation} from "react-router-dom";
import {useState} from "react";

function ShareButton() {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleCopyText = () => {
        const link = document.getElementById("link") as HTMLInputElement;
        link.select();
        navigator.clipboard.writeText(link.value);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="flex justify-between items-center gap-2 border border-black/10 rounded px-2 py-1 text-nowrap">
                    <CiShare2 />
                    <span>Chia sẻ</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Chia sẻ</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue={
                                window.location.origin + location.pathname
                            }
                            readOnly
                        />
                    </div>
                    <Button
                        onClick={handleCopyText}
                        type="submit"
                        size="sm"
                        className="px-3"
                    >
                        <span className="sr-only">Sao chép</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ShareButton;
