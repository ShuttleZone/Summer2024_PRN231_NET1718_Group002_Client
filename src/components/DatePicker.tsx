import React from "react";

interface DatePickerProps {
    selectedDate: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DatePicker: React.FC<DatePickerProps> = ({
    selectedDate,
    setSelectedDate,
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

    const isToday = () => {
        const today = new Date();
        return (
            selectedDate.getDate() === today.getDate() &&
            selectedDate.getMonth() === today.getMonth() &&
            selectedDate.getFullYear() === today.getFullYear()
        );
    };

    return (
        <div className="flex items-center w-full justify-between p-4">
            <button
                type="button"
                onClick={handlePrev}
                className={`text-2xl mx-2 ${isToday() ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isToday()}
            >
                <p className="w-8 h-8">&lt;</p>
            </button>
            <div className="flex flex-col items-center mx-4">
                <div className="font-semibold">
                    {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                    })}
                </div>
                <div>
                    {selectedDate.getDate()}/{selectedDate.getMonth() + 1}
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
