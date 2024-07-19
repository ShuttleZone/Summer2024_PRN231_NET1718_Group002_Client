import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    useAssignClubStaffMutation,
    useGetClubNamesQuery,
} from "@/store/services/clubs/club.api";
import {AssignStaffRequest} from "@/@types/api";
import {useToast} from "@/components/ui/use-toast";
interface CreateStaffDialogProps {
    afterSubmit: () => void;
}

function CreateStaffDialog(props: CreateStaffDialogProps) {
    const {data: clubNames, isLoading} = useGetClubNamesQuery();
    const [assignStaff] = useAssignClubStaffMutation();
    const {toast} = useToast();
    const initValue = {
        clubId: "",
        userName: "NhanVien",
        email: "staff@gmail.com",
        password: "",
        fullName: "Nguyễn Văn A",
        gender: 0,
        phoneNumber: "0123456789",
    };

    const [formData, setFormData] = useState<AssignStaffRequest>(initValue);

    if (isLoading) return <div>Is Loading</div>;

    const HandleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const HandleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {error} = await assignStaff(formData);
        if (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const errorMessage = (error as any).data.value;
            if (errorMessage) {
                toast({
                    title: "Lỗi",
                    description: errorMessage,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Lỗi",
                    description: "Có lỗi xảy ra, vui lòng thử lại",
                    variant: "destructive",
                });
            }
        } else {
            toast({
                title: "Thành công",
                description: "Thêm nhân viên thành công",
                variant: "default",
            });
        }
        props.afterSubmit();
        setFormData(initValue);
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Tạo nhân viên</Button>
                </DialogTrigger>
                <DialogContent className="min-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Tạo mới nhân viên</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={HandleSubmit} className="grid gap-4 py-4">
                        <div className="grid grid-cols-8 items-center gap-4">
                            <Label htmlFor="club" className="text-right">
                                Tên câu lạc bộ
                            </Label>
                            <Select
                                onValueChange={(value) =>
                                    HandleSelectChange("clubId", value)
                                }
                                required
                            >
                                <SelectTrigger className="col-span-7">
                                    <SelectValue placeholder="Hãy chọn câu lạc bộ" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clubNames &&
                                        clubNames.map((item) => (
                                            <SelectItem
                                                key={item.Id}
                                                value={item.Id}
                                            >
                                                <div>
                                                    <h1>{item.ClubName}</h1>
                                                    <span>
                                                        {item.ClubAddress}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-8 items-center gap-4">
                            <Label htmlFor="FullName" className="text-right">
                                Họ và tên
                            </Label>
                            <Input
                                id="FullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={HandleChange}
                                required
                                className="col-span-3"
                            />
                            <Label htmlFor="Email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={HandleChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-8 items-center gap-4">
                            <Label htmlFor="PhoneNumber" className="text-right">
                                Số điện thoại
                            </Label>
                            <Input
                                id="PhoneNumber"
                                name="phoneNumber"
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={HandleChange}
                                className="col-span-3"
                                required
                            />
                            <Label htmlFor="Gender" className="text-right">
                                Giới tính
                            </Label>
                            <Select
                                onValueChange={(value) =>
                                    HandleSelectChange("gender", value)
                                }
                                defaultValue="0"
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Giới tính" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Nam</SelectItem>
                                    <SelectItem value="1">Nữ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-8 items-center gap-4">
                            <Label htmlFor="userName" className="text-right">
                                Tài khoản đăng nhập
                            </Label>
                            <Input
                                id="UserName"
                                name="userName"
                                value={formData.userName}
                                onChange={HandleChange}
                                className="col-span-3"
                                required
                            />
                            <Label htmlFor="password" className="text-right">
                                Mật khẩu đăng nhập
                            </Label>
                            <Input
                                id="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={HandleChange}
                                className="col-span-3"
                                required
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
                                title="Mật khẩu phải chứa ít nhất một chữ cái viết thường, một chữ cái viết hoa, một chữ số, một ký tự đặc biệt và dài ít nhất 8 ký tự"
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Đăng kí</Button>
                            <DialogClose>
                                <Button>Hủy</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateStaffDialog;
