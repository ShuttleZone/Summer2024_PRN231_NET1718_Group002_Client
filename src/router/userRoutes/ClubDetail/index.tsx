import {useParams} from "react-router-dom";
import Carousel from "./components/Carousel";
import {useGetClubDetailQuery} from "@/store/services/clubs/club.api";
import ClubHeader from "./components/ClubHeader";
import ClubDescription from "./components/ClubDescription";
import ClubReviews from "./components/ClubReviews";
import ClubLocation from "./components/ClubLocation";
import {useAppDispatch} from "@/store";
import {useEffect} from "react";
import {setClubDetail} from "@/store/slices/bookingStage.slice";
import {useGetClubReviewsQuery} from "@/store/services/reviews/review.api";
import {skipToken} from "@reduxjs/toolkit/query";

const mockImages: string[] = [
    "https://us.123rf.com/450wm/anankkml/anankkml2204/anankkml220400024/184341315-shuttlecock-on-green-badminton-playing-court-with-player-in-background.jpg?ver=6",
    "https://recreation.uic.edu/wp-content/uploads/sites/377/2022/01/F2200046_REC_Badminton-9205-1-1090x727.jpg",
    "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/46317/830728_977684.jpg",
    "https://muic.mahidol.ac.th/eng/wp-content/uploads/2023/04/02-Badminton-Clubs-Weekly-Practice-770x400.jpg",
    "https://blog.khelomore.com/wp-content/uploads/2022/02/MC44MjUxMzYwMCAxNDY4MjI1Njg3-1024x683.jpeg",
    "https://blog.khelomore.com/wp-content/uploads/2022/02/MC44MjUxMzYwMCAxNDY4MjI1Njg3-1024x683.jpeg",
];

function ClubDetail() {
    const {clubId} = useParams();
    const dispatch = useAppDispatch();
    const {
        data: clubDetail,
        isError,
        isLoading,
    } = useGetClubDetailQuery(clubId || skipToken);
    const {data: reviews} = useGetClubReviewsQuery(clubId || skipToken);

    const getAverageRating = () => {
        if (!reviews || !reviews.length) return 0;
        const totalRating = reviews.reduce(
            (acc, review) => acc + review.rating + 1,
            0
        );
        return totalRating / reviews.length;
    };

    useEffect(() => {
        dispatch(setClubDetail(clubDetail));
    }, [dispatch, clubId, clubDetail]);

    if (isLoading) return <div>Loading...</div>;
    else if (isError || !clubDetail) return <div>Error</div>;

    return (
        <div>
            <Carousel
                images={
                    clubDetail.clubImages?.map((img) => img.imageUrl) ||
                    mockImages
                }
            />
            <div className="w-3/4 m-auto py-4 flex flex-col gap-4">
                <ClubHeader
                    name={clubDetail.clubName}
                    address={clubDetail.clubAddress}
                    phone={clubDetail.clubPhone}
                    reviewsCount={reviews?.length || 0}
                    rating={getAverageRating()}
                />
                <ClubDescription description={clubDetail.clubDescription} />
                <ClubReviews reviews={reviews} />
                <ClubLocation lat={10.822} lng={106.6257} />
            </div>
        </div>
    );
}

export default ClubDetail;
