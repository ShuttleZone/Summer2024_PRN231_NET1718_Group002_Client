import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {FaStar} from "react-icons/fa";

const placeholderImage =
    "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const mockImages: string[] = [
    "https://us.123rf.com/450wm/anankkml/anankkml2204/anankkml220400024/184341315-shuttlecock-on-green-badminton-playing-court-with-player-in-background.jpg?ver=6",
    "https://recreation.uic.edu/wp-content/uploads/sites/377/2022/01/F2200046_REC_Badminton-9205-1-1090x727.jpg",
    "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/46317/830728_977684.jpg",
    "https://muic.mahidol.ac.th/eng/wp-content/uploads/2023/04/02-Badminton-Clubs-Weekly-Practice-770x400.jpg",
    "https://blog.khelomore.com/wp-content/uploads/2022/02/MC44MjUxMzYwMCAxNDY4MjI1Njg3-1024x683.jpeg",
    "https://blog.khelomore.com/wp-content/uploads/2022/02/MC44MjUxMzYwMCAxNDY4MjI1Njg3-1024x683.jpeg",
];

function ClubReview() {
    return (
        <div className="shadow-md shadow-black/20 rounded-2xl py-6">
            <div className="flex justify-start items-center gap-4">
                <img
                    src={placeholderImage}
                    alt="reviewer"
                    className="w-20 h-20 rounded-full"
                />
                <div className="flex flex-col justify-between gap-4">
                    <h3 className="text-lg opacity-75">
                        User Abc booked on 06/04/2023
                    </h3>
                    <div className="flex gap-2 items-center">
                        <ul className="flex gap-1">
                            {Array.from({length: 5}).map((_, index) => (
                                <li key={index}>
                                    <FaStar color="orange" size={20} />
                                </li>
                            ))}
                        </ul>
                        <span className="text-lg">5.0</span>
                    </div>
                </div>
            </div>
            <div className="pl-24 mt-4 flex flex-col gap-4">
                <p className="text-xl font-semibold">Absolutely perfect</p>
                <p className="text-lg opacity-75">
                    If you are looking for a perfect place for friendly matches
                    with your friends or a competitive match, it is the best
                    place.
                </p>
                <div className="pr-24">
                    <Carousel>
                        <CarouselContent>
                            {mockImages.map((image, index) => (
                                <CarouselItem key={index} className="basis-1/6">
                                    <img
                                        src={image}
                                        alt="club"
                                        className="w-full aspect-square object-cover rounded-xl"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
                <p className="text-sm opacity-75">On 10/04/2023</p>
            </div>
        </div>
    );
}

export default ClubReview;
