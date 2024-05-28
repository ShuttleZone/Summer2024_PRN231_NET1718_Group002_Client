import Filter from "./components/Filter";
// import Filter from "@/router/userRoutes/ContestList/components/Filter";

import ClubCard from "./components/ClubCard";
import {useGetClubsQuery} from "@/store/services/clubs/club.api";

function ClubsList() {
    const {data: clubs, isError} = useGetClubsQuery(undefined);

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div className="w-full flex justify-center py-12">
            <div className="w-3/4">
                <Filter />
                <ul className="grid grid-cols-3 gap-8 mt-12">
                    {clubs &&
                        clubs.map((club) => (
                            <li key={club.id} className="col-span-1">
                                <ClubCard {...club} />
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

export default ClubsList;
