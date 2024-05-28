import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function BookingBreadcrumb() {
    return (
        <Breadcrumb className="flex flex-row justify-center items-center my-8">
            <BreadcrumbList className="text-2xl text-black">
                <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold transition-colors duration-200 text-black flex flex-row gap-2">
                        {" "}
                        <div className="w-8 h-8 rounded-full px-3 bg-green-600 flex justify-center items-center">
                            <span className="text-white text-center">1</span>
                        </div>{" "}
                        Type Of Booking
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-gray-400 transition-colors duration-200 hover:text-black scale-150" />
                <BreadcrumbItem>
                    <BreadcrumbLink
                        className="font-semibold text-gray-400 transition-colors duration-200 hover:text-black flex flex-row gap-2"
                        href="/court-booking/time-date"
                    >
                        <div className="w-8 h-8 rounded-full px-3 bg-gray-400 flex justify-center items-center">
                            <span className="text-white text-center">2</span>
                        </div>{" "}
                        Time & Date
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-gray-400 transition-colors duration-200 hover:text-black scale-150" />
                <BreadcrumbItem>
                    <BreadcrumbLink
                        className="font-semibold text-gray-400 transition-colors duration-200 hover:text-black flex flex-row gap-2"
                        href="/court-booking/personal-info"
                    >
                        <div className="w-8 h-8 rounded-full px-3 bg-gray-400 flex justify-center items-center">
                            <span className="text-white text-center">3</span>
                        </div>{" "}
                        Personal Information
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-gray-400 transition-colors duration-200 hover:text-black scale-150" />
                <BreadcrumbItem>
                    <BreadcrumbLink
                        className="font-semibold text-gray-400 transition-colors duration-200 hover:text-black flex flex-row gap-2"
                        href="/court-booking/confirm"
                    >
                        <div className="w-8 h-8 rounded-full px-3 bg-gray-400 flex justify-center items-center">
                            <span className="text-white text-center">4</span>
                        </div>{" "}
                        Order Conformation
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-gray-400 transition-colors duration-200 hover:text-black scale-150" />
                <BreadcrumbItem>
                    <BreadcrumbLink className="font-semibold text-gray-400 transition-colors duration-200 hover:text-black flex flex-row gap-2">
                        <div className="w-8 h-8 rounded-full px-3 bg-gray-400 flex justify-center items-center">
                            <span className="text-white text-center">5</span>
                        </div>{" "}
                        Payment{" "}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
export default BookingBreadcrumb;
