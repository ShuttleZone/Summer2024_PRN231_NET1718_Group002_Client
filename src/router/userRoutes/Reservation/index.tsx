import NavButton from "@/components/ui/NavButton";
import {useState} from "react";
import {useGetReservationsQuery} from "@/store/services/reservations/reservation.api";
import {StatusNav} from "@/@types/api";
import ReservationItem from "./components/ReservationItem";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const initStatusNavList: StatusNav[] = [
    {Id: 1, Status: "", Text: "All"},
    {Id: 2, Status: "PENDING", Text: "PENDING"},
    {Id: 3, Status: "PAYSUCCEED", Text: "PAY SUCCEED"},
    {Id: 4, Status: "PAYFAIL", Text: "PAY FAIL"},
    {Id: 5, Status: "CANCELLED", Text: "CANCELLED"},
];

function MyReservationInvoiceList() {
    const [sort, setSort] = useState<string | undefined>(undefined);
    const [filter, setFilter] = useState<string | undefined>(undefined);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [currentStatus, setCurrentStatus] = useState<number>(1);

    const {data, error, isLoading} = useGetReservationsQuery({
        sort,
        filter,
        page,
        pageSize,
    });

    const reservations = data?.items;
    const totalItems = data?.total || 0;
    const totalPages = Math.ceil(totalItems / pageSize);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;

    const handleFilterChange = (status: string, currentStatusId: number) => {
        const filterStr = `reservationDetailStatus eq ${status}`;

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
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-gray-500 min-w-16">
                                Sort By:
                            </span>
                            <Select
                                value={sort || "bookingDate desc"}
                                onValueChange={(value) => setSort(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your club" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bookingDate desc">
                                        Booking Date Desc
                                    </SelectItem>
                                    <SelectItem value="bookingDate asc">
                                        Booking Date Asc
                                    </SelectItem>
                                    <SelectItem value="totalPrice desc">
                                        Total Price Desc
                                    </SelectItem>
                                    <SelectItem value="totalPrice asc">
                                        Total Price Asc
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {reservations && reservations.length > 0 ? (
                        <>
                            <table className="w-full text-left table-auto">
                                <thead>
                                    <tr className="text-gray-600">
                                        <th className="px-4 py-2 border-b">
                                            Courts in reservation
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Booking Date
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Total Price
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Status
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Pay
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Cancel
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map((r) => (
                                        <ReservationItem
                                            key={r.id}
                                            id={r.id}
                                            expiredTime={r.expiredTime}
                                            courtNames={r.courtNames}
                                            totalPrice={r.totalPrice}
                                            status={r.reservationStatusEnum}
                                            bookingDate={r.bookingDate}
                                        />
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-between items-center mt-6">
                                <div className="flex items-center space-x-2">
                                    <span>Show</span>
                                    <Select
                                        value={pageSize.toString()}
                                        onValueChange={(value) =>
                                            setPageSize(Number(value))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your club" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="5">5</SelectItem>
                                            <SelectItem value="10">
                                                10
                                            </SelectItem>
                                            <SelectItem value="20">
                                                20
                                            </SelectItem>
                                            <SelectItem value="50">
                                                50
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
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
                        <p>No invoice founded!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyReservationInvoiceList;
