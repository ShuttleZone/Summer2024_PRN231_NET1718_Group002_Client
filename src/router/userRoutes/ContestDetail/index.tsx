import {useParams} from "react-router-dom";
import CardContainter from "./components/CardContainter";
import {useGetContestsDetailQuery} from "@/store/services/contests/contest.api";
import {skipToken} from "@reduxjs/toolkit/query";

function ContestDetail() {
    const {contestId} = useParams();
    const {
        data: contestDetail,
        isError,
        isLoading,
    } = useGetContestsDetailQuery(contestId || skipToken);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError || !contestDetail) {
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
