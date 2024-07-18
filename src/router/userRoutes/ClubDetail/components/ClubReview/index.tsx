import {useGetClubReviewsQuery} from "@/store/services/reviews/review.api";
import {skipToken} from "@reduxjs/toolkit/query";
import {FaStar} from "react-icons/fa";
import {useParams} from "react-router-dom";

const placeholderImage =
    "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function ClubReview() {
    const {clubId} = useParams();
    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    };
    const {
        data: reviews,
        isLoading,
        isSuccess,
    } = useGetClubReviewsQuery(clubId || skipToken);

    if (isLoading) return <div>is loading...</div>;
    if (isSuccess)
        return (
            <>
                {reviews?.length == 0 ? (
                    <p className="text-xl font-semibold">
                        Chưa có đánh giá nào
                    </p>
                ) : (
                    <div>
                        {reviews?.map((review) => {
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
                                                <strong>
                                                    {review.createdBy}
                                                </strong>{" "}
                                                booked on{" "}
                                                {formatDateTime(review.created)}
                                            </h3>
                                            <div className="flex gap-2 items-center">
                                                <ul className="flex gap-1">
                                                    {Array.from({
                                                        length: 5,
                                                    }).map((_, index) => (
                                                        <li key={index}>
                                                            <FaStar
                                                                color="orange"
                                                                size={20}
                                                            />
                                                        </li>
                                                    ))}
                                                </ul>
                                                <span className="text-lg">
                                                    {review.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pl-24 mt-4 flex flex-col gap-4">
                                        <p className="text-xl font-semibold">
                                            {review.title}
                                        </p>
                                        <p className="text-lg opacity-75">
                                            {review.comment}
                                        </p>
                                        <div className="pr-24">
                                            {/* <Carousel>
                                                <CarouselContent>
                                                    {mockImages.map(
                                                        (image, index) => (
                                                            <CarouselItem
                                                                key={index}
                                                                className="basis-1/6"
                                                            >
                                                                <img
                                                                    src={image}
                                                                    alt="club"
                                                                    className="w-full aspect-square object-cover rounded-xl"
                                                                />
                                                            </CarouselItem>
                                                        )
                                                    )}
                                                </CarouselContent>
                                                <CarouselPrevious />
                                                <CarouselNext />
                                            </Carousel> */}
                                        </div>
                                        <p className="text-sm opacity-75">
                                            On {formatDateTime(review.created)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </>
        );
}

export default ClubReview;
