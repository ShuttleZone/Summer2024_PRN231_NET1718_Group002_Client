import {ContestResponse} from "@/@types/api";
import {UserContestRequest} from "@/@types/requests";
import {useToast} from "@/components/ui/use-toast";
import {useUpdateContestResultMutation} from "@/store/services/contests/contest.api";
import React, {useEffect, useState} from "react";
import {
    FaCalendarAlt,
    FaCheckCircle,
    FaTimesCircle,
    FaUsers,
} from "react-icons/fa";

interface ContestDetailsProps {
    contest: ContestResponse;
}

const ContestDetailsItem: React.FC<ContestDetailsProps> = ({contest}) => {
    const [updateContestResult] = useUpdateContestResultMutation();
    const {toast} = useToast();
    const [disableUpdate, setDisableUpdate] = useState<boolean>(false);
    const [userContests, setUserContests] = useState<UserContestRequest[]>(
        contest.userContests?.map((uc) => ({
            participantsId: uc.participantsId,
            isWinner: uc.isWinner,
            point: uc.point,
        })) || []
    );
    useEffect(() => {
        setDisableUpdate(contest.contestStatus === "Closed");
    }, [contest.contestStatus]);

    const handlePointChange = (index: number, point: number) => {
        setUserContests((prev) =>
            prev.map((uc, i) => (i === index ? {...uc, point: point} : uc))
        );
    };
    // const handleIsWinnerChange = (index: number, checked: boolean) => {
    //     setUserContests((prev) =>
    //         prev.map((uc, i) =>
    //             i === index ? {...uc, isWinner: !uc.isWinner} : uc
    //         )
    //     );
    // };

    const handleSubmit = async () => {
        try {
            await updateContestResult({
                id: contest.id,
                userContests: userContests,
            }).unwrap();

            setDisableUpdate(true);
            toast({
                title: "Thành công",
                description: "Cập nhật cuộc thi thành công!",
                variant: "default",
            });
        } catch (err) {
            toast({
                title: "Lỗi",
                description:
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (err as any)?.data?.value || "Đã xảy ra lỗi không xác định",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="w-full h-full overflow-y-auto p-8 bg-blue-100 rounded-xl shadow-lg text-gray-900">
            <h2 className="text-3xl font-bold mb-6 text-center text-purple-900">
                Chi tiết cuộc thi
            </h2>
            <div className="space-y-4">
                {/* <div>
                    <label className="block text-lg font-semibold text-gray-700">
                        ID cuộc thi
                    </label>
                    <p className="text-base">{contest.id}</p>
                </div> */}
                <div>
                    <label className="block text-lg font-semibold text-gray-700 flex items-center">
                        <FaCalendarAlt className="mr-2" /> Ngày diễn ra
                    </label>
                    <p className="text-base">
                        {new Date(contest.contestDate).toUTCString()}
                    </p>
                </div>
                <div>
                    <label className="block text-lg font-semibold text-gray-700 flex items-center">
                        <FaUsers className="mr-2" /> Số người chơi tối đa
                    </label>
                    <p className="text-base">{contest.maxPlayer}</p>
                </div>
                {contest.policy && (
                    <div>
                        <label className="block text-lg font-semibold text-gray-700">
                            Chính sách
                        </label>
                        <p className="text-base">{contest.policy}</p>
                    </div>
                )}
                {contest.contestStatus && (
                    <div>
                        <label className="block text-lg font-semibold text-gray-700">
                            Trạng thái cuộc thi
                        </label>
                        <p className="text-base">{contest.contestStatus}</p>
                    </div>
                )}
            </div>
            {contest.userContests && contest.userContests.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-2xl font-semibold mb-4 text-purple-900">
                        Người tham gia cuộc thi
                    </h3>
                    <div className="space-y-4">
                        {contest.userContests.map((userContest, index) => (
                            <div
                                key={userContest.id}
                                className="p-4 bg-white text-gray-900 rounded-lg shadow-md"
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={
                                            userContest.profilePic &&
                                            userContest.profilePic !== ""
                                                ? userContest.profilePic
                                                : "https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"
                                        }
                                        alt={userContest.fullname}
                                        className="w-16 h-16 rounded-full mt-2 mb-4"
                                    />
                                    <p className="font-bold text-gray-800">
                                        {userContest.fullname}
                                    </p>
                                </div>

                                <p className="text-gray-600">
                                    Số điện thoại:{" "}
                                    {userContest.phoneNumber || "N/A"}
                                </p>

                                <p className="text-gray-600 flex items-center">
                                    Người tạo:{" "}
                                    {userContest.isCreatedPerson ? (
                                        <FaCheckCircle className="text-green-500 ml-2" />
                                    ) : (
                                        <FaTimesCircle className="text-red-500 ml-2" />
                                    )}
                                </p>
                                <div className="flex items-center space-x-2">
                                    <label className="text-gray-600">
                                        Là người chiến thắng:
                                    </label>
                                    <input
                                        disabled={disableUpdate}
                                        type="checkbox"
                                        className="form-checkbox"
                                        checked={userContests[index].isWinner}
                                        // onChange={(e) =>
                                        //     handleIsWinnerChange(
                                        //         index,
                                        //         e.target.checked
                                        //     )
                                        // }
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <label className="text-gray-600">
                                        Điểm:
                                    </label>
                                    <input
                                        disabled={
                                            contest.contestStatus === "Closed"
                                        }
                                        type="number"
                                        className="w-20 p-1 border border-gray-300 rounded-lg"
                                        value={userContests[index].point}
                                        onChange={(e) =>
                                            handlePointChange(
                                                index,
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="mt-6 flex justify-end">
                {disableUpdate ? null : (
                    <button
                        className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                        onClick={handleSubmit}
                    >
                        Cập nhật điểm
                    </button>
                )}
            </div>
        </div>
    );
};

export default ContestDetailsItem;
