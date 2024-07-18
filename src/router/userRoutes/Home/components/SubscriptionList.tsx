import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {useGetPackagesQuery} from "@/store/services/packs/package.api";

function SubscriptionList() {
    const {data: packages, isError, isLoading} = useGetPackagesQuery();
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    return (
        <div className="w-full h-screen flex  flex-col justify-start items-center py-32 gap-20 border-2 border-b-black ">
            <div className="w-2/3 h-fit py-2 mx-auto ">
                <h1 className="text-4xl text-center font-bold bg-gradient-to-r from-slate-400 to-lime-500 bg-clip-text text-transparent">
                    Các gói dịch vụ dành cho các chủ câu lạc bộ
                </h1>
                <h1 className="text-xl text-center mt-4 font-semibold">
                    Uy tín, hữu ích với rất nhiều các tính năng hỗ trợ cho việc
                    quản lí câu lạc bộ. Hãy đăng kí ngay.
                </h1>
            </div>
            <Carousel className="w-2/3 mx-auto ">
                <CarouselContent className="-ml-1">
                    {packages?.map((subscription) => (
                        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                            <div
                                className="max-w-sm m-2 flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                                key={subscription.id}
                            >
                                <a>
                                    <img
                                        className="rounded-t-lg"
                                        src="/docs/images/blog/image-1.jpg"
                                        alt=""
                                    />
                                </a>
                                <div className="p-5">
                                    <div>
                                        <a href="#">
                                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {subscription.name}
                                            </h5>
                                        </a>
                                    </div>

                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {subscription.description}
                                    </p>

                                    <span className="block mb-2 text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                                        {subscription.price} vnd/tháng
                                    </span>
                                    <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Đăng kí ngay
                                        <svg
                                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M1 5h12m0 0L9 1m4 4L9 9"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* <Card>
                                    <CardContent
                                        className="flex aspect-square items-center justify-center h-fit p-0"
                                        key={subscription.id}
                                    >
                                        <div className="w-full h-full flex flex-col justify-start">
                                            <div className="h-1/4 bg-gradient-to-r from-green-300 to-green-900 rounded-t-3xl">
                                                <h1 className="text-2xl items-center py-2 flex flex-col">
                                                    <LuShieldCheck className="text-3xl " />
                                                    <span className="text-white tracking-widest">
                                                        {subscription.name}
                                                    </span>
                                                </h1>
                                            </div>
                                            <div className="text-center py-4 h-1/6">
                                                <span className="text-2xl">
                                                    {subscription.price}
                                                </span>{" "}
                                                vnd/ month
                                            </div>
                                            <div className="w-full flex flex-col items-center py-4 min-h-44">
                                                <h1>
                                                    {subscription.description}
                                                </h1>
                                            </div>
                                            <Button className="h-1/6 bg-gradient-to-r from-green-300 to-yellow-500 rounded-b-3xl">
                                                Đăng kí ngay
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card> */}
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
export default SubscriptionList;
