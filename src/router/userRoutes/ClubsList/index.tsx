import Filter from "./components/Filter";
// import Filter from "@/router/userRoutes/ContestList/components/Filter";

import ClubCard from "./components/ClubCard";
// import {useEffect} from "react";
// import {useGetClubsQuery} from "@/store/services/clubs/club.api";

interface ClubType {
    id: string;
    name: string;
    description: string;
    location: string;
    image: string;
    profileImage: string;
    tags: string[];
    price: number;
    reviews: number;
    rating: number;
}

const clubs: ClubType[] = [
    {
        id: "1",
        name: "Club 1",
        description: "Club 1 description",
        location: "Location 1",
        image: "https://source.unsplash.com/400x400/?club",
        profileImage: "https://source.unsplash.com/400x400/?profile",
        tags: ["tag1", "tag2", "tag3"],
        price: 100,
        reviews: 100,
        rating: 4.2,
    },
    {
        id: "2",
        name: "Club 1",
        description: "Club 1 description",
        location: "Location 1",
        image: "https://source.unsplash.com/400x400/?club",
        profileImage: "https://source.unsplash.com/400x400/?profile",
        tags: ["tag1", "tag2", "tag3"],
        price: 100,
        reviews: 100,
        rating: 4,
    },
    {
        id: "3",
        name: "Club 1",
        description: "Club 1 description",
        location: "Location 1",
        image: "https://source.unsplash.com/400x400/?club",
        profileImage: "https://source.unsplash.com/400x400/?profile",
        tags: ["tag1", "tag2", "tag3"],
        price: 100,
        reviews: 100,
        rating: 4,
    },
    {
        id: "4",
        name: "Club 1",
        description: "Club 1 description",
        location: "Location 1",
        image: "https://source.unsplash.com/400x400/?club",
        profileImage: "https://source.unsplash.com/400x400/?profile",
        tags: ["tag1", "tag2", "tag3"],
        price: 100,
        reviews: 100,
        rating: 4,
    },
];

function ClubsList() {
    // const {data, isLoading, isError, error} = useGetClubsQuery("");
    // useEffect(() => {
    //     console.log(data);
    //     console.log(isLoading);
    //     console.log(isError);
    //     console.log(error);
    // }, [isLoading]);

    return (
        <div className="w-full flex justify-center py-12">
            <div className="w-3/4">
                <Filter />
                <ul className="grid grid-cols-3 gap-8 mt-12">
                    {clubs.map((club) => (
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
