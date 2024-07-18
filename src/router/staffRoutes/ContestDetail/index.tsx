import {useGetContestStaffQuery} from "@/store/services/contests/contest.api";
import ContestDetailsItem from "./components/ContestDetailsItem";

const ContestDetail: React.FC = () => {
    const {
        data: contest,
        error,
        isLoading,
    } = useGetContestStaffQuery("851E80B3-C3D3-4F1D-B5D8-462CAB592B84");

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
            <div className="w-full max-w-10xl mx-0 p-0 h-full">
                <div className="bg-white h-full overflow-auto">
                    {isLoading && (
                        <p className="text-center text-gray-700">Loading...</p>
                    )}
                    {error && (
                        <p className="text-center text-red-500">
                            Error loading contest details
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
