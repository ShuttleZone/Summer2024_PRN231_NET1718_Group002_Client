import {useGetClubsQuery} from "@/store/services/clubs/club.api";
import ClubCardSkeletons from "../../ClubsList/components/ClubCardSkeletons";
import ClubCard from "../../ClubsList/components/ClubCard";
import {Card, CardContent} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

function ClubList() {
    const {data: clubs, isLoading} = useGetClubsQuery(undefined);

    return (
        <div className="w-full h-screen flex  flex-col justify-start items-center py-32 gap-20 border-2 border-b-black  ">
            <div className="w-2/3 h-fit py-2 mx-auto ">
                <h1 className="text-4xl text-center font-bold bg-gradient-to-r from-slate-400 to-lime-500 bg-clip-text text-transparent">
                    Các câu lạc bộ
                </h1>
                <h1 className="text-xl text-center mt-4 font-semibold">
                    Nhanh chóng, Tiện lợi và Nhiệt tình
                </h1>
            </div>
            <Carousel className="w-2/3 mx-auto ">
                <CarouselContent className="-ml-1">
                    {isLoading ? (
                        <ClubCardSkeletons />
                    ) : (
                        clubs?.map((club) => (
                            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card>
                                        <CardContent
                                            className="flex aspect-square items-center justify-center p-6 h-fit"
                                            key={club.id}
                                        >
                                            <ClubCard {...club} />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))
                    )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
export default ClubList;
