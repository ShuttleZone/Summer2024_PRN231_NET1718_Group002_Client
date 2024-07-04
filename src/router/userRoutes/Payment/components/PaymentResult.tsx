import {Button} from "@/components/ui/button";
import {FaCheck} from "react-icons/fa";
import {FaExclamation} from "react-icons/fa";
interface PaymentResultProps {
    isSuccess: boolean;
    amount: number;
}

function PaymentResult({isSuccess, amount}: PaymentResultProps) {
    return (
        <div className="w-full h-fit flex flex-col items-center mt-4">
            <div
                className={` ${isSuccess ? "bg-green-500" : "bg-red-500"} w-28 h-28 rounded-full flex flex-col items-center justify-center`}
            >
                {isSuccess ? (
                    <FaCheck className="text-5xl text-white" />
                ) : (
                    <FaExclamation className="text-5xl text-white" />
                )}
            </div>
            <div className="mt-4 flex flex-col items-center text-center">
                {isSuccess ? (
                    <h1 className="text-2xl">Thanh toán thành công</h1>
                ) : (
                    <h1 className="text-2xl">Thanh toán thất bại</h1>
                )}
                {isSuccess ? (
                    <h2 className="text-xl mt-4 text-gray-500">
                        Hóa đơn của bạn đã được thanh toán thành công. Hân hạnh
                        được phục vụ dịch vụ đến quý khách
                    </h2>
                ) : (
                    <h2 className="text-xl mt-4 text-gray-500">
                        Hoá đơn của bạn thanh toán thất bại. Chúng tôi không thể
                        xử lý đơn thanh toán này. Làm ơn thử lại.
                    </h2>
                )}
            </div>
            <div
                className={`text-2xl font-semibold flex flex-row justify-between px-12 mt-8 ${isSuccess ? "text-green-500" : "text-red-500"}`}
            >
                <span className="font-semibold mr-8">Total</span>
                <h1>
                    {amount} vnd
                    {isSuccess ? <span> (PAID)</span> : <span> (FAILED)</span>}
                </h1>
            </div>
            {isSuccess ? (
                <Button className="rounded-xl bg-green-500 h-12 text-xl mt-16 w-36">
                    {" "}
                    Close{" "}
                </Button>
            ) : (
                <Button className="rounded-xl bg-red-500 h-12 text-xl mt-16 w-36">
                    {" "}
                    Try again{" "}
                </Button>
            )}
        </div>
    );
}
export default PaymentResult;
