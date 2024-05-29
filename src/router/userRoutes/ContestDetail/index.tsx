// import Filter from "./components/Filter";
import Filter from "@/router/userRoutes/ContestList/components/Filter";

import ContestTable from "@/router/userRoutes/ContestList/components/ContestTable";
import CardBody from "./components/CardContainter";
import CardContainter from "./components/CardContainter";

interface Participant {
    id: string;
    fullname: string;
    gender: number;
    userStatusEnum: number;
    isCreatedPerson: boolean;
    isWinner: boolean;
    point: number;
}

interface ContestInfo {
    id: string;
    contestDate: string;
    maxPlayer: number;
    policy: string;
    contestStatus: number;
    participants: Participant[];
}

const contests: ContestInfo[] = [
    {
        id: "2",
        contestDate: "2024-05-24T00:00:00",
        maxPlayer: 8,
        policy: "Follow the rules",
        contestStatus: 1,
        participants: [
            {
                id: "a37b04c6-bd58-48e7-8bab-1bbb207f6216",
                fullname: "John Doe",
                gender: 1,
                userStatusEnum: 0,
                isCreatedPerson: false,
                isWinner: false,
                point: 0,
            },
            {
                id: "26a7cc4e-3f9b-4923-809e-2f9b771d994f",
                fullname: "Jane Smith",
                gender: 1,
                userStatusEnum: 0,
                isCreatedPerson: false,
                isWinner: false,
                point: 0,
            },
        ],
    },
    {
        id: "1",
        contestDate: "2024-05-24T00:00:00",
        maxPlayer: 10,
        policy: "No cheating allowed",
        contestStatus: 0,
        participants: [
            {
                id: "a37b04c6-bd58-48e7-8bab-1bbb207f6216",
                fullname: "John Doe",
                gender: 1,
                userStatusEnum: 0,
                isCreatedPerson: false,
                isWinner: false,
                point: 0,
            },
        ],
    },
    {
        id: "1",
        contestDate: "2024-06-01",
        maxPlayer: 10,
        policy: "Open",
        contestStatus: 1,
        participants: [
            {
                id: "1",
                fullname: "John Doe",
                point: 100,
                gender: 0,
                userStatusEnum: 0,
                isCreatedPerson: false,
                isWinner: false,
            },
            {
                id: "2",
                fullname: "Jane Smith",
                point: 90,
                gender: 0,
                userStatusEnum: 0,
                isCreatedPerson: false,
                isWinner: false,
            },
        ],
    },
    {
        id: "2",
        contestDate: "2024-06-15",
        maxPlayer: 8,
        policy: "Invitation Only",
        contestStatus: 1,
        participants: [
            {
                id: " 3",
                fullname: "Alice Johnson",
                point: 85,
                gender: 0,
                userStatusEnum: 0,
                isCreatedPerson: false,
                isWinner: false,
            },
            {
                id: "4",
                fullname: "Bob Brown",
                point: 95,
                gender: 0,
                userStatusEnum: 0,
                isCreatedPerson: false,
                isWinner: false,
            },
        ],
    },
];

function ContestDetail() {
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
                {/* <Filter /> */}

                {/* <ContestTable contests={contests} /> */}
                <CardContainter />
            </div>
        </div>
    );
}

export default ContestDetail;
