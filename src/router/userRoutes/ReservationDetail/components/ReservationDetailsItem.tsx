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
    };
    const {toast} = useToast();
    const [_, setOpen] = React.useState(false); // eslint-disable-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<ReviewRequest>(initialState);
    const [sendReview] = useCreateClubReviewMutation();
    const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await sendReview(formData);
        setOpen(true);

        if (result.data != null) {
            toast({
                description: "Your review has been sent. Thanks for telling us",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        }
    };

    return (
        <tr>
            <td className="px-4 py-2 border-b">{courtName}</td>
            <td className="px-4 py-2 border-b">{datetime}</td>
            <td className="px-4 py-2 border-b">{price} VND</td>
            <td
                className={`px-4 py-2 border-b ${shouldBePurple ? " text-purple-500" : " text-green-500"}`}
            >
                {isPaymentExpired && status === "PENDING" ? "PAY FAIL" : status}
            </td>
            <td className="px-4 py-2 border-b">
                <CancelReservationDetailButton reservationDetailId={id} />
            </td>
            <td className="px-4 py-2 border-b">
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4 mr-2"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Chat
                </button>

                <Dialog>
                    <DialogTrigger onClick={() => setOpen(true)}>
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
                                        >
                                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                        </svg>
                                        Write a review
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Write a review for this club</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Do you satisfy with the service here ?
                            </DialogTitle>
                            <DialogDescription>
                                Let us know your feeling !
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSend}>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Select an option
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
                                <option selected>
                                    Select your satisfaction
                                </option>
                                <option value="0">Not satisfied</option>
                                <option value="1">Dissatisfied</option>
                                <option value="2">Neutral</option>
                                <option value="3">Satisfied</option>
                                <option value="4">Very Satisfied</option>
                            </select>

                            <div className="grid w-full gap-2">
                                <Textarea
                                    placeholder="Write your thought here..."
                                    onChange={(event) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            comment: event.target.value,
                                        }))
                                    }
                                    value={formData.comment}
                                />
                                <Button type="submit">Send review</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </td>
        </tr>
    );
};

export default ReservationDetailsItem;
