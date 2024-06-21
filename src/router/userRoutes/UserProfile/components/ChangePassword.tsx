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

    const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const payload = {
                currentPassword,
                newPassword,
            };

            await updatePassword(payload).unwrap();
            toast({
                title: "Success",
                description: "Update successfully",
                variant: "default",
            });
        } catch (error) {
            toast({
                title: "Failed",
                description: "Update failed",
                variant: "default",
            });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="bg-gradient-to-r from-[#ececef] via-[#5F9053]/30 to-[#0dde10] h-12 w-52 hover:bg-black hover:text-white"
                    variant="outline"
                >
                    Change Password
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Change your password
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={HandleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                className="text-right"
                                htmlFor="old-password"
                            >
                                Old Password
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
                                New Password
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
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ChangePassword;
