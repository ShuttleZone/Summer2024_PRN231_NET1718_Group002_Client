import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    useGetClubReservationDetailQuery,
    useGetCourtScheduleQuery,
} from "@/store/services/clubs/club.api";
import {useAppDispatch, useAppSelector} from "@/store";
import {
    removeBookingSlots,
    setBookingSlots,
} from "@/store/slices/bookingStage.slice";

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
        function timeStringToDate(time: string): Date {
            const [hours, minutes] = time.split(":").map(Number);
            const date = new Date();
            date.setHours(hours, minutes, 0, 0);
            return date;
        }

        function formatTime(date: Date): string {
            return date.toTimeString().slice(0, 5);
        }

        const openDt = timeStringToDate(openTime);
        const closedDt = timeStringToDate(closedTime);
        const intervalDuration = minDuration * 60 * 60 * 1000;

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

    const recentlyBookedSlot = useAppSelector(
        (state) => state.bookingStage.TimeAndDate.Slots
    );

    recentlyBookedSlot.map(
        (x): BookedSlot => ({
            CourtName: x.CourtName,
            Date: x.Date,
            EndTime: x.EndTime,
            StartTime: x.StartTime,
        })
    );

    useEffect(() => {
        const tempList: BookedSlot[] = [...selectedSlots];
        tempList.push(...recentlyBookedSlot);
        setSelectedSlots(tempList);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    // }, [recentlyBookedSlot, selectedSlots]); // remove dependency array to avoid infinite loop
    // not sure if this breaks the booking functionality
    // if it does, you can add the dependency array back
    // but make sure to avoid producing infinite loops

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

    const isPast = (slot: string) => {
        const [slotStartTime] = slot.split(" - ");
        const currentTime = new Date();
        const selectedSlotTime = new Date(selectedDate);
        const [hours, minutes] = slotStartTime.split(":").map(Number);
        selectedSlotTime.setHours(hours, minutes, 0, 0);
        return selectedSlotTime < currentTime;
    };

    const handleSlotClick = (
        courtId: string,
        courtName: string,
        slot: string,
        price: number
    ) => {
        if (isPast(slot)) {
            return;
        }

        const isSelected = selectedSlots.some(
            (selectedSlot) =>
                selectedSlot.Date ===
                    selectedDate.toISOString().split("T")[0] &&
                selectedSlot.StartTime === slot.split(" - ")[0] &&
                selectedSlot.EndTime === slot.split(" - ")[1] &&
                selectedSlot.CourtName === courtName
        );

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
                            gridTemplateColumns: `repeat(${timeSlots.length + 1}, minmax(80px, 1fr))`,
                        }}
                    >
                        <div className="font-semibold">Courts</div>
                        {timeSlots.map((slot) => (
                            <div
                                key={slot}
                                className="font-semibold w-28 text-start text-xs"
                            >
                                {slot}
                            </div>
                        ))}
                        {courts.map((court) => (
                            <>
                                <div
                                    key={court.name}
                                    className="font-semibold py-2 flex items-center text-s"
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
                                        const isSlotPast = isPast(slot);
                                        return (
                                            <div
                                                key={slot}
                                                className={`text-center w-18 rounded-md mx-2 my-2 py-2 border-2 border-black ${
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
                                                          : isSlotPast
                                                            ? "bg-gray-300 hover:cursor-not-allowed"
                                                            : "bg-white hover:bg-gray-200 cursor-pointer"
                                                }`}
                                                onClick={() =>
                                                    !isSlotBooked &&
                                                    !isSlotPast &&
                                                    handleSlotClick(
                                                        court.id,
                                                        court.name,
                                                        slot,
                                                        court.price
                                                    )
                                                }
                                            >
                                                {/* {selectedSlots.some(
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
                                                      : isSlotPast
                                                        ? "Past"
                                                        : "Available"} */}
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
