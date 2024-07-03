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

const PaymentOption: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>("");
    const paymentRequest = window.history.state?.usr as PaymentRequest;
    const paymentTotal = paymentRequest.amount;
    const {data: walletData, isLoading} = useGetMyWalletQuery();
    const [createPaymentUrl] = useCreatePaymentUrlMutation();
    const [updateWallet] = useUpdateWalletMutation();
    const navigate = useNavigate();
    const [canPay, setCanPay] = useState(true);

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    const handlePayment = async () => {
        if (!selectedOption) return;

        try {
            if (selectedOption === "wallet") {
                const walletId = walletData?.id;
                if (walletId) {
                    console.log(paymentRequest);
                    await updateWallet({
                        id: walletId,
                        request: {...paymentRequest, amount: -paymentTotal},
                    }).unwrap();
                }
                navigate("/my-invoices", {state: {refetch: true}});
            } else {
                const url = await createPaymentUrl(paymentRequest).unwrap();
                console.log("Payment URL:", url);
                setCanPay(false);
                window.open(url, "_blank");
            }
        } catch (error) {
            console.error("Failed to create payment:", error);
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
                        Choose Payment Option
                    </h2>
                    <p className="text-center text-gray-600 mb-6">
                        Payment Total: {paymentTotal} VND
                    </p>
                    <div className="flex flex-col space-y-6">
                        <label
                            className={`flex items-center p-4 rounded-lg ${(walletData?.balance ?? 0) < paymentTotal ? "" : "cursor-pointer transition-all duration-300 transform hover:scale-105"} ${selectedOption === "wallet" ? "bg-blue-100 border border-blue-500" : "bg-gray-100"}`}
                        >
                            <input
                                type="radio"
                                name="paymentOption"
                                value="wallet"
                                checked={selectedOption === "wallet"}
                                onChange={() => handleOptionChange("wallet")}
                                className="hidden"
                                disabled={
                                    (walletData?.balance ?? 0) < paymentTotal
                                }
                            />
                            <FaWallet className="text-3xl text-blue-500 mr-3" />
                            <div>
                                <span className="text-lg font-medium">
                                    Wallet
                                </span>
                                <span className="block text-sm text-gray-500">
                                    Balance: {walletData?.balance ?? 0} VND
                                </span>
                                {(walletData?.balance ?? 0) < paymentTotal ? (
                                    <span className="block text-xs text-red-500">
                                        Your wallet balance is insufficient
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
                                value="bank"
                                checked={selectedOption === "bank"}
                                onChange={() => handleOptionChange("bank")}
                                className="hidden"
                            />
                            <FaUniversity className="text-3xl text-green-500 mr-3" />
                            <div>
                                <span className="text-lg font-medium">
                                    Bank
                                </span>
                            </div>
                        </label>
                    </div>
                    {selectedOption && (
                        <div className="mt-6 text-center">
                            <p className="text-xl font-medium text-gray-500">
                                You selected:{" "}
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
                        Make Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentOption;
