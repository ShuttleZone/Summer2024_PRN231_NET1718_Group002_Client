import React from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Calendar as CalendarIcon} from "lucide-react";

interface DatePickerProps {
    selectedDate: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
    minDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
    selectedDate,
    setSelectedDate,
    minDate = new Date(),
}) => {
    const handlePrev = () => {
        const newDate = new Date(selectedDate.getTime());
        newDate.setDate(selectedDate.getDate() - 1);
        setSelectedDate(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(selectedDate.getTime());
        newDate.setDate(selectedDate.getDate() + 1);
        setSelectedDate(newDate);
    };

    const isMinDate = () => {
        return (
            selectedDate.getDate() === minDate.getDate() &&
            selectedDate.getMonth() === minDate.getMonth() &&
            selectedDate.getFullYear() === minDate.getFullYear()
        );
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(event.target.value);
        setSelectedDate(newDate);
    };

    return (
        <div className="flex items-center w-full justify-between p-4">
            <button
                type="button"
                onClick={handlePrev}
                className={`text-2xl mx-2 ${isMinDate() ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isMinDate()}
            >
                <p className="w-8 h-8">&lt;</p>
            </button>
            <div className="flex flex-col items-center mx-4">
                <div className="font-semibold text-lg">
                    {selectedDate.toLocaleDateString("vi-VN", {
                        weekday: "long",
                    })}
                </div>
                <div>
                    {/* {selectedDate.getDate()}/{selectedDate.getMonth() + 1} */}
                    <input
                        type="date"
                        value={selectedDate.toISOString().substr(0, 10)}
                        onChange={handleDateChange}
                        className="mx-4 p-2 border rounded"
                    />
                </div>
            </div>

            <button
                type="button"
                onClick={handleNext}
                className="text-2xl mx-2"
            >
                <p className="w-8 h-8">&gt;</p>
            </button>
        </div>
    );
};

export default DatePicker;
