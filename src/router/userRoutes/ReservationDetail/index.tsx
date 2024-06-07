import NavButton from "@/components/ui/NavButton";
import ReservationDetailsItem from "./components/ReservationDetailsItem";
import {useState} from "react";
import {useGetReservationDetailsQuery} from "@/store/services/reservations/reservation.api";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {StatusNav} from "@/@types/api";
const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
};

const initStatusNavList: StatusNav[] = [
    {Id: 1, Status: "", Text: "All"},
    {Id: 2, Status: "upcoming", Text: "Up Coming"},
    {Id: 3, Status: "completed", Text: "Completed"},
    {Id: 4, Status: "ongoing", Text: "On Going"},
    {Id: 5, Status: "cancelled", Text: "Cancelled"},
];

function MyReservationDetailList() {
    const [sort, setSort] = useState<string | undefined>(undefined);
    const [filter, setFilter] = useState<string | undefined>(undefined);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [currentStatus, setCurrentStatus] = useState<number>(1);

    const {data, error, isLoading} = useGetReservationDetailsQuery({
        sort,
        filter,
        page,
        pageSize,
    });

    const reservations = data?.items;
    const totalItems = data?.total || 0;
    const totalPages = Math.ceil(totalItems / pageSize);
    console.log(reservations);
    const getErrorMessage = (
        error: FetchBaseQueryError | SerializedError
    ): string => {
        if ("status" in error) {
            const fetchError = error as FetchBaseQueryError;
            return `Error: ${fetchError.status}`;
        } else {
            const serializedError = error as SerializedError;
            return serializedError.message ?? "An unknown error occurred";
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {getErrorMessage(error)}</div>;

    const handleFilterChange = (status: string, currentStatusId: number) => {
        const now = new Date().toISOString();
        let filterStr = "";

        switch (status) {
            case "ongoing":
                filterStr = `startTime le ${now} and endTime ge ${now}`;
                break;
            case "upcoming":
                filterStr = `startTime gt ${now}`;
                break;
            case "completed":
                filterStr = `endTime lt ${now}`;
                break;
            case "cancelled":
                filterStr = "reservationDetailStatus eq cancelled";
                break;
            default:
                filterStr = "";
                break;
        }
        setCurrentStatus(currentStatusId);
        setFilter(filterStr);
    };

    return (
        <div className="bg-gray-100 font-sans antialiased">
            <div className="container mx-auto p-16">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-5">
                            {initStatusNavList.map((item) => (
                                <NavButton
                                    key={item.Id}
                                    className={`py-2 px-4 bg-gray-200 text-gray-700 rounded-md ${currentStatus === item.Id ? "bg-green-600" : ""} `}
                                    onClick={() =>
                                        handleFilterChange(item.Status, item.Id)
                                    }
                                >
                                    {item.Text}
                                </NavButton>
                            ))}
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
                    {reservations && reservations.length > 0 ? (
                        <>
                            <table className="w-full text-left table-auto">
                                <thead>
                                    <tr className="text-gray-600">
                                        <th className="px-4 py-2 border-b">
                                            Court Name
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Date & Time
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Payment
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Status
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Details
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Chat
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map((r) => (
                                        <ReservationDetailsItem
                                            key={r.id}
                                            courtName={r.courtName}
                                            price={r.price}
                                            status={r.reservationDetailStatus}
                                            datetime={`${formatDateTime(r.startTime)} - ${formatDateTime(r.endTime)}`}
                                        />
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-between items-center mt-6">
                                <div className="flex items-center space-x-2">
                                    <span>Show</span>
                                    <select
                                        className="border border-gray-300 rounded p-1"
                                        value={pageSize}
                                        onChange={(e) =>
                                            setPageSize(Number(e.target.value))
                                        }
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className={`border border-gray-300 rounded p-1 ${page === 1 ? "hidden" : ""}`}
                                        onClick={() =>
                                            setPage((prev) =>
                                                Math.max(prev - 1, 1)
                                            )
                                        }
                                        disabled={page === 1}
                                    >
                                        Previous
                                    </button>
                                    <span className="p-1">{page}</span>
                                    <button
                                        className={`border border-gray-300 rounded p-1 ${page === totalPages ? "hidden" : ""}`}
                                        onClick={() =>
                                            setPage((prev) => prev + 1)
                                        }
                                        disabled={page === totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>No reservation founded!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyReservationDetailList;
