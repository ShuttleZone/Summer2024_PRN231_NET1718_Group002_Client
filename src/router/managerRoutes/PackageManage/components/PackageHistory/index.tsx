import formatVietnameseDong from "@/lib/currency.util";
import {useGetPackageHistoryQuery} from "@/store/services/packs/package.api";

function PackageHistory() {
    const {data: packages, isError, isLoading} = useGetPackageHistoryQuery();
    if (isError) return <div>Error in loading</div>;
    if (isLoading) return <div>Loading...</div>;
    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
    };
    return (
        <div className="mb-8">
            <div>
                <h1 className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    Quản lý gói đăng kí
                </h1>

                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    Theo dõi và quản lý các gói đăng kí hiện tại của bạn.
                </p>
            </div>
            <>
                <div className="w-full mt-4 p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col space-y-4">
                    {/* <a
                    href="#"
                    className="flex flex-col items-center w-full bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                    <img
                        className="object-cover w-full h-48 md:h-auto md:w-48 rounded-t-lg md:rounded-none md:rounded-s-lg"
                        src="https://i.pinimg.com/474x/7d/e2/4a/7de24a93bb9dd6602102645a050a2026.jpg"
                        alt=""
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal w-full">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Noteworthy technology acquisitions 2021
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Here are the biggest enterprise technology
                            acquisitions of 2021 so far, in reverse
                            chronological order.
                        </p>
                    </div>
                </a> */}
                    {packages?.map((pack) => {
                        return (
                            <a
                                href="#"
                                className="flex flex-col items-center w-full bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                <img
                                    className="object-cover w-full h-48 md:h-auto md:w-48 rounded-t-lg md:rounded-none md:rounded-s-lg"
                                    src="https://i.pinimg.com/474x/43/2b/c9/432bc9e7e387c8698b8a700b39bc4d57.jpg"
                                    alt=""
                                />

                                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                                    {pack.packageUserStatus == 1 ? (
                                        <span className="bg-red-100 text-red-800 text-md font-medium me-2 px-2.5 py-1.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                            Hết hạn
                                        </span>
                                    ) : pack.packageUserStatus == 0 ? (
                                        <span className="bg-green-100 text-green-800 text-md font-medium me-2 px-2.5 py-1.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                            Đang hoạt động
                                        </span>
                                    ) : pack.packageUserStatus == 2 ? (
                                        <span className="bg-red-100 text-red-800 text-md font-medium me-2 px-2.5 py-1.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                            Đã huỷ
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {pack.package.name}
                                    </h5>
                                    <p className="mb-2 font-bold text-gray-700 dark:text-gray-400">
                                        Thời hạn:{" "}
                                        {pack.package.packageType == "1"
                                            ? "Năm"
                                            : "Tháng"}
                                    </p>
                                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                                        {pack.package.description}
                                    </p>
                                    <p className="mb-2">
                                        <strong>
                                            {formatDateTime(pack.startDate)}
                                        </strong>{" "}
                                        -{" "}
                                        <strong>
                                            {formatDateTime(pack.endDate)}
                                        </strong>
                                    </p>
                                    <span className="text-xl font-bold tracking-tight">
                                        {formatVietnameseDong(
                                            pack.package.price,
                                            "VND"
                                        )}{" "}
                                        vnđ
                                    </span>
                                </div>
                            </a>
                        );
                    })}

                    {/* <a
                        href="#"
                        className="flex flex-col items-center w-full bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        <img
                            className="object-cover w-full h-48 md:h-auto md:w-48 rounded-t-lg md:rounded-none md:rounded-s-lg"
                            src="https://i.pinimg.com/474x/6d/0e/2d/6d0e2d1bc722f6f68e7b1a1f12f85eea.jpg"
                            alt=""
                        />
                        <div className="flex flex-col justify-between p-4 leading-normal w-full">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Noteworthy technology acquisitions 2021
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology
                                acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                        </div>
                    </a> */}
                </div>
            </>
        </div>
    );
}

export default PackageHistory;
