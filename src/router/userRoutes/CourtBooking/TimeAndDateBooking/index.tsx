import CourtSchedule from "@/components/CourtSchedule";
import DatePicker from "@/components/DatePicker";
import {Button} from "@/components/ui/button";
import {useState} from "react";
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
    const [selectedDate, setSelectedDate] = useState(new Date(2023, 3, 24));

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
                <div className=" h-fit w-4/5  mr-8 shadow-lg border-2">
                    <DatePicker
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                    <CourtSchedule selectedDate={selectedDate} />
                </div>
                <div className="w-1/5">
                    <h1 className="text-xl font-semibold py-7 text-center">
                        Booking Details
                    </h1>
                    <div className="my-2 pl-2">
                        <h1 className="text-start text-lg flex flex-row items-center gap-5">
                            <span className="w-12 h-12 bg-slate-100 flex justify-center items-center">
                                <CiCalendarDate className="text-xl text-green-600" />
                            </span>
                            27,April2023
                        </h1>
                    </div>
                    <div className="my-2 pl-2">
                        <h1 className="text-start text-lg flex flex-row items-center gap-5">
                            <span className="w-12 h-12 bg-slate-100 flex justify-center items-center">
                                <GoClock className="text-xl text-green-600" />
                            </span>
                            05:00 AM to 22:00 PM
                        </h1>
                    </div>
                    <div className="my-2 pl-2">
                        <h1 className="text-start text-lg flex flex-row items-center gap-5">
                            <span className="w-12 h-12 bg-slate-100 flex justify-center items-center">
                                <GoClock className="text-xl text-green-600" />
                            </span>
                            Total Hour: 12 Hrs
                        </h1>
                    </div>
                    <Button className="bg-green-700 rounded-2xl w-full text-xl py-8 mt-8">
                        Subtotal: 120.000 vnd
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default TimeAndDateBooking;
