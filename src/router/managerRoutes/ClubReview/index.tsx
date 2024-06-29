import AllReviews from "./components/Body";
import Header from "./components/Header";
import ReviewOverview from "./components/Overviews";

function ClubReview() {
    return (
        <div>
            <div>
                <Header />
            </div>
            {/* <div>
                <ReviewOverview />
            </div> */}
            <div>
                <AllReviews />
            </div>
        </div>
    );
}

export default ClubReview;
