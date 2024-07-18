import {ContestInfo} from "@/@types/api";
import {useNavigate} from "react-router-dom";

interface ContestTableProps {
    contest: ContestInfo;
}

function CardBody({contest}: ContestTableProps) {
    const navigate = useNavigate();
    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <div className="relative contest-information grid grid-cols-1 grid-rows-3 gap-4 row-span-2">
                    <div className="contest-challenger">
                        <a
                            href="#"
                            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Thông tin các người chơi
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {contest.userContests.map((user) => {
                                    return (
                                        <div
                                            className="my-2"
                                            key={user.participantsId}
                                        >
                                            Tên:{" "}
                                            <strong>{user.fullname}</strong>
                                            <br />
                                            SĐT: {user.phoneNumber}
                                            <br />
                                            Email: {user.email}
                                            <br />
                                            Giới tính:{" "}
                                            {user.gender == 0
                                                ? "Nam"
                                                : user.gender == 1
                                                  ? "Nữ"
                                                  : ""}
                                        </div>
                                    );
                                })}
                            </p>
                        </a>
                    </div>
                    <div className="contest-policy">
                        <a
                            href="#"
                            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Thông tin cuộc đấu
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Thể lệ: {contest.policy}
                            </p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Tổng số người chơi: {contest.maxPlayer} người
                            </p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Trạng thái cuộc đấu:{" "}
                                {contest.contestStatus.toString() ==
                                "InProgress"
                                    ? "Đang diễn ra"
                                    : contest.contestStatus.toString() == "Open"
                                      ? "Đang mở"
                                      : contest.contestStatus.toString() ==
                                          "Closed"
                                        ? "Đã diễn ra"
                                        : ""}
                            </p>
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
                                Vị trí câu lạc bộ
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
            <div className="contest-suggest">
                <a
                    href="#"
                    className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Bạn muốn thách đấu với những người chơi khác ?
                    </h5>
                    <a
                        onClick={() => navigate("/clubs")}
                        className="inline-flex mt-6 items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Hãy thách thức những người chơi khác ngay !
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
    );
}

export default CardBody;
