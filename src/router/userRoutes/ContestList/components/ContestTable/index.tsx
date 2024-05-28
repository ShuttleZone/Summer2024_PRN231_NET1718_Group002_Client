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

function ContestTable({
    id,
    contestDate,
    maxPlayer,
    policy,
    contestStatus,
    participants,
}: ContestInfo) {
    return (
        <div className="bg-gray-50 p-6 mt-4 rounded-md">
            <h1 className="text-xl font-bold font-sans ml-2 mb-2">
                All Contests Information
            </h1>
            <h4 className="ml-2 mb-2 mt-2">
                Manage and track all the contests on the platform.
            </h4>
            <div className="table-auto hover: bg-white w-full border-collapse">
                <thead className="bg-gray-100 font-sans">
                    <th className="px-4 py-2">Contest ID</th>
                    <th className="px-4 py-2">Court Name</th>
                    <th className="px-4 py-2">Date & Time</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Number of Player</th>
                    <th className="px-4 py-2">Policy</th>
                    <th className="px-4 py-2">Action</th>
                </thead>
                <tbody>
                    <tr className="text-gray-700">
                        <td className="border px-4 py-2">{id}</td>
                        <td className="border px-4 py-2">{policy}</td>
                        <td className="border px-4 py-2">{contestDate}</td>
                        <td className="border px-4 py-2">{contestStatus}</td>
                        <td className="border px-4 py-2">{maxPlayer}</td>
                        <td className="border px-4 py-2">{policy}</td>
                        <td className="border px-4 py-2">
                            <ul>
                                {participants.map((participant) => (
                                    <li key={participant.id}>
                                        {participant.fullname} - Points:{" "}
                                        {participant.point}
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </div>
        </div>
    );
}

export default ContestTable;
