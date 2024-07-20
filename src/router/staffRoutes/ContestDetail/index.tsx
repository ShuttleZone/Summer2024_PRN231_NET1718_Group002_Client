import {useGetContestStaffQuery} from "@/store/services/contests/contest.api";
import ContestDetailsItem from "./components/ContestDetailsItem";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";

const ContestDetail: React.FC = () => {
    const {id} = useParams();
    const {
        data: contest,
        error,
        isLoading,
    } = useGetContestStaffQuery(id??skipToken);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
            <div className="w-full max-w-10xl mx-0 p-0 h-full">
                <div className="bg-white h-full overflow-auto">
                    {isLoading && (
                        <p className="text-center text-gray-700">Đang tải.</p>
                    )}
                    {error && (
                        <p className="text-center text-red-500">
                           Lỗi trong lúc tải dữ liệu
                        </p>
                    )}
                    {contest && (
                        <ContestDetailsItem
                            contest={contest}
                            key={contest.id}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
export default ContestDetail;
