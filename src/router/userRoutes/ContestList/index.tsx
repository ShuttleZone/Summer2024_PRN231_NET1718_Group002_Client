// import Filter from "./components/Filter";
import Filter from "@/router/userRoutes/ContestList/components/Filter";

import ContestTable from "@/router/userRoutes/ContestList/components/ContestTable";
import {useGetContestsQuery} from "@/store/services/contests/contest.api";

function ContestList() {
    const {data: contests, isError} = useGetContestsQuery(undefined);

    if (contests == undefined) {
        return <div>Error</div>;
    }
    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div className="w-full flex justify-center py-12">
            <div className="w-3/4">
                <Filter />
                <ContestTable contests={contests} />
            </div>
        </div>
    );
}

export default ContestList;
