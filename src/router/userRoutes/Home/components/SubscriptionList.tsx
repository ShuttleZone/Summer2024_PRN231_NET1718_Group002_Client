import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {LuShieldCheck} from "react-icons/lu";
import {Button} from "@/components/ui/button";

interface Subscription {
    id: string;
    name: string;
    price: number;
    description: string;
    status: string;
}
const sampleData: Subscription[] = [
    {
        id: "aaa",
        name: "Profesional",
        price: 200000,
        description: "1111aaaa",
        status: "aa",
    },
    {
        id: "aaa",
        name: "Expert",
        price: 200000,
        description: "1111aaaa",
        status: "aa",
    },
    {
        id: "aaa",
        name: "Enterprise",
        price: 200000,
        description: "1111aaaa",
        status: "aa",
    },
];
function SubscriptionList() {
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
                    {sampleData?.map((subscription) => (
                        <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card>
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
                                </Card>
                            </div>
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
