import {ContestInfo} from "@/@types/api";
import JoinContestButton from "../JoinContestButton";
import formatTime from "@/lib/time.util";
import formatVietnameseDong from "@/lib/currency.util";
import {useAppSelector} from "@/store";

interface ContestTableProps {
    contest: ContestInfo;
}

function CardHeader({contest}: ContestTableProps) {
    const currentDate = Date.now.toString();
    const userId = useAppSelector((state) => state.auth.userId);
    const firstReservationDetail =
        contest.reservation.reservationDetailsDtos[0];
    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    };
    return (
        // <div className="relative">
        <div className="absolute mt-2 bottom-0 left-0 w-full">
            <div className="w-auto h-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-4 text-2xl font-bold text-green-600 dark:text-white">
                    Thông tin cuộc đấu
                </h5>
                <ul className="grid w-full gap-6 md:grid-cols-3">
                    <li>
                        <label className="inline-flex max-h-60 items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="block">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-6 inline text-green-600"
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

                                <div className="w-full text-lg font-semibold inline align-middle mx-1 text-green-600">
                                    Tên sân
                                </div>
                                <div className="w-full text-gray-700">
                                    {
                                        contest.reservation
                                            .reservationDetailsDtos[0]?.court
                                            .name
                                    }
                                </div>
                                <div className="w-full text-lg font-semibold inline align-middle mx-1 text-green-600">
                                    Chi phí trả sân
                                </div>
                                <div className="w-full text-gray-700">
                                    {formatVietnameseDong(
                                        contest.reservation.totalPrice,
                                        "VND"
                                    )}{" "}
                                    VND
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
                                    className="size-6 inline text-green-600"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                <div className="w-full inline mx-1 align-middle text-lg font-semibold text-green-600">
                                    Ngày diễn ra
                                </div>
                                <div className="w-full text-gray-700">
                                    {formatDateTime(
                                        contest.reservation.reservationDetailsDtos
                                            .reduce((min, rd) => {
                                                const startTime = new Date(
                                                    rd.startTime
                                                );
                                                return startTime < min
                                                    ? startTime
                                                    : min;
                                            }, new Date(contest.reservation.reservationDetailsDtos[0].startTime))
                                            .toString()
                                    )}
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
                                    className="size-6 inline text-green-600"
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

                                <div className="w-full text-lg font-semibold inline align-middle mx-1 text-green-600">
                                    Thông tin vị trí thi đấu
                                </div>
                                <div className="w-full">
                                    {firstReservationDetail ? (
                                        <div className="space-y-1">
                                            <div className="font-bold text-gray-800">
                                                Địa chỉ câu lạc bộ
                                            </div>
                                            <div className="text-gray-700">
                                                {
                                                    firstReservationDetail.court
                                                        .club.clubAddress
                                                }
                                            </div>

                                            <div className="font-bold text-gray-800">
                                                Thời gian hoạt động
                                            </div>
                                            <div className="text-gray-700">
                                                {formatTime(
                                                    firstReservationDetail.court
                                                        .club.openTime
                                                )}{" "}
                                                -{" "}
                                                {formatTime(
                                                    firstReservationDetail.court
                                                        .club.closeTime
                                                )}
                                            </div>

                                            <div className="font-bold text-gray-800">
                                                SĐT câu lạc bộ
                                            </div>
                                            <div className="text-gray-700">
                                                {
                                                    firstReservationDetail.court
                                                        .club.clubPhone
                                                }
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-gray-500">
                                            Không có thông tin
                                        </div>
                                    )}
                                </div>
                            </div>
                        </label>
                    </li>
                </ul>
                {contest.userContests[0].participantsId == userId ? (
                    <p className="disabled inline-flex mt-6 items-center px-3 py-2 text-lg font-medium text-center text-white bg-green-600 rounded-lg  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Bạn đã ở trong cuộc đấu này!
                    </p>
                ) : // <button className="inline-flex mt-6 items-center px-3 py-2 text-lg font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                //     Bạn là người tạo cuộc đấu này !
                // </button>
                contest.userContests.length == contest.maxPlayer ? (
                    <button className="disabled inline-flex mt-6 items-center px-3 py-2 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Cuộc đấu đã đủ số lượng người chơi !
                    </button>
                ) : contest.contestStatus.toString() == "Closed" &&
                  contest.reservation.reservationDetailsDtos[0].startTime <
                      currentDate ? (
                    <button className="disabled inline-flex mt-6 items-center px-3 py-2 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Cuộc thi đã hết hạn tham gia !
                    </button>
                ) : contest.userContests.length < contest.maxPlayer &&
                  contest.userContests[0].participantsId != userId ? (
                    <JoinContestButton
                        contestId={contest.id}
                        total={contest.reservation.totalPrice}
                    ></JoinContestButton>
                ) : contest.userContests.find(
                      (uc) => uc.participantsId != userId
                  ) && contest.userContests[0].participantsId != userId ? (
                    <JoinContestButton
                        contestId={contest.id}
                        total={contest.reservation.totalPrice}
                    ></JoinContestButton>
                ) : (
                    "Không có thông tin"
                )}
            </div>
        </div>
    );
}

export default CardHeader;
