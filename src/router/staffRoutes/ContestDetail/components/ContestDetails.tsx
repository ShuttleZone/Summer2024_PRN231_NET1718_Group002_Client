// src/components/ContestDetails.tsx
import {ContestResponse} from "@/@types/api";
import React from "react";
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
    return (
        <div className="w-full h-full overflow-y-auto p-8 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-xl shadow-lg text-gray-900">
            <h2 className="text-3xl font-bold mb-6 text-center text-purple-900">
                Contest Details
            </h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-lg font-semibold text-gray-700">
                        Contest ID
                    </label>
                    <p className="text-base">{contest.id}</p>
                </div>
                <div>
                    <label className="block text-lg font-semibold text-gray-700 flex items-center">
                        <FaCalendarAlt className="mr-2" /> Contest Date
                    </label>
                    <p className="text-base">
                        {new Date(contest.contestDate).toLocaleDateString()}
                    </p>
                </div>
                <div>
                    <label className="block text-lg font-semibold text-gray-700 flex items-center">
                        <FaUsers className="mr-2" /> Max Players
                    </label>
                    <p className="text-base">{contest.maxPlayer}</p>
                </div>
                {contest.policy && (
                    <div>
                        <label className="block text-lg font-semibold text-gray-700">
                            Policy
                        </label>
                        <p className="text-base">{contest.policy}</p>
                    </div>
                )}
                {contest.contestStatus && (
                    <div>
                        <label className="block text-lg font-semibold text-gray-700">
                            Contest Status
                        </label>
                        <p className="text-base">{contest.contestStatus}</p>
                    </div>
                )}
            </div>
            {contest.userContests && contest.userContests.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-2xl font-semibold mb-4 text-purple-900">
                        User In Contest
                    </h3>
                    <div className="space-y-4">
                        {contest.userContests.map((userContest) => (
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
                                                : "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436189.jpg?w=740&t=st=1719476253~exp=1719476853~hmac=2ae7f6bfedee7b4efd281f2d7fc9af1544afa00ace52a642704e08df5fea52bc"
                                        }
                                        alt={userContest.fullname}
                                        className="w-16 h-16 rounded-full mt-2 mb-4"
                                    />
                                    <p className="font-bold text-gray-800">
                                        {userContest.fullname}
                                    </p>
                                </div>

                                <p className="text-gray-600">
                                    Participants ID:{" "}
                                    {userContest.participantsId}
                                </p>
                                <p className="text-gray-600">
                                    Contest ID: {userContest.contestId}
                                </p>
                                <p className="text-gray-600">
                                    Phone Number:{" "}
                                    {userContest.phoneNumber || "N/A"}
                                </p>
                                <p className="text-gray-600 flex items-center">
                                    Is Created Person:{" "}
                                    {userContest.isCreatedPerson ? (
                                        <FaCheckCircle className="text-green-500 ml-2" />
                                    ) : (
                                        <FaTimesCircle className="text-red-500 ml-2" />
                                    )}
                                </p>
                                <p className="text-gray-600 flex items-center">
                                    Is Winner:{" "}
                                    {userContest.isWinner ? (
                                        <FaCheckCircle className="text-green-500 ml-2" />
                                    ) : (
                                        <FaTimesCircle className="text-red-500 ml-2" />
                                    )}
                                </p>
                                <p className="text-gray-600">
                                    Point: {userContest.point}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContestDetailsItem;
