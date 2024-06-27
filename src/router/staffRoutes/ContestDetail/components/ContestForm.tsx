// src/components/ContestForm.tsx
import {ContestResponse} from "@/@types/api";
import React, {useState} from "react";

const ContestForm: React.FC = () => {
    const [contest, setContest] = useState<ContestResponse>({
        id: "",
        contestDate: new Date(),
        maxPlayer: 0,
        policy: "",
        contestStatus: "",
        userContests: [],
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setContest({...contest, [name]: value});
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Contest Details</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Contest Date</label>
                    <input
                        type="date"
                        name="contestDate"
                        value={contest.contestDate.toISOString().split("T")[0]}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Max Player</label>
                    <input
                        type="number"
                        name="maxPlayer"
                        value={contest.maxPlayer}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Policy</label>
                    <textarea
                        name="policy"
                        value={contest.policy}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Contest Status
                    </label>
                    <input
                        type="text"
                        name="contestStatus"
                        value={contest.contestStatus}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                {/* Add inputs for userContests if needed */}
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ContestForm;
