// import Filter from "./components/Filter";
import {useGetClubRequestsAdminQuery} from "@/store/services/clubsAdmin/clubAdmin.api";
import FilterBarModule from "./components/FilterBar";
import RequestTable from "./components/RequestsTable";

function ClubRequestList() {
    const {
        data: clubRequests,
        isError,
        isLoading,
        refetch,
    } = useGetClubRequestsAdminQuery(undefined);

    console.log(clubRequests);
    if (clubRequests == undefined) {
        return <div>Error</div>;
    }

    if (isLoading) return <div>Loading...</div>;

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div className="w-full flex justify-center py-12">
            <div className="w-3/4">
                <FilterBarModule />
                <RequestTable requests={clubRequests} refetch={refetch} />
            </div>
        </div>
    );
}

export default ClubRequestList;
