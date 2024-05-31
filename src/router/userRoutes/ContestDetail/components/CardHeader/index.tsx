import {ContestInfo} from "@/@types/api";

interface ContestTableProps {
    contest: ContestInfo;
}

function CardHeader({contest}: ContestTableProps) {
    return (
        // <div className="relative">
        <div className="absolute mt-2 bottom-0 left-0 w-full">
            <div className="w-auto h-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Contest Information
                </h5>
                <ul className="grid w-full gap-6 md:grid-cols-3">
                    <li>
                        <label className="inline-flex  max-h-60 items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="block">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-6 inline"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 6h.008v.008H6V6Z"
                                    />
                                </svg>

                                <div className="w-full text-lg font-semibold inline align-middle mx-1">
                                    Court Name
                                </div>
                                <div className="w-full">
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Alias architecto quam unde
                                    velit enim deserunt sed tempore soluta,
                                    pariatur ullam consectetur blanditiis,
                                    laudantium repudiandae eligendi minus vel
                                    temporibus, ea doloremque?
                                </div>
                            </div>
                        </label>
                    </li>
                    <li>
                        <label className="inline-flex max-h-60 items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="block">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-6 inline"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                <div className="w-full inline mx-1 align-middle text-lg font-semibold">
                                    Date & Time
                                </div>
                                <div className="w-full">
                                    {contest.contestDate}
                                </div>
                            </div>
                        </label>
                    </li>
                    <li>
                        <label className="inline-flex max-h-60 items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="block">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-6 inline "
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                    />
                                </svg>

                                <div className="w-full inline align-middle mx-1 text-lg font-semibold">
                                    Court Address
                                </div>
                                <div className="w-full">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Reprehenderit nam esse
                                    similique fugit id inventore, recusandae
                                    quibusdam veritatis? Minus tempore dolorum
                                    sunt non aut autem nobis? Facilis ea iure
                                    reprehenderit.
                                </div>
                            </div>
                        </label>
                    </li>
                </ul>
                <a
                    href="#"
                    className="inline-flex mt-6 items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Accept Challenge
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
            </div>
        </div>
        // </div>
    );
}

export default CardHeader;
