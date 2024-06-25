import {useToast} from "@/components/ui/use-toast";
import {useAppSelector} from "@/store";
import {useCreateReservationMutation} from "@/store/services/reservations/reservation.api";
import {clearBookingState} from "@/store/slices/bookingStage.slice";
import {FormEvent} from "react";
import {useNavigate} from "react-router-dom";
import ConfirmBookingButton from "../components/ConfirmBookingButton";

interface ReservationDetail {
    startTime: string;
    endTime: string;
    price: number;
    courtId: string;
}

function ConfirmBooking() {
    const [createReservation] = useCreateReservationMutation();
    const {toast} = useToast();
    const navigate = useNavigate();
    const today = getCurrentDateFormatted();

    const clubDetailData = useAppSelector(
        (state) => state.bookingStage.ClubDetail
    );
    const personalInformationData = useAppSelector(
        (state) =>
            state.bookingStage.PersonaInformation.BookingPersonInformation
    );
    const bookedSlot = useAppSelector(
        (state) => state.bookingStage.TimeAndDate.Slots
    );
    const totalPrice = useAppSelector(
        (state) => state.bookingStage.TimeAndDate.TotalPrice
    );

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const reservationDetails: ReservationDetail[] = bookedSlot.map(
            (slot) => ({
                startTime: slot.Date + " " + slot.StartTime,
                endTime: slot.Date + " " + slot.EndTime,
                price: slot.Price,
                courtId: slot.CourtId,
            })
        );

        const formData = new FormData();

        formData.append("TotalPrice", totalPrice.toString());
        formData.append("Note", personalInformationData.Note);
        formData.append("Phone", personalInformationData.Phone);
        formData.append("FullName", personalInformationData.Name);

        reservationDetails.forEach((detail, index) => {
            formData.append(
                `ReservationDetails[${index}][StartTime]`,
                detail.startTime
            );
            formData.append(
                `ReservationDetails[${index}][EndTime]`,
                detail.endTime
            );
            formData.append(
                `ReservationDetails[${index}][Price]`,
                detail.price.toString()
            );
            formData.append(
                `ReservationDetails[${index}][CourtId]`,
                detail.courtId
            );
        });

        try {
            await createReservation(formData).unwrap();
            toast({
                title: "Thành công",
                description: "Đặt sân thành công",
                variant: "default",
            });
            navigate("/my-invoices");
        } catch (error: any /* eslint-disable-line */) {
            toast({
                title: "Lỗi",
                description: error?.data?.message || "Lỗi không xác định",
                variant: "destructive",
            });
        }
        clearBookingState();
    };

    function getCurrentDateFormatted(): string {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-indexed month
        const year = now.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return (
        <div className="mb-16">
            <div className="flex flex-col justify-center items-center py-4 px-16 my-4">
                <h1 className="font-semibold text-2xl">Xác nhận đơn hàng</h1>
                <p>
                    Đặt phòng đã được xác nhận. Liên hệ với bộ phận hỗ trợ để
                    thay đổi/thắc mắc. Hãy tận hưởng trải nghiệm đào tạo của bạn
                    với chúng tôi.
                </p>
            </div>
            <div className="w-full h-fit border-2 border-gray-200 px-4 py-8">
                <h1 className="text-2xl font-semibold my-4">
                    Chi tiết đặt chỗ
                </h1>
                <div className="w-full ">
                    <h1 className="text-xl font-semibold">Thông tin cá nhân</h1>
                    <div className="flex flex-row mt-4 gap-20 border-b-2 border-b-gray-300 pb-8 my-4">
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">
                                Tên người dùng
                            </h1>
                            <p>{personalInformationData.Name}</p>
                        </div>
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">
                                Ngày đặt sân
                            </h1>
                            <p>{today}</p>
                        </div>
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">
                                Số điện thoại
                            </h1>
                            <p>{personalInformationData.Phone}</p>
                        </div>
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">Email</h1>
                            <p>{personalInformationData.Email}</p>
                        </div>
                    </div>

                    <h1 className="text-xl font-semibold">Chi tiết đặt sân</h1>
                    <div className="flex flex-row mt-4 gap-20 border-b-2 border-b-gray-300 pb-8 my-4">
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">Tổng chỗ</h1>
                            <p>{bookedSlot.length}</p>
                        </div>

                        <div className="w-62 h-fit overflow-y-scroll px-2 max-h-72">
                            <h1 className="text-lg font-semibold">
                                Thời gian đặt chỗ
                            </h1>
                            {bookedSlot &&
                                bookedSlot.map((item) => (
                                    <p className="my-2">
                                        {item.Date} | {item.StartTime} -{" "}
                                        {item.EndTime} | {item.CourtName}
                                    </p>
                                ))}
                        </div>

                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">Tổng tiền</h1>
                            <p className="bg-green-600 text-white px-4 py-2 rounded-2xl">
                                {totalPrice} VND
                            </p>
                        </div>
                    </div>

                    <h1 className="text-xl font-semibold">Chi tiết sân</h1>
                    <div className="flex flex-row mt-4 gap-20 pb-8 my-4">
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">
                                Câu lạc bộ
                            </h1>
                            <p>{clubDetailData.clubName}</p>
                        </div>
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">Địa chỉ</h1>
                            <p>{clubDetailData.clubAddress}</p>
                        </div>
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">
                                Số điện thoại
                            </h1>
                            <p>{clubDetailData.clubPhone}</p>
                        </div>
                    </div>
                    <ConfirmBookingButton onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
}
export default ConfirmBooking;
