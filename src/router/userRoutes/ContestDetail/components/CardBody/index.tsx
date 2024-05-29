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

interface ContestTableProps {
    contests?: ContestInfo[];
}

function CardBody({contests}: ContestTableProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="relative contest-information grid grid-cols-1 grid-rows-3 gap-4 row-span-2">
                <div className="contest-challenger">
                    <a
                        href="#"
                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Challenger Information
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {contests.id}
                        </p>
                    </a>
                </div>
                <div className="contest-policy">
                    <a
                        href="#"
                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Contest Information
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Rules: {contests.policy}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Number of players: {contests.maxPlayer}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Status: {contests.contestStatus}
                        </p>
                    </a>
                </div>
                <div className="contest-suggest">
                    <a
                        href="#"
                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Want to challenge someone else ?
                        </h5>
                        <a
                            href="#"
                            className="inline-flex mt-6 items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Create a contest now
                            <svg
                                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </a>
                    </a>
                </div>
            </div>
            <div className="relative map-location row-span-2">
                <div className="">
                    <a
                        href="#"
                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Map Location
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            <iframe
                                className="w-full  h-96 aspect-video"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.1640561681966!2d106.79814311188517!3d10.875123789234998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2zTmjDoCBWxINuIGjDs2EgU2luaCB2acOqbiBUUC5IQ00!5e0!3m2!1svi!2s!4v1716964598367!5m2!1svi!2s"
                            />
                        </p>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default CardBody;
