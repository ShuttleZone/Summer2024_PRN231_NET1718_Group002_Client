import {useAppSelector} from "@/store";
import {useCreateReservationMutation} from "@/store/services/reservations/reservation.api";
import {FormEvent} from "react";

interface ReservationDetail {
    startTime: string;
    endTime: string;
    price: number;
    courtId: string;
}

function ConfirmBooking() {
    const [createReservation] = useCreateReservationMutation();

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
    function getCurrentDateFormatted(): string {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-indexed month
        const year = now.getFullYear();

        return `${day}/${month}/${year}`;
    }
    const today = getCurrentDateFormatted();

    const handleSubmit = async (e: FormEvent) => {
        console.log(today);
        const reservationDetails: ReservationDetail[] = bookedSlot.map(
            (slot) => ({
                startTime: slot.Date + " " + slot.StartTime,
                endTime: slot.Date + " " + slot.EndTime,
                price: slot.Price,
                courtId: slot.CourtId,
            })
        );

        e.preventDefault();
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

        await createReservation(formData);
    };

    return (
        <div className="mb-16">
            <div className="flex flex-col justify-center items-center py-4 px-16 my-4">
                <h1 className="font-semibold text-2xl">Order Confirmation</h1>
                <p>
                    Booking confirmed. Contact support for changes/inquiries.
                    Enjoy your training experience with us.
                </p>
            </div>
            <div className="w-full h-fit border-2 border-gray-200 px-4 py-8">
                <h1 className="text-2xl font-semibold my-4">
                    Reservation Detail
                </h1>
                <div className="w-full ">
                    <h1 className="text-xl font-semibold">Personal Detail</h1>
                    <div className="flex flex-row mt-4 gap-20 border-b-2 border-b-gray-300 pb-8 my-4">
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">User Name</h1>
                            <p>{personalInformationData.Name}</p>
                        </div>
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">
                                Created reservation date
                            </h1>
                            <p>{today}</p>
                        </div>
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">
                                Phone Number
                            </h1>
                            <p>{personalInformationData.Phone}</p>
                        </div>
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">Email</h1>
                            <p>{personalInformationData.Email}</p>
                        </div>
                    </div>

                    <h1 className="text-xl font-semibold">Booking Detail</h1>
                    <div className="flex flex-row mt-4 gap-20 border-b-2 border-b-gray-300 pb-8 my-4">
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">
                                Total slot
                            </h1>
                            <p>{bookedSlot.length}</p>
                        </div>

                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">
                                Appointment slot
                            </h1>
                            {bookedSlot &&
                                bookedSlot.map((item) => (
                                    <p>
                                        {item.Date} | {item.StartTime} -{" "}
                                        {item.EndTime} | {item.CourtName}
                                    </p>
                                ))}
                        </div>

                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">Subtotal</h1>
                            <p className="bg-green-600 text-white px-4 py-2 rounded-2xl">
                                {totalPrice} VND
                            </p>
                        </div>
                    </div>

                    <h1 className="text-xl font-semibold">Court Detail</h1>
                    <div className="flex flex-row mt-4 gap-20 pb-8 my-4">
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">Club Name</h1>
                            <p>{clubDetailData.clubName}</p>
                        </div>
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">
                                Club Address
                            </h1>
                            <p>{clubDetailData.clubAddress}</p>
                        </div>
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">
                                Club Phone
                            </h1>
                            <p>{clubDetailData.clubPhone}</p>
                        </div>
                    </div>
                    <button
                        className="mx-auto w-56 h-20 border-2 border-green-600 rounded-3xl flex flex-row justify-center items-center text-green-600  hover:bg-green-600 hover:text-white transition-colors duration-300"
                        onClick={handleSubmit}
                    >
                        <h1 className="text-xl font-semibold ">
                            Make reservation
                        </h1>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ConfirmBooking;
