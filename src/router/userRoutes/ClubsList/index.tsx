import Filter from "./components/Filter";
import ClubCard from "./components/ClubCard";
import {useGetClubsQuery} from "@/store/services/clubs/club.api";

export interface ReviewType {
    id: string;
    rating: number;
}

export interface ClubImageType {
    id: string;
    imageUrl: string;
}

interface ClubType {
    id: string;
    clubName: string;
    clubAddress: string;
    clubPhone: string;
    clubDescription: string;
    openTime: string;
    closeTime: string;
    clubImages: ClubImageType[];
    reviews: ReviewType[];
}

function ClubsList() {
    const {data: clubs, isError} = useGetClubsQuery("");

    if (isError || !clubs) {
        return <div>Error</div>;
    }

    return (
        <div className="w-full flex justify-center py-12">
            <div className="w-3/4">
                <Filter />
                <ul className="grid grid-cols-3 gap-8 mt-12">
                    {clubs.map((club: ClubType) => (
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
