import {PaymentRequest} from "@/@types/api";
import ContentSpinner from "@/components/ContentSpinner";
import {
    useCreatePaymentUrlMutation,
    useGetMyWalletQuery,
    useUpdateWalletMutation,
} from "@/store/services/reservations/payment.api";
import React, {useState} from "react";
import {FaWallet, FaUniversity} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useToast} from "@/components/ui/use-toast";
import formatVietnameseDong from "@/lib/currency.util";
const PaymentOption: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>("");
    const paymentRequest = window.history.state?.usr as PaymentRequest;
    const paymentTotal = paymentRequest.amount;
    const {data: walletData, isLoading: isWalletLoading} =
        useGetMyWalletQuery();
    const [createPaymentUrl] = useCreatePaymentUrlMutation();
    const [updateWallet, {isLoading: isUpdateWalletLoading}] =
        useUpdateWalletMutation();
    const navigate = useNavigate();
    const {toast} = useToast();
    const [canPay, setCanPay] = useState(true);
    const isLoading = isWalletLoading || isUpdateWalletLoading;
    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    const handlePayment = async () => {
        if (!selectedOption) return;

        try {
            if (selectedOption === "Ví ShuttleZone") {
                const walletId = walletData?.id;
                if (walletId) {
                    await updateWallet({
                        id: walletId,
                        request: {...paymentRequest, amount: -paymentTotal},
                    }).unwrap();
                }
                //should navigate to pay-success page
                //navigate("/my-invoice", {state: {refetch: true}});
                navigate(
                    "/payment-result?isSuccess=true&amount=" + paymentTotal
                );
            } else {
                const url = await createPaymentUrl(paymentRequest).unwrap();
                setCanPay(false);
                window.open(url, "_self");
            }
        } catch (error) {
            toast({
                title: "Error",
                description:
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (error as any)?.data?.value ||
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (error as any)?.data ||
                    "Unknown error occurred",
                variant: "destructive",
            });
        }
    };

    if (isLoading) {
        return <ContentSpinner />;
    }
    return (
        <div className="min-h-screen flex items-center justify-center  bg-blue-100 ">
            <div className="min-h-screen flex items-center justify-center ">
                <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200">
                    <h2 className="text-3xl font-bold text-center mb-6 text-green-500">
                        Chọn phương thức thanh toán
                    </h2>
                    <p className="text-center text-gray-600 mb-6">
                        Tổng tiền thanh toán:{" "}
                        {formatVietnameseDong(paymentTotal, "vnd")} vnd
                    </p>
                    <div className="flex flex-col space-y-6">
                        <label
                            className={`flex items-center p-4 rounded-lg ${(walletData?.balance ?? 0) < paymentTotal ? "" : "cursor-pointer transition-all duration-300 transform hover:scale-105"} ${selectedOption === "wallet" ? "bg-blue-100 border border-blue-500" : "bg-gray-100"}`}
                        >
                            <input
                                type="radio"
                                name="paymentOption"
                                value="Ví ShuttleZone"
                                checked={selectedOption === "Ví ShuttleZone"}
                                onChange={() =>
                                    handleOptionChange("Ví ShuttleZone")
                                }
                                className="hidden"
                                disabled={
                                    (walletData?.balance ?? 0) < paymentTotal
                                }
                            />
                            <FaWallet className="text-3xl text-blue-500 mr-3" />
                            <div>
                                <span className="text-lg font-medium">
                                    Ví ShuttleZone
                                </span>
                                <span className="block text-sm text-gray-500">
                                    Số dư:{" "}
                                    {formatVietnameseDong(
                                        walletData?.balance || 0,
                                        "vnd"
                                    )}{" "}
                                    vnd
                                </span>
                                {(walletData?.balance ?? 0) < paymentTotal ? (
                                    <span className="block text-xs text-red-500">
                                        Số dư ví của bạn không đủ
                                    </span>
                                ) : (
                                    ""
                                )}
                            </div>
                        </label>
                        <label
                            className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${selectedOption === "bank" ? "bg-blue-100 border border-blue-500" : "bg-gray-100"}`}
                        >
                            <input
                                type="radio"
                                name="paymentOption"
                                value="Ngân hàng"
                                checked={selectedOption === "Ngân hàng"}
                                onChange={() => handleOptionChange("Ngân hàng")}
                                className="hidden"
                                disabled={paymentTotal < 5000}
                            />
                            <FaUniversity className="text-3xl text-green-500 mr-3" />
                            <div>
                                <span className="text-lg font-medium">
                                    Ngân hàng
                                </span>
                                {paymentTotal < 5000 ? (
                                    <span className="block text-xs text-red-500">
                                        Số tiền thanh toán nhỏ hơn 5000 vnd.
                                        Không thể thanh toán bằng ngân hàng
                                    </span>
                                ) : (
                                    ""
                                )}
                            </div>
                        </label>
                    </div>
                    {selectedOption && (
                        <div className="mt-6 text-center">
                            <p className="text-xl font-medium text-gray-500">
                                Bạn chọn:{" "}
                                <strong className="text-blue-500">
                                    {selectedOption.charAt(0).toUpperCase() +
                                        selectedOption.slice(1)}
                                </strong>
                            </p>
                        </div>
                    )}
                    <button
                        className={`mt-8 w-full  text-white py-3 rounded-lg text-lg font-semibold shadow-md ${!selectedOption || !canPay ? "bg-gray-400" : " bg-green-500 hover:bg-green-700 transition-all duration-300"}`}
                        onClick={handlePayment}
                        disabled={!selectedOption || !canPay}
                    >
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentOption;
