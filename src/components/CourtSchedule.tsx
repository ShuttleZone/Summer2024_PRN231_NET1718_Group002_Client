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
import CloseImage from "/public/sorry-we-closed.png";
import {PiCourtBasketball} from "react-icons/pi";

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
    const openDateInWeeks = data?.openDateInWeeks;
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

    const selectedDay = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
    });
    const isOpenToday = openDateInWeeks?.some(
        (day) => day.date === selectedDay
    );

    const currentTime = new Date();
    const filteredTimeSlots = timeSlots.filter((slot) => {
        const [slotStartTime] = slot.split(" - ");
        const [hours, minutes] = slotStartTime.split(":").map(Number);
        const slotDate = new Date(selectedDate);
        slotDate.setHours(hours, minutes, 0, 0);
        return slotDate >= currentTime;
    });

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="p-4 overflow-x-auto min-h-52">
                    {!isOpenToday ? (
                        <div>
                            <img
                                className="w-full max-h-52 object-fill scale-50"
                                src={CloseImage}
                                alt=""
                            />
                        </div>
                    ) : (
                        <div
                            className="grid"
                            style={{
                                gridTemplateColumns: `repeat(${filteredTimeSlots.length + 1}, minmax(80px, 1fr))`,
                            }}
                        >
                            <div className="font-semibold">Sân</div>
                            {filteredTimeSlots.map((slot) => (
                                <div
                                    key={slot}
                                    className="font-semibold w-28 text-start text-xs"
                                >
                                    {slot}
                                </div>
                            ))}
                            {courts.map((court) => (
                                <React.Fragment key={court.name}>
                                    <div className="font-semibold py-2 flex items-center text-s">
                                        {court.name}
                                    </div>
                                    {filteredTimeSlots.map((slot) => {
                                        const isSlotBooked = isBooked(
                                            court.name,
                                            slot
                                        );
                                        const isSlotPast = isPast(slot);
                                        return (
                                            <div key={slot}>
                                                <PiCourtBasketball
                                                    className={`text-center w-18 text-5xl ${
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
                                                            ? "text-green-500"
                                                            : isSlotBooked
                                                              ? "text-red-500 hover:cursor-not-allowed"
                                                              : isSlotPast
                                                                ? "text-gray-700 hover:cursor-not-allowed"
                                                                : "text-black hover:text-gray-800 cursor-pointer"
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
                                                />
                                            </div>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default CourtSchedule;
