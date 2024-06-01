import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useGetCourtScheduleQuery} from "@/store/services/clubs/club.api";

interface CourtScheduleProps {
    selectedDate: Date;
}

interface Slot {
    date: string;
    startTime: string;
    endTime: string;
    courtName: string;
}

const CourtSchedule: React.FC<CourtScheduleProps> = ({selectedDate}) => {
    const {id} = useParams();
    console.log("id", id);
    const {data, isLoading} = useGetCourtScheduleQuery(id);
    const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
    console.log(data);

    const courts = (data?.courts || [])
        .map((court) => court.name)
        .sort((a, b) => a.localeCompare(b));

    function divideSlot(
        openTime: string,
        closedTime: string,
        minDuration: number
    ): string[] {
        // Helper function to convert time string to Date object
        function timeStringToDate(time: string): Date {
            const [hours, minutes] = time.split(":").map(Number);
            const date = new Date();
            date.setHours(hours, minutes, 0, 0);
            return date;
        }

        // Helper function to format Date object to time string
        function formatTime(date: Date): string {
            return date.toTimeString().slice(0, 5); // Get only HH:MM
        }

        // Convert openTime and closedTime to Date objects
        const openDt = timeStringToDate(openTime);
        const closedDt = timeStringToDate(closedTime);

        // Calculate the interval duration in milliseconds
        const intervalDuration = minDuration * 60 * 60 * 1000;

        // Generate the slots
        const slots: string[] = [];
        let currentTime = openDt;
        while (currentTime < closedDt) {
            const nextTime = new Date(currentTime.getTime() + intervalDuration);
            if (nextTime > closedDt) {
                break;
            }
            slots.push(`${formatTime(currentTime)} - ${formatTime(nextTime)}`);
            currentTime = nextTime;
        }

        // If there's remaining time that doesn't fit into a full slot, handle it
        if (currentTime < closedDt) {
            slots.push(`${formatTime(currentTime)} - ${formatTime(closedDt)}`);
        }

        return slots;
    }

    const timeSlots = divideSlot(
        data?.openTime || "6:00:00",
        data?.closeTime || "22:00:00",
        data?.minDuration || 1
    );

    const bookedSlots: Slot[] = [
        {
            date: "2024-05-31",
            startTime: "09:00",
            endTime: "10:30",
            courtName: "Court 1",
        },
    ];

    const isBooked = (courtName: string, slot: string) => {
        const [slotStartTime, slotEndTime] = slot.split(" - ");
        return bookedSlots.some(
            (booking) =>
                booking.courtName === courtName &&
                booking.startTime === slotStartTime &&
                booking.endTime === slotEndTime &&
                booking.date === selectedDate.toISOString().split("T")[0]
        );
    };

    const handleSlotClick = (courtName: string, slot: string) => {
        const isSelected = selectedSlots.some(
            (selectedSlot) =>
                selectedSlot.date ===
                    selectedDate.toISOString().split("T")[0] &&
                selectedSlot.startTime === slot.split(" - ")[0] &&
                selectedSlot.endTime === slot.split(" - ")[1] &&
                selectedSlot.courtName === courtName
        );

        setSelectedSlots((prevSelectedSlots) => {
            if (isSelected) {
                // If slot is already selected, remove it from the array
                return prevSelectedSlots.filter(
                    (selectedSlot) =>
                        selectedSlot.date !==
                            selectedDate.toISOString().split("T")[0] ||
                        selectedSlot.startTime !== slot.split(" - ")[0] ||
                        selectedSlot.endTime !== slot.split(" - ")[1] ||
                        selectedSlot.courtName !== courtName
                );
            } else {
                // If slot is not selected, add it to the array
                return [
                    ...prevSelectedSlots,
                    {
                        date: selectedDate.toISOString().split("T")[0],
                        startTime: slot.split(" - ")[0],
                        endTime: slot.split(" - ")[1],
                        courtName,
                    },
                ];
            }
        });
    };

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="p-4 overflow-x-auto">
                    <div
                        className="grid"
                        style={{
                            gridTemplateColumns: `repeat(${timeSlots.length + 1}, minmax(100px, 1fr))`,
                        }}
                    >
                        <div className="font-semibold">Courts</div>
                        {timeSlots.map((slot) => (
                            <div
                                key={slot}
                                className="font-semibold w-28 text-center"
                            >
                                {slot}
                            </div>
                        ))}
                        {courts.map((court) => (
                            <>
                                <div
                                    key={court}
                                    className="font-semibold py-2 flex items-center"
                                >
                                    {court}
                                </div>
                                {data &&
                                    divideSlot(
                                        data.openTime,
                                        data.closeTime,
                                        data.minDuration
                                    ).map((slot) => {
                                        const isSlotBooked = isBooked(
                                            court,
                                            slot
                                        );
                                        return (
                                            <div
                                                key={slot}
                                                className={`text-center rounded-lg mx-2 my-2 py-2 border-2 border-black ${
                                                    selectedSlots.some(
                                                        (selectedSlot) =>
                                                            selectedSlot.date ===
                                                                selectedDate
                                                                    .toISOString()
                                                                    .split(
                                                                        "T"
                                                                    )[0] &&
                                                            selectedSlot.startTime ===
                                                                slot.split(
                                                                    " - "
                                                                )[0] &&
                                                            selectedSlot.endTime ===
                                                                slot.split(
                                                                    " - "
                                                                )[1] &&
                                                            selectedSlot.courtName ===
                                                                court
                                                    )
                                                        ? "bg-green-500"
                                                        : isSlotBooked
                                                          ? "bg-gray-500 hover:cursor-not-allowed"
                                                          : "bg-white hover:bg-gray-200 cursor-pointer"
                                                }`}
                                                onClick={
                                                    !isSlotBooked
                                                        ? () =>
                                                              handleSlotClick(
                                                                  court,
                                                                  slot
                                                              )
                                                        : undefined
                                                }
                                            >
                                                {selectedSlots.some(
                                                    (selectedSlot) =>
                                                        selectedSlot.date ===
                                                            selectedDate
                                                                .toISOString()
                                                                .split(
                                                                    "T"
                                                                )[0] &&
                                                        selectedSlot.startTime ===
                                                            slot.split(
                                                                " - "
                                                            )[0] &&
                                                        selectedSlot.endTime ===
                                                            slot.split(
                                                                " - "
                                                            )[1] &&
                                                        selectedSlot.courtName ===
                                                            court
                                                )
                                                    ? "Selected"
                                                    : isSlotBooked
                                                      ? "Booked"
                                                      : "Available"}
                                            </div>
                                        );
                                    })}
                            </>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
export default CourtSchedule;
