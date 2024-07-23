import NavButton from "@/components/ui/NavButton";
import ReservationDetailsItem from "./components/ReservationDetailsItem";
import {useState} from "react";
import {useGetReservationDetailsQuery} from "@/store/services/reservations/reservation.api";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {StatusNav} from "@/@types/api";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ContentSpinner from "@/components/ContentSpinner";
const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
};

const initStatusNavList: StatusNav[] = [
    {Id: 1, Status: "", Text: "Tất cả"},
    {Id: 2, Status: "upcoming", Text: "Sắp tới"},
    {Id: 3, Status: "completed", Text: "Đã hoàn thành"},
    {Id: 4, Status: "ongoing", Text: "Đang diễn ra"},
    {Id: 5, Status: "cancelled", Text: "Đã hủy"},
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

    const getErrorMessage = (
        error: FetchBaseQueryError | SerializedError
    ): string => {
        if ("status" in error) {
            const fetchError = error as FetchBaseQueryError;
            return `Lỗi: ${fetchError.status}`;
        } else {
            const serializedError = error as SerializedError;
            return serializedError.message ?? "Đã xảy ra lỗi không xác định";
        }
    };

    if (error) return <div>Lỗi: {getErrorMessage(error)}</div>;

    const handleFilterChange = (status: string, currentStatusId: number) => {
        const now = new Date().toISOString();

        let filterStr = "";

        switch (status) {
            case "ongoing":
                filterStr = `startTime le ${now} and endTime ge ${now} and reservationDetailStatus eq 'PAYSUCCEED'`;
                break;
            case "upcoming":
                filterStr = `startTime gt ${now} and reservationDetailStatus eq 'PAYSUCCEED'`;
                break;
            case "completed":
                filterStr = `endTime lt ${now} and reservationDetailStatus eq 'PAYSUCCEED'`;
                break;
            case "cancelled":
                filterStr = "reservationDetailStatus eq 'CANCELLED'";
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
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-gray-500 min-w-16">
                                Sắp xếp theo:
                            </span>
                            <Select
                                value={sort || "startTime desc"}
                                onValueChange={(value) => setSort(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sắp xếp theo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="startTime desc">
                                        Ngày giảm dần
                                    </SelectItem>
                                    <SelectItem value="startTime asc">
                                        Ngày tăng dần
                                    </SelectItem>
                                    <SelectItem value="price desc">
                                        Giá giảm dần
                                    </SelectItem>
                                    <SelectItem value="price asc">
                                        Giá tăng dần
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <ContentSpinner />
                        </div>
                    ) : reservations && reservations.length > 0 ? (
                        <>
                            <table className="w-full text-left table-auto">
                                <thead>
                                    <tr className="text-gray-600">
                                        <th className="px-4 py-2 border-b">
                                            Tên sân
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Ngày & Giờ
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Thanh toán
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Trạng thái
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Hủy
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map((r) => (
                                        <ReservationDetailsItem
                                            key={r.id}
                                            id={r.id}
                                            clubId={r.clubId}
                                            courtName={r.courtName}
                                            price={r.price}
                                            status={r.reservationDetailStatus}
                                            datetime={`${formatDateTime(r.startTime)} - ${formatDateTime(r.endTime)}`}
                                            starttime={r.startTime}
                                            isPaymentExpired={
                                                r.isPaymentExpired
                                            }
                                        />
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-between items-center mt-6">
                                <div className="flex items-center space-x-2">
                                    <span>Hiển thị</span>
                                    <Select
                                        value={pageSize.toString()}
                                        onValueChange={(value) =>
                                            setPageSize(Number(value))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Số dòng" />
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
                                        Trước
                                    </button>
                                    <span className="p-1">{page}</span>
                                    <button
                                        className={`border border-gray-300 rounded p-1 ${page === totalPages ? "hidden" : ""}`}
                                        onClick={() =>
                                            setPage((prev) => prev + 1)
                                        }
                                        disabled={page === totalPages}
                                    >
                                        Sau
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Không tìm thấy đặt chỗ!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyReservationDetailList;
