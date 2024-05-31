import React from "react";
import {useParams} from "react-router-dom";
import {useGetCourtScheduleQuery} from "@/store/services/clubs/club.api";

interface CourtScheduleProps {
    selectedDate: Date;
}

const CourtSchedule: React.FC<CourtScheduleProps> = ({selectedDate}) => {
    const {id} = useParams();
    const {data} = useGetCourtScheduleQuery(id);

    console.log(selectedDate);

    const courts = (data?.Courts || [])
        .map((court) => court.Name)
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
        const intervalDuration = minDuration * 60 * 60 * 1000; // hours to milliseconds

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
        data!.OpenTime,
        data!.CloseTime,
        data!.MinDuration
    );
    return (
        <div className="p-4 ">
            <div className="flex w-full">
                <div className="flex flex-col w-28">
                    <div className="font-semibold">Courts</div>
                    {courts.map((court) => (
                        <div key={court} className="font-semibold py-2">
                            {court}
                        </div>
                    ))}
                </div>
                <div className="overflow-x-auto w-full ml-4">
                    <div className=" min-w-full flex flex-row justify-evenly gap-4">
                        {timeSlots.map((slot) => (
                            <div key={slot} className="font-semibold">
                                {slot}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourtSchedule;
