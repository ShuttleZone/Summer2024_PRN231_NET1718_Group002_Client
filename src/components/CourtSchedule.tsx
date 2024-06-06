import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {
    useGetClubReservationDetailQuery,
    useGetCourtScheduleQuery,
} from "@/store/services/clubs/club.api";
import {useAppDispatch} from "@/store";
import {removeBookingSlots, setBookingSlots} from "@/store/bookingStage.slice";

interface CourtScheduleProps {
    selectedDate: Date;
}

interface BookedSlot {
    CourtName: string;
    Date: string;
    EndTime: string;
    StartTime: string;
}

const CourtSchedule: React.FC<CourtScheduleProps> = ({selectedDate}) => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const {data, isLoading} = useGetCourtScheduleQuery(id);
    const {data: bookedData} = useGetClubReservationDetailQuery(id);

    const [selectedSlots, setSelectedSlots] = useState<BookedSlot[]>([]);

    const courts = data?.courts || [];

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
    const bookedSlots: BookedSlot[] = bookedData ?? [];
    const isBooked = (courtName: string, slot: string) => {
        const [slotStartTime, slotEndTime] = slot.split(" - ");
        return bookedSlots.some(
            (booking) =>
                booking.CourtName === courtName &&
                booking.StartTime.split("T")[1].slice(0, 5) === slotStartTime &&
                booking.EndTime.split("T")[1].slice(0, 5) === slotEndTime &&
                booking.Date.split("T")[0] ===
                    selectedDate.toISOString().split("T")[0]
        );
    };

    const handleSlotClick = (
        courtId: string,
        courtName: string,
        slot: string,
        price: number
    ) => {
        // Check if the slot is already selected
        const isSelected = selectedSlots.some(
            (selectedSlot) =>
                selectedSlot.Date ===
                    selectedDate.toISOString().split("T")[0] &&
                selectedSlot.StartTime === slot.split(" - ")[0] &&
                selectedSlot.EndTime === slot.split(" - ")[1] &&
                selectedSlot.CourtName === courtName
        );

        // If already selected, remove it from selectedSlots
        if (isSelected) {
            setSelectedSlots((prevSelectedSlots) =>
                prevSelectedSlots.filter(
                    (selectedSlot) =>
                        selectedSlot.Date !==
                            selectedDate.toISOString().split("T")[0] ||
                        selectedSlot.StartTime !== slot.split(" - ")[0] ||
                        selectedSlot.EndTime !== slot.split(" - ")[1] ||
                        selectedSlot.CourtName !== courtName
                )
            );
            dispatch(
                removeBookingSlots({
                    Date: selectedDate.toISOString().split("T")[0],
                    StartTime: slot.split(" - ")[0],
                    EndTime: slot.split(" - ")[1],
                    CourtName: courtName,
                })
            );
        } else {
            // If not selected, add it to selectedSlots
            setSelectedSlots((prevSelectedSlots) => [
                ...prevSelectedSlots,
                {
                    CourtName: courtName,
                    Date: selectedDate.toISOString().split("T")[0],
                    StartTime: slot.split(" - ")[0],
                    EndTime: slot.split(" - ")[1],
                },
            ]);
            dispatch(
                setBookingSlots({
                    Date: selectedDate.toISOString().split("T")[0],
                    StartTime: slot.split(" - ")[0],
                    EndTime: slot.split(" - ")[1],
                    CourtName: courtName,
                    CourtId: courtId,
                    Price: price,
                })
            );
        }
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
                                    key={court.name}
                                    className="font-semibold py-2 flex items-center"
                                >
                                    {court.name}
                                </div>
                                {data &&
                                    divideSlot(
                                        data.openTime,
                                        data.closeTime,
                                        data.minDuration
                                    ).map((slot) => {
                                        const isSlotBooked = isBooked(
                                            court.name,
                                            slot
                                        );
                                        return (
                                            <div
                                                key={slot}
                                                className={`text-center rounded-lg mx-2 my-2 py-2 border-2 border-black ${
                                                    selectedSlots.some(
                                                        (selectedSlot) =>
                                                            selectedSlot.Date ===
                                                                selectedDate
                                                                    .toISOString()
                                                                    .split(
                                                                        "T"
                                                                    )[0] &&
                                                            selectedSlot.StartTime ===
                                                                slot.split(
                                                                    " - "
                                                                )[0] &&
                                                            selectedSlot.EndTime ===
                                                                slot.split(
                                                                    " - "
                                                                )[1] &&
                                                            selectedSlot.CourtName ===
                                                                court.name
                                                    )
                                                        ? "bg-green-500"
                                                        : isSlotBooked
                                                          ? "bg-gray-500 hover:cursor-not-allowed"
                                                          : "bg-white hover:bg-gray-200 cursor-pointer"
                                                }`}
                                                onClick={() =>
                                                    // Call handleSlotClick on slot click
                                                    !isSlotBooked &&
                                                    handleSlotClick(
                                                        court.id,
                                                        court.name,
                                                        slot,
                                                        court.price
                                                    )
                                                }
                                            >
                                                {selectedSlots.some(
                                                    (selectedSlot) =>
                                                        selectedSlot.Date ===
                                                            selectedDate
                                                                .toISOString()
                                                                .split(
                                                                    "T"
                                                                )[0] &&
                                                        selectedSlot.StartTime ===
                                                            slot.split(
                                                                " - "
                                                            )[0] &&
                                                        selectedSlot.EndTime ===
                                                            slot.split(
                                                                " - "
                                                            )[1] &&
                                                        selectedSlot.CourtName ===
                                                            court.name
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
