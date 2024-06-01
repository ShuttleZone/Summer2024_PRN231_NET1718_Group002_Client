import {useParams} from "react-router-dom";
import CardContainter from "./components/CardContainter";
import {useGetContestsDetailQuery} from "@/store/services/contests/contest.api";

function ContestDetail() {
    const {contestId} = useParams();
    const {data: contestDetail, isError} = useGetContestsDetailQuery(contestId);
    console.log(contestDetail);
    if (contestDetail == undefined) {
        return <div>ABC</div>;
    }
    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div className="w-full flex justify-center py-12">
            <div className="w-3/4">
                <CardContainter contest={contestDetail} />
            </div>
        </div>
    );
}

export default ContestDetail;
