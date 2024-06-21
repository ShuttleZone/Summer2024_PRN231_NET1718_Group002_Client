import Filter from "./components/Filter";
import {useGetClubsQuery} from "@/store/services/clubs/club.api";
import ClubCardSkeletons from "./components/ClubCardSkeletons";
import ClubCard from "./components/ClubCard";

function ClubsList() {
    const {data: clubs, isError, isLoading} = useGetClubsQuery(undefined);

    if (isError) {
        return <div>An error occurred</div>;
    }

    return (
        <div className="w-full flex justify-center py-12">
            <div className="w-3/4">
                <Filter />
                <ul className="grid grid-cols-3 gap-8 mt-12">
                    {isLoading ? (
                        <ClubCardSkeletons />
                    ) : (
                        clubs?.map((club) => (
                            <li key={club.id} className="col-span-1">
                                <ClubCard {...club} />
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default ClubsList;
