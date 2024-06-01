import {useNavigate} from "react-router-dom";

export interface Participant {
    email: string;
    phoneNumer: string;
    id: string;
    fullname: string;
    gender: number;
    userStatusEnum: number;
    isCreatedPerson: boolean;
    isWinner: boolean;
    point: number;
}

export interface ContestInfo {
    id: string;
    contestDate: string;
    maxPlayer: number;
    policy: string;
    contestStatus: number;
    participants: Participant[];
}

function InputDataTable({
    id,
    contestDate,
    maxPlayer,
    policy,
    contestStatus,
    participants,
}: ContestInfo) {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/contests/details/${id}`);
    };

    return (
        <tr className="text-gray-700  hover:bg-white ">
            <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            >
                <img
                    className="w-10 h-10 rounded-full"
                    src="https://plus.unsplash.com/premium_photo-1716396589811-69274847ce9f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8"
                    alt="Neil Sims"
                />
                <div className="ps-3">
                    <div
                        className="text-base font-semibold"
                        onClick={handleCardClick}
                    >
                        {participants.map((participant) => {
                            if (participant.isCreatedPerson == false) {
                                return (
                                    <div key={participant.id}>
                                        {participant.fullname}
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={participant.id}>
                                        No name provided
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <div className="font-normal text-gray-500">
                        {participants.map((participant) => {
                            if (participant.isCreatedPerson == false) {
                                return (
                                    <div key={participant.id}>
                                        {participant.email}
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={participant.id}>
                                        No email provided
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </th>
            {/* <td className=" px-4 py-2">{id}</td> */}
            <td className=" px-4 py-2">{policy}</td>
            <td className=" px-4 py-2">{contestDate}</td>
            <td className=" px-4 py-2">
                {contestStatus === 1
                    ? "Upcoming"
                    : contestStatus === 0
                      ? "On Going"
                      : ""}
            </td>
            <td className=" px-4 py-2">{maxPlayer}</td>
            <td className=" px-4 py-2">{policy}</td>
            <td className=" px-4 py-2">
                <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                    Action
                </a>
                <ul>
                    {participants.map((participant) => (
                        <li key={participant.id}>
                            {participant.fullname} - Points: {participant.point}
                        </li>
                    ))}
                </ul>
            </td>
        </tr>
    );
}

interface ContestTableProps {
    contests?: ContestInfo[];
}

function ContestTable({contests}: ContestTableProps) {
    return (
        <div className="bg-gray-50 p-6 mt-4 rounded-md">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-4xl font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        All Contests
                        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                            Keep track and manage all the contests.
                        </p>
                    </caption>
                    <thead className="bg-gray-100 font-sans">
                        <tr>
                            <th className="text-left px-6 py-3">
                                Challenger Information
                            </th>
                            <th className="text-left px-6 py-3">Court Name</th>
                            <th className="text-left px-6 py-3">Date & Time</th>
                            <th className="text-left px-6 py-3">Status</th>
                            <th className="text-left px-6 py-3">
                                Number of Player
                            </th>
                            <th className="text-left px-6 py-3">Policy</th>
                            <th className="text-left px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contests.map((contest) => (
                            <InputDataTable
                                key={contest.id}
                                id={contest.id}
                                contestDate={contest.contestDate}
                                maxPlayer={contest.maxPlayer}
                                policy={contest.policy}
                                contestStatus={contest.contestStatus}
                                participants={contest.participants}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ContestTable;
