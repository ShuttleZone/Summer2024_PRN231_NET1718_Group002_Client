// src/components/PaymentOption.tsx
import React, {useState} from "react";
import {FaWallet, FaUniversity} from "react-icons/fa";

const PaymentOption: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>("");
    const walletBalance = 1234.56; // Example balance
    const paymentTotal = 500; // Example payment total

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    const handlePayment = () => {
        if (selectedOption) {
            alert(
                `Payment of $${paymentTotal.toFixed(2)} made using ${selectedOption}`
            );
        } else {
            alert("Please select a payment option.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center  bg-blue-100 ">
            <div className="min-h-screen flex items-center justify-center ">
                <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200">
                    <h2 className="text-3xl font-bold text-center mb-6 text-green-500">
                        Choose Payment Option
                    </h2>
                    <p className="text-center text-gray-600 mb-6">
                        Payment Total: ${paymentTotal.toFixed(2)}
                    </p>
                    <div className="flex flex-col space-y-6">
                        <label
                            className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${selectedOption === "wallet" ? "bg-blue-100 border border-blue-500" : "bg-gray-100"}`}
                        >
                            <input
                                type="radio"
                                name="paymentOption"
                                value="wallet"
                                checked={selectedOption === "wallet"}
                                onChange={() => handleOptionChange("wallet")}
                                className="hidden"
                            />
                            <FaWallet className="text-3xl text-blue-500 mr-3" />
                            <div>
                                <span className="text-lg font-medium">
                                    Wallet
                                </span>
                                <span className="block text-sm text-gray-500">
                                    Balance: ${walletBalance.toFixed(2)}
                                </span>
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
                        className="mt-8 w-full bg-green-500 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-green-700 transition-all duration-300"
                        onClick={handlePayment}
                    >
                        Make Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentOption;
