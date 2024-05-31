import NavButton from "@/components/ui/NavButton";
import ReservationDetailsItem from "./components/ReservationDetailsItem";
import {useState} from "react";
import {useGetReservationDetailsQuery} from "@/store/services/reservations/apiMyReservation";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

function MyReservationList() {
    const [sort, setSort] = useState<string | undefined>(undefined);
    const [filter, setFilter] = useState<string | undefined>(undefined);

    const {
        data: reservations,
        error,
        isLoading,
    } = useGetReservationDetailsQuery({sort, filter});
    const getErrorMessage = (
        error: FetchBaseQueryError | SerializedError
    ): string => {
        if ("status" in error) {
            // FetchBaseQueryError
            const fetchError = error as FetchBaseQueryError;
            return `Error: ${fetchError.status}`;
        } else {
            // SerializedError
            const serializedError = error as SerializedError;
            return serializedError.message ?? "An unknown error occurred";
        }
    };
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {getErrorMessage(error)}</div>;

    return (
        <div className="bg-gray-100 font-sans antialiased">
            <div className="container mx-auto p-16">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-5">
                            <NavButton
                                className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md active:bg-green-600"
                                onClick={() => setFilter("")}
                            >
                                All
                            </NavButton>
                            <NavButton
                                className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md active:bg-green-600"
                                onClick={() => setFilter("")}
                            >
                                Upcoming
                            </NavButton>
                            <NavButton
                                className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md active:bg-green-600"
                                onClick={() => setFilter("")}
                            >
                                Completed
                            </NavButton>
                            <NavButton
                                className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md active:bg-green-600"
                                onClick={() => setFilter("")}
                            >
                                On Going
                            </NavButton>
                            <NavButton
                                className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md active:bg-green-600"
                                onClick={() => setFilter("")}
                            >
                                Cancelled
                            </NavButton>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-500">Sort By:</span>
                            <select
                                className="border border-gray-300 rounded p-1"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                            >
                                <option value={"startTime desc"}>
                                    Date Desc
                                </option>
                                <option value={"startTime asc"}>
                                    Date Asc
                                </option>
                                <option value={"price desc"}>Price Desc</option>
                                <option value={"price asc"}>Price Asc</option>
                            </select>
                        </div>
                    </div>

                    <table className="w-full text-left table-auto">
                        <thead>
                            <tr className="text-gray-600">
                                <th className="px-4 py-2 border-b">
                                    Court Name
                                </th>
                                <th className="px-4 py-2 border-b">
                                    Date & Time
                                </th>
                                <th className="px-4 py-2 border-b">Payment</th>
                                <th className="px-4 py-2 border-b">Status</th>
                                <th className="px-4 py-2 border-b">Details</th>
                                <th className="px-4 py-2 border-b">Chat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations &&
                                reservations?.map((r) => (
                                    <ReservationDetailsItem
                                        courtName={r.courtName}
                                        price={r.price}
                                        status={r.reservationDetailStatus}
                                        datetime={`${r.startTime} - ${r.endTime}`}
                                    ></ReservationDetailsItem>
                                ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center mt-6">
                        <div className="flex items-center space-x-2">
                            <span>Show</span>
                            <select className="border border-gray-300 rounded p-1">
                                <option>10</option>
                            </select>
                        </div>
                        <div className="flex space-x-2">
                            <button className="border border-gray-300 rounded p-1">
                                1
                            </button>
                            <button className="border border-gray-300 rounded p-1">
                                2
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyReservationList;
