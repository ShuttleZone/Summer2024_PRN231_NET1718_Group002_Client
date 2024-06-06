import {useAppSelector} from "@/store";
import {MdPayment} from "react-icons/md";

function ConfirmBooking() {
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
    const today =
        new Date().getDate() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getFullYear();

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
                            <p className="bg-green-600 text-white px-4 rounded-2xl">
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
                    <button className="w-56 h-20 bg-green-600 rounded-3xl flex flex-row justify-start items-center gap-5 pl-4 hover:bg-green-400 transition-colors duration-300">
                        <MdPayment className="text-4xl" />
                        <h1 className="text-xl font-semibold">Check out</h1>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ConfirmBooking;
