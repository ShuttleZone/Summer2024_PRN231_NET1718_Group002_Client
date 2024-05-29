import {useParams} from "react-router-dom";
import CardContainter from "./components/CardContainter";
import {useGetContestsDetailQuery} from "@/store/services/contests/contest.api";

function ContestDetail() {
    const {contestId} = useParams();
    const {data: contestDetail, isError} = useGetContestsDetailQuery(contestId);
    // console.log(contestId);
    console.log(contestDetail);
    if (contestDetail == undefined) {
        return <div>Error</div>;
    }
    if (isError || !contestDetail) {
        return <div>Error</div>;
    }
    return (
        <div className="w-full flex justify-center py-12">
            <div className="w-3/4">
                {/* <Filter /> */}
                <CardContainter contests={contestDetail} />
            </div>
        </div>
    );
}

export default ContestDetail;
