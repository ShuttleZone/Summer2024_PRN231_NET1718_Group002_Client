import {useToast} from "@/components/ui/use-toast";
import {useJoinContestMutation} from "@/store/services/contests/contest.api";

interface JoinContestButtonProps {
    contestId: string;
}

const JoinContestButton: React.FC<JoinContestButtonProps> = ({contestId}) => {
    const [joinContest, {isLoading}] = useJoinContestMutation();
    const {toast} = useToast();

    const handleJoinContest = async () => {
        try {
            await joinContest({contestId}).unwrap();
            toast({
                title: "Success",
                description: "Successfully joined the contest!",
                variant: "default",
            });
        } catch (err) {
            toast({
                title: "Error",
                description: err?.data?.value || "Unknown error occurred",
                variant: "destructive",
            });
        }
    };

    return (
        <div>
            <button
                onClick={handleJoinContest}
                disabled={isLoading}
                className="inline-flex mt-6 items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {isLoading ? "Joining..." : "Join Contest"}
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
            </button>
        </div>
    );
};

export default JoinContestButton;
