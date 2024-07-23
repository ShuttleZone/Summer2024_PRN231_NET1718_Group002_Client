import React, {useState} from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {useToast} from "@/components/ui/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {
    useCreateClubReviewMutation,
    useGetClubReviewsQuery,
} from "@/store/services/reviews/review.api";
import {ReviewRequest} from "@/@types/api";
import CancelReservationDetailButton from "./CancelReservationDetailButton";
import {Input} from "@/components/ui/input";
import formatVietnameseDong from "@/lib/currency.util";
import {skipToken} from "@reduxjs/toolkit/query";
import {useAppSelector} from "@/store";

interface ReservationDetailsItemProps {
    id: string;
    clubId: string;
    courtName: string;
    price: number;
    starttime: string;
    datetime: string;
    status: string;
    isPaymentExpired: boolean;
}

const ReservationDetailsItem: React.FC<ReservationDetailsItemProps> = ({
    id,
    clubId,
    courtName,
    price,
    datetime,
    status,
    isPaymentExpired,
}) => {
    const shouldBePurple = status !== "PAYSUCCEED";
    const userId = useAppSelector((state) => state.auth.userId);
    const initialState: ReviewRequest = {
        clubId: "",
        rating: 0,
        comment: "",
        title: "",
    };
    const {data: reviews, refetch} = useGetClubReviewsQuery(
        clubId || skipToken
    );
    const isReviewed = reviews?.find((r) => r.reviewerId == userId);
    function handleClick() {}
    const {toast} = useToast();
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState<ReviewRequest>(initialState);
    const [sendReview] = useCreateClubReviewMutation();
    const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await sendReview(formData);
        setOpen(false);

        if (result.data != null) {
            toast({
                description:
                    "Đánh giá của bạn đã được gửi đi. Cảm ơn bạn vì đã chia sẻ !",
            });
            setFormData(initialState);
            refetch();
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Lỗi rồi",
                description:
                    "Đã có lỗi trong việc gửi đánh giá! Xin hãy thử lại sau",
            });
            refetch();
        }
    };

    return (
        <tr>
            <td className="px-4 py-2 border-b">{courtName}</td>
            <td className="px-4 py-2 border-b">{datetime}</td>
            <td className="px-4 py-2 border-b">
                {formatVietnameseDong(price, "vnd")} VND
            </td>
            <td
                className={`px-4 py-2 border-b ${shouldBePurple ? " text-purple-500" : " text-green-500"}`}
            >
                {isPaymentExpired && status === "PENDING"
                    ? "THẤT BẠI"
                    : status === "PAYSUCCEED"
                      ? "THÀNH CÔNG"
                      : status === "CANCELLED"
                        ? "ĐÃ HỦY"
                        : "ĐANG CHỜ"}
            </td>
            {status === "PAYSUCCEED" ? (
                <td className="px-4 py-2 border-b">
                    <CancelReservationDetailButton reservationDetailId={id} />
                </td>
            ) : isPaymentExpired && status === "PENDING" ? (
                <td className="px-4 py-2 border-b text-red-500">Đã huỷ</td>
            ) : (
                <td className="px-4 py-2 border-b text-red-500">-</td>
            )}

            <td className="px-4 py-2 border-b">
                {status === "PENDING" ? (
                    <button
                        disabled
                        data-tooltip-target="tooltip-default"
                        type="button"
                        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="16"
                            height="16"
                            viewBox="0 0 50 50"
                            className="mr-2"
                            fill="white"
                        >
                            <path d="M25,2C12.317,2,2,12.318,2,25s10.317,23,23,23s23-10.318,23-23S37.683,2,25,2z M7,25c0-4.062,1.371-7.8,3.65-10.815 L35.815,39.35C32.8,41.629,29.062,43,25,43C15.075,43,7,34.925,7,25z M39.35,35.815L14.185,10.65C17.2,8.371,20.938,7,25,7 c9.925,0,18,8.075,18,18C43,29.062,41.629,32.8,39.35,35.815z"></path>
                        </svg>
                        Đánh giá không khả dụng
                    </button>
                ) : status === "PAYSUCCEED" && isReviewed == null ? (
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <button
                                            value={clubId}
                                            onClick={(event) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    clubId: event.currentTarget
                                                        .value,
                                                }))
                                            }
                                            data-tooltip-target="tooltip-default"
                                            type="button"
                                            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="size-4 mr-2"
                                                onClick={() => handleClick()}
                                            >
                                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                            </svg>
                                            Đánh giá
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>
                                            Đánh giá trải nghiệm tại câu lạc bộ
                                            này
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Bạn có hài lòng với dịch vụ ở đây không ?
                                </DialogTitle>
                                <DialogDescription>
                                    Hãy cho chúng tôi biết trải nghiệm của bạn.
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSend}>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Lựa chọn mức độ hài lòng
                                </label>
                                <select
                                    onChange={(event) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            rating: event.target.selectedIndex,
                                        }))
                                    }
                                    value={formData.rating}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="0">
                                        Rất không hài lòng
                                    </option>
                                    <option value="1">Không hài lòng</option>
                                    <option value="2">Bình thường</option>
                                    <option value="3">Hài lòng</option>
                                    <option value="4">Rất hài lòng</option>
                                </select>

                                <div className="grid w-full gap-2 mt-2">
                                    <Input
                                        required
                                        placeholder="Tiêu đề"
                                        onChange={(event) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                title: event.target.value,
                                            }))
                                        }
                                        value={formData.title}
                                    />
                                    <Textarea
                                        required
                                        placeholder="Chia sẻ trải nghiệm của bạn ở đây..."
                                        onChange={(event) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                comment: event.target.value,
                                            }))
                                        }
                                        value={formData.comment}
                                    />
                                    <Button type="submit">Gửi đánh giá</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                ) : status === "CANCELLED" ? (
                    <button
                        data-tooltip-target="tooltip-default"
                        type="button"
                        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="16"
                            height="16"
                            viewBox="0 0 50 50"
                            className="mr-2"
                            fill="white"
                        >
                            <path d="M25,2C12.317,2,2,12.318,2,25s10.317,23,23,23s23-10.318,23-23S37.683,2,25,2z M7,25c0-4.062,1.371-7.8,3.65-10.815 L35.815,39.35C32.8,41.629,29.062,43,25,43C15.075,43,7,34.925,7,25z M39.35,35.815L14.185,10.65C17.2,8.371,20.938,7,25,7 c9.925,0,18,8.075,18,18C43,29.062,41.629,32.8,39.35,35.815z"></path>
                        </svg>
                        Lịch đặt đã huỷ
                    </button>
                ) : isReviewed != null ? (
                    <button
                        data-tooltip-target="tooltip-default"
                        type="button"
                        disabled
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="16"
                            height="16"
                            fill="white"
                            viewBox="0 0 30 30"
                            className="mr-2"
                        >
                            <path d="M 15 3 C 8.373 3 3 8.373 3 15 C 3 21.627 8.373 27 15 27 C 21.627 27 27 21.627 27 15 C 27 12.820623 26.409997 10.783138 25.394531 9.0214844 L 14.146484 20.267578 C 13.959484 20.454578 13.705453 20.560547 13.439453 20.560547 C 13.174453 20.560547 12.919422 20.455578 12.732422 20.267578 L 8.2792969 15.814453 C 7.8882969 15.423453 7.8882969 14.791391 8.2792969 14.400391 C 8.6702969 14.009391 9.3023594 14.009391 9.6933594 14.400391 L 13.439453 18.146484 L 24.240234 7.3457031 C 22.039234 4.6907031 18.718 3 15 3 z M 24.240234 7.3457031 C 24.671884 7.8662808 25.053743 8.4300516 25.394531 9.0195312 L 27.707031 6.7070312 C 28.098031 6.3150312 28.098031 5.6839688 27.707031 5.2929688 C 27.316031 4.9019687 26.683969 4.9019688 26.292969 5.2929688 L 24.240234 7.3457031 z"></path>
                        </svg>
                        Đã đánh giá
                    </button>
                ) : (
                    <button
                        data-tooltip-target="tooltip-default"
                        type="button"
                        disabled
                        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="16"
                            height="16"
                            viewBox="0 0 50 50"
                            className="mr-2"
                            fill="white"
                        >
                            <path d="M25,2C12.317,2,2,12.318,2,25s10.317,23,23,23s23-10.318,23-23S37.683,2,25,2z M7,25c0-4.062,1.371-7.8,3.65-10.815 L35.815,39.35C32.8,41.629,29.062,43,25,43C15.075,43,7,34.925,7,25z M39.35,35.815L14.185,10.65C17.2,8.371,20.938,7,25,7 c9.925,0,18,8.075,18,18C43,29.062,41.629,32.8,39.35,35.815z"></path>
                        </svg>
                        Đánh giá không khả dụng
                    </button>
                )}
            </td>
        </tr>
    );
};

export default ReservationDetailsItem;
