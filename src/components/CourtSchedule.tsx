import React, {useState} from "react";

interface CourtScheduleProps {
    selectedDate: Date;
}

interface Slot {
    time: string;
    court: string;
}

const CourtSchedule: React.FC<CourtScheduleProps> = ({selectedDate}) => {
    const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);

    const formatDateKey = (date: Date): string =>
        date.toISOString().split("T")[0];

    const getSlotsForDate = (date: Date): Slot[] => {
        const dateKey = formatDateKey(date);
        const slotsByDate: {[key: string]: Slot[]} = {
            "2023-04-24": [
                {time: "7:00 - 8:00", court: "court A"},
                {time: "8:00 - 9:00", court: "court A"},
                {time: "9:00 - 10:00", court: "court A"},
                {time: "7:00 - 8:00", court: "court B"},
                {time: "8:00 - 9:00", court: "court B"},
                {time: "9:00 - 10:00", court: "court B"},
                {time: "8:00 - 9:00", court: "court C"},
                {time: "9:00 - 10:00", court: "court C"},
                {time: "10:00 - 11:00", court: "court C"},
                {time: "7:00 - 8:00", court: "court D"},
                {time: "9:00 - 10:00", court: "court D"},
                {time: "10:00 - 11:00", court: "court D"},
            ],
            "2023-04-25": [
                {time: "7:00 - 8:00", court: "court A"},
                {time: "8:00 - 9:00", court: "court A"},
                {time: "7:00 - 8:00", court: "court B"},
                {time: "8:00 - 9:00", court: "court B"},
                {time: "9:00 - 10:00", court: "court B"},
                {time: "8:00 - 9:00", court: "court C"},
                {time: "10:00 - 11:00", court: "court C"},
                {time: "11:00 - 12:00", court: "court C"},
                {time: "9:00 - 10:00", court: "court D"},
                {time: "10:00 - 11:00", court: "court D"},
                {time: "11:00 - 12:00", court: "court D"},
            ],
            // Add more dates and bookings as needed
        };

        return slotsByDate[dateKey] || [];
    };

    const handleSlotClick = (court: string, time: string) => {
        const slot = {court, time};
        if (selectedSlots.some((s) => s.court === court && s.time === time)) {
            setSelectedSlots(
                selectedSlots.filter(
                    (s) => !(s.court === court && s.time === time)
                )
            );
        } else {
            setSelectedSlots([...selectedSlots, slot]);
        }
    };

    const slots = getSlotsForDate(selectedDate);
    const courts = ["court A", "court B", "court C", "court D"];
    const timeSlots = [
        "5:00 - 6:00",
        "6:00 - 7:00",
        "7:00 - 8:00",
        "8:00 - 9:00",
        "9:00 - 10:00",
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 1:00",
        "1:00 - 2:00",
        "2:00 - 3:00",
        "3:00 - 4:00",
        "4:00 - 5:00",
        "5:00 - 6:00",
        "6:00 - 7:00",
        "7:00 - 8:00",
        "8:00 - 9:00",
        "9:00 - 10:00",
    ];

    return (
        <div className="p-4">
            <div className="flex">
                <div className="flex flex-col">
                    <div className="font-semibold">Courts</div>
                    {courts.map((court) => (
                        <div key={court} className="font-semibold py-2">
                            {court}
                        </div>
                    ))}
                </div>
                <div className="overflow-x-auto ml-4">
                    <div className="min-w-full grid grid-cols-[repeat(17,_minmax(100px,_1fr))] gap-4">
                        {timeSlots.map((slot) => (
                            <div key={slot} className="font-semibold">
                                {slot}
                            </div>
                        ))}
                        {courts.map((court) => (
                            <React.Fragment key={court}>
                                {timeSlots.map((slot) => {
                                    const isBooked = slots.some(
                                        (s) =>
                                            s.court === court && s.time === slot
                                    );
                                    const isSelected = selectedSlots.some(
                                        (s) =>
                                            s.court === court && s.time === slot
                                    );
                                    return (
                                        <div
                                            key={slot}
                                            onClick={() =>
                                                !isBooked &&
                                                handleSlotClick(court, slot)
                                            }
                                            className={`border p-2 ${isBooked ? "bg-gray-200 hover:cursor-not-allowed" : isSelected ? "bg-green-200" : "hover:cursor-pointer"}`}
                                        >
                                            {isBooked
                                                ? "Booked"
                                                : isSelected
                                                  ? "Selected"
                                                  : "Available"}
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourtSchedule;
