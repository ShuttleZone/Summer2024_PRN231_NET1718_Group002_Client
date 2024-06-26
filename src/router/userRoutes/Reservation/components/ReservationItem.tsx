import {Button} from "@/components/ui/button";
import {useCreatePaymentUrlMutation} from "@/store/services/reservations/payment.api";
import React, {useState} from "react";
import CountdownTimer from "./CountDownTimer";
import CancelReservationButton from "./CancelReservationButton";
const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
};
interface ReservationItemProps {
    bookingDate: string;
    totalPrice: number;
    status: string;
    id: string;
    courtNames: string[];
    expiredTime: string;
}

export interface VnPayRequest {
    orderInfo: string;
    fullName: string;
    orderType: string;
    description: string;
    amount: number;
}
const calculateInitialTime = (dateTime: string) => {
    const now = new Date();
    const date = new Date(dateTime);
    const timeDiffInSeconds = Math.floor(
        (date.getTime() - now.getTime()) / 1000
    );
    return Math.max(timeDiffInSeconds, 0);
};
const ReservationItem: React.FC<ReservationItemProps> = ({
    bookingDate,
    totalPrice,
    status,
    courtNames,
    id,
    expiredTime,
}) => {
    const [createPaymentUrl, {isLoading}] = useCreatePaymentUrlMutation();
    const [isExpired, setIsExpired] = useState(
        calculateInitialTime(expiredTime) <= 0
    );
    const shouldBePurple = status !== "PAYSUCCEED";
    const handleGetPaymentUrl = async () => {
        const requestData: VnPayRequest = {
            orderInfo: id,
            fullName: "",
            orderType: "booking",
            description: `pay for reservation ${id}`,
            amount: totalPrice,
        };
        try {
            const url = await createPaymentUrl(requestData).unwrap();
            console.log("Payment URL:", url);
            window.open(url, "_blank");
        } catch (error) {
            console.error("Failed to create payment:", error);
        }
    };

    return (
        <tr>
            <td className="px-4 py-2 border-b">
                <p className="text-orange-700">{courtNames.length} court(s)</p>
                {/* {courtNames.map((c) => (
                    <>
                        <span>|{c}|</span>
                        <br></br>
                    </>
                ))} */}
            </td>
            <td className="px-4 py-2 border-b">
                {formatDateTime(bookingDate)}
            </td>
            <td className="px-4 py-2 border-b">{totalPrice} VND</td>
            <td
                className={`px-4 py-2 border-b ${shouldBePurple ? " text-purple-500" : " text-green-500"}`}
            >
                {Date.parse(expiredTime) < Date.now() && status === "PENDING"
                    ? "PAY FAIL"
                    : status}
            </td>
            <td className="px-4 py-2 border-b">
                <Button
                    onClick={handleGetPaymentUrl}
                    variant="secondary"
                    size="icon"
                    disabled={isExpired || status !== "PENDING" || isLoading}
                >
                    Pay
                </Button>
                {!isExpired && status === "PENDING" ? (
                    <CountdownTimer
                        initialTime={calculateInitialTime(expiredTime)}
                        onTimeExpired={() => setIsExpired(true)}
                    ></CountdownTimer>
                ) : (
                    ""
                )}
            </td>
            <td className="px-4 py-2 border-b">
                <CancelReservationButton reservationId={id} />
            </td>
        </tr>
    );
};

export default ReservationItem;
