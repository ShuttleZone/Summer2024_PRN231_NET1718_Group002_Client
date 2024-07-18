import WallPaper from "./components/WallPaper";
import HowWeWord from "./components/HowWeWork";
import ClubList from "./components/ClubList";
import SubscriptionList from "./components/SubscriptionList";

function Home() {
    return (
        <div>
            <WallPaper />
            <HowWeWord />
            <ClubList />
            <SubscriptionList />
        </div>
    );
}

export default Home;
