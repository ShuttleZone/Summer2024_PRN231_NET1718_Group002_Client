import {useNavigate} from "react-router-dom";
import BottomButtons from "./components/BottomButtons";
import {
    useGetCurrentPackageQuery,
} from "@/store/services/packs/package.api";
import formatVietnameseDong from "@/lib/currency.util";
import {Toaster} from "@/components/ui/toaster";

function MyPackages() {
    
    const navigate = useNavigate();


    const {
        data: packages,
        isError,
        isLoading,
    } = useGetCurrentPackageQuery();
    if (isError) return <div>Error in loading</div>;
    if (isLoading) return <div>Loading...</div>;
    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
    };
    // const handleUnsub = async () => {
    //     const error = await unSub();
    //     console.log("Response " + error);
    //     if (error.data == true) {
    //         toast({
    //             description: "Huỷ gói đăng kí thành công",
    //         });
    //     } else {
    //         toast({
    //             variant: "destructive",
    //             title: "Lỗi server !",
    //             description: "Đã có lỗi trong quá trình huỷ gói",
    //         });
    //     }

    //     refetch();
    // };
    // console.log(packages);
    return (
        <div>
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    {/* <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        Better Data
                    </span>{" "} */}
                    Quản lý gói đăng kí
                </h1>

                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    Theo dõi và quản lý các gói đăng kí hiện tại của bạn.
                </p>
                <Toaster />
            </div>

            <>
                {packages == null ? (
                    <div className="mb-2">
                        <p className="my-2 font-semibold text-2xl text-center text-black">
                            Hiện tại bạn đang không đăng kí gói nào !
                        </p>
                        <p className="mb-2 text-lg font-normal text-gray-500 text-center dark:text-gray-400">
                            Đăng kí gói để sử dụng các dịch vụ dành cho quản lý.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                navigate("/manager/package-list");
                            }}
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-8 py-3 w-full text-center me-2 mb-2"
                        >
                            Xem các gói đăng kí hiện có
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            {packages.packageUserStatus == 0 ? (
                                <div>
                                    <div>
                                        <ol className="items-center flex">
                                            <li className="flex-1 mb-6 sm:mb-0">
                                                <div className="flex items-center">
                                                    <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                                        <svg
                                                            className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                        </svg>
                                                    </div>
                                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                                </div>
                                                <div className="mt-3 sm:pe-8">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        Ngày đăng kí
                                                    </h3>
                                                    <p className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                                        {formatDateTime(
                                                            packages.startDate
                                                        )}
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="flex-1  mb-6 sm:mb-0">
                                                <div className="flex items-center">
                                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                                    <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                                        <svg
                                                            className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="mt-3 sm:pe-8">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        Ngày hết hạn
                                                    </h3>
                                                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                                        {formatDateTime(
                                                            packages.endDate
                                                        )}
                                                    </time>
                                                </div>
                                            </li>
                                        </ol>
                                    </div>
                                    <div
                                        className="flex items-center p-4 mb-4 text-md text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg"
                                        role="alert"
                                    >
                                        <svg
                                            className="flex-shrink-0 inline w-4 h-4 me-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>
                                        <span className="sr-only">Info</span>
                                        <div>
                                            <span className="font-semibold">
                                                Đang kích hoạt
                                            </span>{" "}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="flex items-center p-4 mb-4 text-md text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg"
                                    role="alert"
                                >
                                    <svg
                                        className="flex-shrink-0 inline w-4 h-4 me-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        <span className="font-semibold">
                                            Hết hạn
                                        </span>{" "}
                                    </div>
                                </div>
                            )}
                            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                                {packages.package.name}
                            </h5>
                            <div className="flex items-baseline text-gray-900 dark:text-white">
                                <span className="text-3xl font-semibold"></span>
                                <span className="text-5xl font-extrabold tracking-tight">
                                    {formatVietnameseDong(
                                        packages.package.price,
                                        "VND"
                                    )}{" "}
                                    vnđ
                                </span>
                                <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                                    /tháng
                                </span>
                            </div>
                            <ul role="list" className="space-y-5 my-7">
                                <li className="flex items-center">
                                    <svg
                                        className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                                        Loại gói:{" "}
                                        {packages.package.packageType == "0" ? (
                                            <strong>Tháng</strong>
                                        ) : (
                                            <strong>Năm</strong>
                                        )}
                                    </span>
                                </li>
                                <li className="flex">
                                    <svg
                                        className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                                        {packages.package.description}
                                    </span>
                                </li>
                                {/* <li className="flex line-through decoration-gray-500">
                                    <svg
                                        className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span className="text-base font-normal leading-tight text-gray-500 ms-3">
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Voluptatibus, qui.
                                        Earum aliquid pariatur deleniti enim,
                                        officiis omnis quis eveniet minima qui?
                                        Earum dolore harum dicta officiis
                                        architecto. Porro, accusantium amet!
                                    </span>
                                </li>
                                <li className="flex line-through decoration-gray-500">
                                    <svg
                                        className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span className="text-base font-normal leading-tight text-gray-500 ms-3">
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Id minus iusto itaque
                                        laudantium. Qui, deserunt. Earum,
                                        obcaecati! Aliquid doloribus tempore
                                        eaque recusandae, illum iusto. Eos ipsum
                                        sequi unde fugiat rerum.
                                    </span>
                                </li> */}
                            </ul>
                            {/* <div>
                                {packages.packageUserStatus == 0 ? (
                                    <div>
                                        <AlertDialog key={packages.package.id}>
                                            <AlertDialogTrigger>
                                                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                        Huỷ gói
                                                    </span>
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Bạn có chắc chắn là muốn
                                                        huỷ gói hiện tại ?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Bạn sẽ không thể hoàn
                                                        tác lại gói đã huỷ !
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Huỷ
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={handleUnsub}
                                                        className="group bg-gradient-to-br from-pink-500 to-orange-400"
                                                    >
                                                        Xác nhận huỷ gói
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                                    >
                                        Gia hạn gói
                                    </button>
                                )}
                            </div> */}
                        </div>
                    </div>
                )}
            </>
            <BottomButtons />
        </div>
    );
}

export default MyPackages;
