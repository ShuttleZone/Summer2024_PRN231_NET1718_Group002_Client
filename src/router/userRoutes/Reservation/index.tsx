import NavButton from "@/components/ui/NavButton";
import {useEffect, useState} from "react";
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
import ContentSpinner from "@/components/ContentSpinner";
import {useLocation} from "react-router-dom";

const initStatusNavList: StatusNav[] = [
    {Id: 1, Status: "", Text: "Tất cả"},
    {Id: 2, Status: "PENDING", Text: "ĐANG CHỜ"},
    {Id: 3, Status: "PAYSUCCEED", Text: "THÀNH CÔNG"},
    {Id: 4, Status: "PAYFAIL", Text: "THẤT BẠI"},
    {Id: 5, Status: "CANCELLED", Text: "ĐÃ HỦY"},
];

function MyReservationInvoiceList() {
    const [sort, setSort] = useState<string | undefined>("bookingDate desc");
    const [filter, setFilter] = useState<string | undefined>(undefined);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [currentStatus, setCurrentStatus] = useState<number>(1);
    const location = useLocation();

    const {data, error, isLoading, refetch} = useGetReservationsQuery({
        sort,
        filter,
        page,
        pageSize,
    });
    useEffect(() => {
        if (location.state?.refetch) {
            refetch();
        }
    }, [location.state, refetch]);

    const reservations = data?.items;
    const totalItems = data?.total || 0;
    const totalPages = Math.ceil(totalItems / pageSize);

    if (error) return <div>Lỗi...</div>;

    const handleFilterChange = (status: string, currentStatusId: number) => {
        if (status === "") {
            setFilter("");
            setCurrentStatus(currentStatusId);
            return;
        }
        const filterStr = `reservationStatusEnum eq '${status}'`;
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
                                Sắp xếp theo:
                            </span>
                            <Select
                                value={sort || "bookingDate desc"}
                                onValueChange={(value) => setSort(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn tùy chọn" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bookingDate desc">
                                        Ngày đặt giảm dần
                                    </SelectItem>
                                    <SelectItem value="bookingDate asc">
                                        Ngày đặt tăng dần
                                    </SelectItem>
                                    <SelectItem value="totalPrice desc">
                                        Tổng giá giảm dần
                                    </SelectItem>
                                    <SelectItem value="totalPrice asc">
                                        Tổng giá tăng dần
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
                                            Đặt chỗ
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Ngày đặt
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Tổng giá
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Trạng thái
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Thanh toán
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                            Hủy
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
                                            refetch={refetch}
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
                                            <SelectValue placeholder="Chọn tùy chọn" />
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
                                        Tiếp theo
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Không tìm thấy hóa đơn nào!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyReservationInvoiceList;
