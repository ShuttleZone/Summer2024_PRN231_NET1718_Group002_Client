import CourtSchedule from "@/components/CourtSchedule";
import DatePicker from "@/components/DatePicker";
import {Button} from "@/components/ui/button";
import {useAppDispatch, useAppSelector} from "@/store";
import {setBookingTotalPrice} from "@/store/bookingStage.slice";
import {useEffect, useState} from "react";
import {CiCalendarDate} from "react-icons/ci";
import {GoClock} from "react-icons/go";
// interface CourtInfomation {
//     id: string;
//     rate: string;
//     totalReviews: number;
// }

// interface Court {
//     Id: string;
//     Name: string;
// }

// interface Club {
//     Id: string;
//     OpenTime: string;
//     CloseTime: string;
//     Courts: Court[];
// }

function TimeAndDateBooking() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [bookedDate, setBookedDate] = useState<string[]>([]);
    const [totalDuration, setTotalDuration] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const dispatch = useAppDispatch();
    const bookingSlot = useAppSelector(
        (state) => state.bookingStage.TimeAndDate.Slots
    );

    useEffect(() => {
        console.log(bookingSlot);
        const dates = bookingSlot.map(
            (x) => `${x.Date} - ${x.StartTime} - ${x.EndTime}`
        );
        setBookedDate(dates);
        let y = 0;
        bookingSlot.forEach((x) => (y += x.Price));
        setTotalPrice(y);
        dispatch(setBookingTotalPrice(y));
    }, [dispatch, bookingSlot]);

    useEffect(() => {
        let duration = 0;

        bookedDate.forEach((item) => {
            const [startTime, endTime] = item.split(" - ");
            const [startHour, startMinute] = startTime.split(":").map(Number);
            const [endHour, endMinute] = endTime.split(":").map(Number);

            duration += endHour - startHour + (endMinute - startMinute) / 60;
        });

        setTotalDuration(duration);
    }, [bookedDate]);
    return (
        <div>
            <div className="flex flex-col justify-center items-center py-4 px-16 my-4">
                <h1 className="font-semibold text-2xl">Time & Date</h1>
                <p>
                    Book your training season at a time and date that suits your
                    needs.
                </p>
            </div>
            <div className="flex flex-row justify-between w-full px-8 mb-8">
                <div className=" h-fit w-2/3  mr-8 shadow-lg border-2">
                    <DatePicker
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                    <CourtSchedule selectedDate={selectedDate} />
                </div>
                <div className="w-1/3">
                    <h1 className="text-xl font-semibold py-7 text-center">
                        Booking Details
                    </h1>
                    <div className="my-2 pl-2 max-h-56  overflow-x-auto">
                        <h1 className="text-start h-fit text-lg flex flex-row items-center gap-5 bg-slate-100 min-h-36">
                            <div className="w-12 h-full min-h-12 flex justify-center items-center">
                                <CiCalendarDate className="text-xl text-green-600" />
                            </div>
                            <div className="bg-white w-full py-4 pl-4 text-lg">
                                {bookedDate.map((item, index) => (
                                    <p className="my-2" key={index}>
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </h1>
                    </div>

                    <div className="my-2 pl-2">
                        <h1 className="text-start text-lg flex flex-row items-center gap-5">
                            <span className="w-16 h-16 bg-slate-100 flex justify-center items-center">
                                <GoClock className="text-xl text-green-600" />
                            </span>
                            {totalDuration} hours
                        </h1>
                    </div>
                    <Button className="bg-green-700 rounded-2xl w-full text-xl py-8 mt-8">
                        Subtotal: {totalPrice} vnd
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default TimeAndDateBooking;
