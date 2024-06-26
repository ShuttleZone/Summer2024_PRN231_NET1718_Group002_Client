import CourtSchedule from "@/components/CourtSchedule";
import DatePicker from "@/components/DatePicker";
import {Button} from "@/components/ui/button";
import {useAppDispatch, useAppSelector} from "@/store";
import {
    selectStageById,
    setBookingTotalPrice,
    setStage,
} from "@/store/slices/bookingStage.slice";
import {useEffect, useState} from "react";
import {CiCalendarDate} from "react-icons/ci";
import {useNavigate, useParams} from "react-router-dom";
import {PiCourtBasketball} from "react-icons/pi";
import {IoIosInformationCircleOutline} from "react-icons/io";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const dispatch = useAppDispatch();
    const bookingSlot = useAppSelector(
        (state) => state.bookingStage.TimeAndDate.Slots
    );
    const navigate = useNavigate();
    const currentStageId = useAppSelector(
        (state) => state.bookingStage.CurrentStage
    );
    const currentStage = useAppSelector((state) =>
        selectStageById(state.bookingStage, currentStageId)
    );
    const {id} = useParams();
    const bookingLocation = `/clubs/${id}/court-booking`;
    const handleClick = (id: number) => {
        dispatch(setStage(id));
    };
    useEffect(() => {
        if (currentStage?.Path) {
            navigate(bookingLocation + currentStage.Path);
        }
    }, [currentStage, navigate, bookingLocation]);

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

    return (
        <div>
            <div className="flex flex-col justify-center items-center py-4 px-16 my-4">
                <h1 className="font-semibold text-2xl">Thời gian tập luyện</h1>
                <p>Chọn thời gian tập luyện phù hợp với thời gian của bạn</p>
            </div>
            <div className="flex flex-col justify-between w-full px-8 mb-8">
                <div className=" h-fit w-full  mr-8 shadow-lg border-2">
                    <DatePicker
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                    <CourtSchedule selectedDate={selectedDate} />
                </div>
                <div className="w-full flex justify-between">
                    <div className="w-1/5">
                        <div className="flex flex-row justify-between items-center my-4">
                            <PiCourtBasketball className="text-5xl text-black" />
                            <span className="text-xl w-32 font-semibold">
                                Còn trống
                            </span>
                        </div>
                        <div className="flex flex-row justify-between items-center my-4">
                            <PiCourtBasketball className="text-5xl text-green-500" />
                            <span className="text-xl w-32 font-semibold">
                                Đang chọn
                            </span>
                        </div>
                        <div className="flex flex-row justify-between items-center my-4">
                            <PiCourtBasketball className="text-5xl text-red-500" />
                            <span className="text-xl w-32 font-semibold">
                                Đã bán
                            </span>
                        </div>
                        <div className="flex flex-row justify-between items-center my-4">
                            <PiCourtBasketball className="text-5xl text-orange-500" />
                            <span className="text-xl w-32 font-semibold">
                                Bảo trì/Bận
                            </span>
                        </div>
                    </div>
                    <div className="w-1/3">
                        <h1 className="text-center py-7 ">
                            <span className="text-xl font-semibold  mr-4">
                                {" "}
                                Thông tin đặt sân
                            </span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <IoIosInformationCircleOutline className="text-2xl hover:text-green-500" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-lg font-semibold">
                                            Không thể đặt sân có thời gian bắt
                                            đầu trong vòng 30 phút
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </h1>
                        <div className="my-2 pl-2 h-56  overflow-x-auto">
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
                        <Button
                            className="bg-green-700 rounded-2xl w-full text-xl py-8 mt-8"
                            onClick={() => handleClick(3)}
                        >
                            Tổng tiền: {totalPrice} vnd
                        </Button>
                    </div>

                    {/* <div className="my-2 pl-2">
                        <h1 className="text-start text-lg flex flex-row items-center gap-5">
                            <span className="w-16 h-16 bg-slate-100 flex justify-center items-center">
                                <GoClock className="text-xl text-green-600" />
                            </span>
                            {totalDuration} hours
                        </h1>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
export default TimeAndDateBooking;
