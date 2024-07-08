import DatePicker from "@/components/DatePicker";
import BookingStep from "../BookingStep";
import CourtSchedule from "@/components/CourtSchedule";
import {PiCourtBasketball} from "react-icons/pi";
import {Dispatch, SetStateAction} from "react";

interface SelectSlotsStepProps {
    currentStep: number;
    shouldContinue: boolean;
    clubId?: string;
    onGoToNextStep: () => void;
    selectedDate: Date;
    onSetSelectedDate: Dispatch<SetStateAction<Date>>;
    onBookSlot: (bookedSlot: {
        CourtName: string;
        Date: string;
        EndTime: string;
        StartTime: string;
        Price: number;
        CourtId: string;
    }) => void;
    targettedCourts: string[];
}

function SelectSlotsStep({
    currentStep,
    shouldContinue,
    onGoToNextStep,
    clubId,
    selectedDate,
    onSetSelectedDate,
    onBookSlot,
    targettedCourts,
}: SelectSlotsStepProps) {
    return (
        <BookingStep
            title={"Chọn thời gian"}
            step={1}
            shouldContinue={shouldContinue}
            currentStep={currentStep}
            onGoToNextStep={onGoToNextStep}
        >
            <div className="flex flex-col justify-between w-full px-8 mb-8">
                <div className="h-fit w-full mr-8 shadow-lg border-2">
                    <DatePicker
                        selectedDate={selectedDate}
                        setSelectedDate={onSetSelectedDate}
                    />
                    <CourtSchedule
                        onBookSlot={onBookSlot}
                        targettedCourts={targettedCourts}
                        clubId={clubId}
                        selectedDate={selectedDate}
                    />
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
                </div>
            </div>
        </BookingStep>
    );
}

export default SelectSlotsStep;
