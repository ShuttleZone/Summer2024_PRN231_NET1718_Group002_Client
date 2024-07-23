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
import {useCreateClubReviewMutation} from "@/store/services/reviews/review.api";
import {ReviewRequest} from "@/@types/api";
import CancelReservationDetailButton from "./CancelReservationDetailButton";
import {Input} from "@/components/ui/input";
import formatVietnameseDong from "@/lib/currency.util";

interface ReservationDetailsItemProps {
    id: string;
    clubId: string;
    courtName: string;
    price: number;
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

    const initialState: ReviewRequest = {
        clubId: "",
        rating: 0,
        comment: "",
        title: "",
    };

    function handleClick() {
        console.log("clicked");
    }
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
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Lỗi rồi",
                description:
                    "Đã có lỗi trong việc gửi đánh giá! Xin hãy thử lại sau",
            });
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
                        data-tooltip-target="tooltip-default"
                        type="button"
                        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-4 mr-2"
                        >
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                        Đánh giá không khả dụng
                    </button>
                ) : status === "PAYSUCCEED" &&
                  datetime < Date.now.toString() ? (
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
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-4 mr-2"
                        >
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                        Lịch đặt đã huỷ
                    </button>
                ) : (
                    <button
                        data-tooltip-target="tooltip-default"
                        type="button"
                        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-4 mr-2"
                        >
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                        Đánh giá không khả dụng
                    </button>
                )}
            </td>
        </tr>
    );
};

export default ReservationDetailsItem;
