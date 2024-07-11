import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {FaStar} from "react-icons/fa";
import Rating from "./components/Rating";
import {ClubReviews as ClubReviewsType} from "@/@types/api";
import Review from "./components/Review";

interface ClubReviewsProps {
    reviews?: ClubReviewsType[];
}

function ClubReviews({reviews}: ClubReviewsProps) {
    const getAverageRating = () => {
        if (!reviews || !reviews.length) return 0;
        const totalRating = reviews.reduce(
            (acc, review) => acc + review.rating + 1,
            0
        );
        return totalRating / reviews.length;
    };

    const getReviewCount = (rating: number) => {
        if (!reviews) return 0;
        return reviews.filter((review) => review.rating === rating).length;
    };

    return (
        <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-semibold">
                    Đánh giá
                </AccordionTrigger>
                <AccordionContent>
                    {!reviews || !reviews.length ? (
                        <p className="text-xl font-semibold text-center">
                            Chưa có đánh giá nào
                        </p>
                    ) : (
                        <>
                            <div className="flex justify-start gap-8 mb-12">
                                <div className="flex flex-col justify-center items-center p-6 bg-amber-300/10 rounded gap-2 aspect-square min-w-44">
                                    <span className="text-2xl font-semibold">
                                        {getAverageRating()}
                                    </span>
                                    <span className="text-lg opacity-75">
                                        out of 5.0
                                    </span>
                                    <ul className="flex gap-1">
                                        {Array.from({
                                            length: getAverageRating(),
                                        }).map((_, index) => (
                                            <li key={index}>
                                                <FaStar
                                                    color="orange"
                                                    size={20}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <ul className="grid grid-cols-3 w-full h-full gap-x-24 gap-y-12">
                                    {Array.from({length: 5}).map((_, index) => (
                                        <Rating
                                            key={index}
                                            rating={5 - index}
                                            reviewsCount={getReviewCount(index)}
                                        />
                                    ))}
                                </ul>
                            </div>
                            <ul className="flex flex-col gap-8">
                                {reviews?.map((review) => (
                                    <Review review={review} />
                                ))}
                            </ul>
                        </>
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default ClubReviews;
