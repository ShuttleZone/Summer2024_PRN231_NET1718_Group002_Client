import ConfirmBookingButton from "@/router/userRoutes/CourtBooking/components/ConfirmBookingButton";
import {BookedSlot} from "../..";
import BookingStep from "../BookingStep";
import {useStaffCreateReservationMutation} from "@/store/services/reservations/reservation.api";
import {useToast} from "@/components/ui/use-toast";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "@/store";
import {clearBookingSlots} from "@/store/slices/bookingStage.slice";

interface ConfirmBookingButtonProps {
    currentStep: number;
    phoneNumber: string;
    name: string;
    slotsCount: number;
    clubName: string;
    clubAddress: string;
    clubPhone: string;
    totalPrice: number;
    selectedSlots: BookedSlot[];
    onGoBack: () => void;
}

interface MakeReservationRequest {
    totalPrice: number;
    note: string;
    phone: string;
    fullName: string;
    reservationDetails: ReservationDetail[];
}

interface ReservationDetail {
    startTime: string;
    endTime: string;
    price: number;
    courtId: string;
}

interface CreateReservationError {
    data: {
        message: string;
    };
}

function ConfirmReservationStep({
    currentStep,
    phoneNumber,
    name,
    slotsCount,
    clubName,
    clubPhone,
    clubAddress,
    totalPrice,
    selectedSlots,
    onGoBack,
}: ConfirmBookingButtonProps) {
    const [makeReservation] = useStaffCreateReservationMutation();
    const {toast} = useToast();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        const reservationDetails: ReservationDetail[] = selectedSlots.map(
            (slot) => {
                const startTime = new Date(slot.Date);
                startTime.setUTCHours(parseInt(slot.StartTime.split(":")[0]));
                startTime.setUTCMinutes(parseInt(slot.StartTime.split(":")[1]));
                const endTime = new Date(slot.Date);
                endTime.setUTCHours(parseInt(slot.EndTime.split(":")[0]));
                endTime.setUTCMinutes(parseInt(slot.EndTime.split(":")[1]));

                return {
                    startTime: startTime.toISOString(),
                    endTime: endTime.toISOString(),
                    price: slot.Price,
                    courtId: slot.CourtId,
                };
            }
        );

        const data: MakeReservationRequest = {
            totalPrice,
            note: "",
            phone: phoneNumber,
            fullName: name,
            reservationDetails,
        };

        try {
            const response = await makeReservation(data);
            if (!response.error) {
                toast({
                    title: "Thành công",
                    description: "Đặt sân thành công",
                });
                dispatch(clearBookingSlots());
                navigate("/staff/reservations/new");
            } else {
                toast({
                    title: "Lỗi",
                    description: (response.error as CreateReservationError).data
                        .message,
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Đã có lỗi xảy ra khi đặt sân",
                variant: "destructive",
            });
        }
    };

    return (
        <BookingStep
            title="Xác nhận đơn hàng"
            step={3}
            currentStep={currentStep}
            shouldContinue={false}
            onGoToNextStep={() => {}}
            onGoBack={onGoBack}
        >
            <div className="mb-16">
                <div className="flex flex-col justify-center items-center py-4 px-16 my-4">
                    <h1 className="font-semibold text-2xl">
                        Xác nhận đơn hàng
                    </h1>
                    <p>
                        Đặt phòng đã được xác nhận. Liên hệ với bộ phận hỗ trợ
                        để thay đổi/thắc mắc. Hãy tận hưởng trải nghiệm đào tạo
                        của bạn với chúng tôi.
                    </p>
                </div>
                <div className="w-full h-fit border-2 border-gray-200 px-4 py-8">
                    <h1 className="text-2xl font-semibold my-4">
                        Chi tiết đặt chỗ
                    </h1>
                    <div className="w-full ">
                        <h1 className="text-xl font-semibold">
                            Thông tin cá nhân
                        </h1>
                        <div className="grid grid-cols-3 mt-4 gap-20 border-b-2 border-b-gray-300 pb-8 my-4">
                            <div className="h-fit">
                                <h1 className="text-md font-semibold">
                                    Tên người dùng
                                </h1>
                                <p>{name}</p>
                            </div>
                            <div className="h-fit">
                                <h1 className="text-md font-semibold">
                                    Ngày đặt sân
                                </h1>
                                <p>{new Date().toLocaleDateString()}</p>
                            </div>
                            <div className="h-fit">
                                <h1 className="text-md font-semibold">
                                    Số điện thoại
                                </h1>
                                <p>{phoneNumber}</p>
                            </div>
                        </div>

                        <h1 className="text-xl font-semibold">
                            Chi tiết đặt sân
                        </h1>
                        <div className="grid grid-cols-3 mt-4 gap-20 border-b-2 border-b-gray-300 pb-8 my-4">
                            <div className="h-fit">
                                <h1 className="text-md font-semibold">
                                    Tổng chỗ
                                </h1>
                                <p>{slotsCount}</p>
                            </div>

                            <div className="h-fit overflow-y-auto max-h-72">
                                <h1 className="text-md font-semibold">
                                    Thời gian đặt chỗ
                                </h1>
                                {selectedSlots?.map((item) => (
                                    <p className="my-2">
                                        {item.Date} | {item.StartTime} -{" "}
                                        {item.EndTime} | {item.CourtName}
                                    </p>
                                ))}
                            </div>

                            <div className="h-fit">
                                <h1 className="text-md font-semibold">
                                    Tổng tiền
                                </h1>
                                <p className="bg-green-600 text-white px-4 py-2 rounded-2xl w-fit">
                                    {totalPrice} VND
                                </p>
                            </div>
                        </div>

                        <h1 className="text-xl font-semibold">Chi tiết sân</h1>
                        <div className="grid grid-cols-3 mt-4 gap-20 pb-8 my-4">
                            <div className="h-fit">
                                <h1 className="text-md font-semibold">
                                    Câu lạc bộ
                                </h1>
                                <p>{clubName}</p>
                            </div>
                            <div className="h-fit">
                                <h1 className="text-md font-semibold">
                                    Địa chỉ
                                </h1>
                                <p>{clubAddress}</p>
                            </div>
                            <div className="h-fit">
                                <h1 className="text-md font-semibold">
                                    Số điện thoại
                                </h1>
                                <p>{clubPhone}</p>
                            </div>
                        </div>
                        <ConfirmBookingButton onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </BookingStep>
    );
}

export default ConfirmReservationStep;
