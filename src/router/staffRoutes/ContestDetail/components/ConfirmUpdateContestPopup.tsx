import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface ConfirmUpdateContestPopupProps {
    onSubmit: () => void;
}

function ConfirmUpdateContestPopup({onSubmit}: ConfirmUpdateContestPopupProps) {
    return (
        <Dialog>
            <DialogTrigger>
                <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition">
                    Cập nhật điểm
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Cập nhật điểm</DialogTitle>
                <DialogDescription>
                    Bạn chỉ có thể cập nhập thông tin của cuộc thi một lần duy
                    nhất. Bạn có chắc chắn muốn cập nhật thông tin cuộc thi này
                    không?
                </DialogDescription>
                <DialogFooter>
                    <DialogClose>
                        <button
                            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                            onClick={onSubmit}
                        >
                            Cập nhật
                        </button>
                    </DialogClose>
                    <DialogClose>
                        <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition">
                            Hủy
                        </button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ConfirmUpdateContestPopup;
