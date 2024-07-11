import {useState} from "react";
import BookingStep from "../BookingStep";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem} from "@/components/ui/select";
import {SelectTrigger, SelectValue} from "@radix-ui/react-select";
import {useGetUsersForBookingQuery} from "@/store/services/accounts/auth.api";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

interface SelectCustomerStepProps {
    currentStep: number;
    shouldContinue: boolean;
    onGoToNextStep: () => void;
    onGoBack: () => void;
    onSelectUser: (fullname: string, phoneNumber: string) => void;
}

function SelectCustomerStep({
    currentStep,
    shouldContinue,
    onGoToNextStep,
    onGoBack,
    onSelectUser,
}: SelectCustomerStepProps) {
    const [showSelection, setShowSelection] = useState<boolean>(true);
    const [useUserInfo, setUseUserInfo] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [fullname, setFullname] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const {data: users} = useGetUsersForBookingQuery("", {skip: !useUserInfo});

    const handleChooseUseUserInfo = () => {
        setUseUserInfo(true);
        setShowSelection(false);
    };

    const handleChooseTypeUserInfo = () => {
        setUseUserInfo(false);
        setShowSelection(false);
    };

    const handleSelectUser = (userId: string) => {
        setSelectedUser(userId);
        const user = users?.find((u) => u.id === userId);
        if (user) {
            onSelectUser(user.fullname, user.phoneNumber);
        }
    };

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFullname(value);
        onSelectUser(value, phoneNumber);
    };

    const handlePhoneNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        if (value.length > 10) {
            e.currentTarget.value = value.slice(0, value.length - 1);
            return;
        }
        if (/^\d{1,10}$/.test(value) || value === "") {
            setPhoneNumber(value);
            onSelectUser(fullname, value);
        } else {
            e.currentTarget.value = value.slice(0, value.length - 1);
            setPhoneNumber("");
        }
    };

    return (
        <BookingStep
            title={"Thông tin khách hàng"}
            step={2}
            shouldContinue={shouldContinue}
            currentStep={currentStep}
            onGoToNextStep={onGoToNextStep}
            onGoBack={onGoBack}
        >
            {showSelection ? (
                <div className="w-full flex justify-center items-center gap-8 my-4">
                    <Button onClick={handleChooseUseUserInfo}>
                        Chọn người dùng có sẵn
                    </Button>
                    <Button onClick={handleChooseTypeUserInfo}>
                        Nhập thông tin người dùng
                    </Button>
                </div>
            ) : useUserInfo ? (
                <Select
                    onValueChange={handleSelectUser}
                    value={selectedUser || ""}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Chọn người dùng" />
                    </SelectTrigger>
                    <SelectContent>
                        {!users || users.length === 0 ? (
                            <SelectItem value="empty" disabled>
                                Không có người dùng nào
                            </SelectItem>
                        ) : (
                            users?.map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                    {user.fullname}
                                </SelectItem>
                            ))
                        )}
                    </SelectContent>
                </Select>
            ) : (
                <div className="w-full flex flex-col gap-4 my-4 text-lg">
                    <div>
                        <Label>Họ và tên</Label>
                        <Input
                            onChange={handleFullNameChange}
                            type="text"
                            placeholder="Họ và tên"
                        />
                    </div>
                    <div>
                        <Label>Số điện thoại</Label>
                        <Input
                            onChange={handlePhoneNumberChange}
                            type="text"
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                </div>
            )}
        </BookingStep>
    );
}

export default SelectCustomerStep;
