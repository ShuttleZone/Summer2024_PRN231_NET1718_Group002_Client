// import Filter from "./components/Filter";
import Filter from "@/router/userRoutes/ContestList/components/Filter";

import DataTable from "@/router/userRoutes/ContestList/components/ContestTable";
import {Column} from "react-table";

// import {useEffect} from "react";
// import {useGetClubsQuery} from "@/store/services/clubs/club.api";

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
        id: "851e80b3-c3d3-4f1d-b5d8-462cab592b84",
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
        id: "3d6e11e2-8914-495b-b3d7-798960a5fe91",
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
];

const data: ContestInfo[] = contests;

const columns: Column<ContestInfo>[] = [
    {Header: "Contest ID", accessor: "id"},
    {Header: "Contest Date", accessor: "contestDate"},
    {Header: "Status", accessor: "contestStatus"},
    {Header: "Number of Players", accessor: "maxPlayer"},
    {Header: "Policy", accessor: "policy"},
    // {Header: "Participants", accessor: "participants"},
];

function ContestList() {
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
                <h1>All Contests Information</h1>
                <h4>Manage and track all the contests on the platform.</h4>
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
}

export default ContestList;
