import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useToast} from "@/components/ui/use-toast";
import {useUpdatePasswordMutation} from "@/store/services/accounts/auth.api";
import {useState} from "react";

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [updatePassword] = useUpdatePasswordMutation();
    const {toast} = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const payload = {
                currentPassword,
                newPassword,
            };

            await updatePassword(payload).unwrap();
            toast({
                title: "Thành công",
                description: "Cập nhật mật khẩu thành công.",
                variant: "default",
            });
        } catch (error) {
            toast({
                title: "Thất bại",
                description: "Cập nhật mật khẩu thất bại.",
                variant: "default",
            });
        }
    };

    const handleCancel = () => {
        setCurrentPassword("");
        setNewPassword("");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="border-2 border-black rounded-md cursor-pointer text-black hover:bg-green-500 hover:border-green-300 hover:text-white transition-colors duration-200"
                    variant="outline"
                >
                    Đổi mật khẩu
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Đổi mật khẩu</DialogTitle>
                    <DialogDescription>
                        Thực hiện thay đổi cho hồ sơ của bạn ở đây. Bấm lưu khi
                        bạn đã hoàn tất.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                className="text-right"
                                htmlFor="old-password"
                            >
                                Mật khẩu hiện tại
                            </Label>
                            <Input
                                id="old-password"
                                name="currentPassword"
                                className="col-span-3"
                                type="password"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                className="text-right"
                                htmlFor="new-password"
                            >
                                Mật khẩu mới
                            </Label>
                            <Input
                                id="new-password"
                                name="newPassword"
                                className="col-span-3"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            className="border-2 bg-white border-green-600 rounded-md flex flex-row justify-center items-center text-green-600  hover:bg-green-600 hover:text-white transition-colors duration-200"
                            type="submit"
                        >
                            Lưu thay đổi
                        </Button>
                        <Button
                            type="button"
                            onClick={handleCancel}
                            className="ml-4 border-2 bg-white border-red-600 rounded-md flex flex-row justify-center items-center text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200"
                        >
                            Hủy
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ChangePassword;
