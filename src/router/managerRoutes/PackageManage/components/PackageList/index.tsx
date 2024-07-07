import {useGetPackagesQuery} from "@/store/services/packs/package.api";
import {useNavigate} from "react-router-dom";
import {PackageInformation, PaymentRequest} from "@/@types/api";
import paymentTypes from "@/constants/payment.constants";

function PackageList() {
    const handleGetPaymentUrl = async (p: PackageInformation) => {
        const paymentRequest: PaymentRequest = {
            orderInfo: p.id,
            fullName: p.name,
            orderType: paymentTypes.ORDER_TYPE_PACKAGE,
            description: "Thanh toán gói đăng kí",
            amount: p.price,
        };
        navigate("/payment", {state: paymentRequest});
    };

    const navigate = useNavigate();
    const {data: packages, isError, isLoading} = useGetPackagesQuery();
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    return (
        <div>
            <div className="mb-8 text-center">
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    Các gói đăng kí hiện có
                </h1>
                <blockquote className="text-2xl mb-2 italic font-semibold text-gray-900 dark:text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        "Gói hợp túi tiền cho mọi hoàn cảnh"
                    </span>
                </blockquote>
                <p className="text-sm font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    Chọn một gói đăng kí để sử dụng dịch vụ thỏa thích. Thanh
                    toán theo nhiều cách. Hủy bất cứ lúc nào.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 justify-items-center">
                <>
                    {packages?.map((p) => {
                        return (
                            <div className="w-full max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                                <div className="bg-gradient-to-r to-emerald-600 from-sky-400 p-14 rounded-t-lg"></div>
                                <div className="px-5 pb-5 mt-2">
                                    <a href="#">
                                        <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            {p.name}
                                        </h5>
                                    </a>
                                    <div className="flex items-center mt-2.5 mb-5">
                                        {p.description}
                                    </div>
                                    <div className="flex items-center mt-2.5 mb-5">
                                        Gói:{" "}
                                        {p.packageType == "MONTH" ? (
                                            <strong> Tháng</strong>
                                        ) : (
                                            <strong> Năm</strong>
                                        )}
                                    </div>
                                    {p.packageType == "MONTH" ? (
                                        <div className="flex items-center justify-between">
                                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                                {p.price}vnđ/tháng
                                            </span>
                                            <a
                                                onClick={() =>
                                                    handleGetPaymentUrl(p)
                                                }
                                                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium  rounded-lg text-sm px-5 py-2.5 text-center"
                                            >
                                                Đăng kí
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                                {p.price}vnđ/năm
                                            </span>
                                            <a
                                                onClick={() =>
                                                    handleGetPaymentUrl(p)
                                                }
                                                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium  rounded-lg text-sm px-5 py-2.5 text-center"
                                            >
                                                Đăng kí
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </>
            </div>
        </div>
    );
}

export default PackageList;
