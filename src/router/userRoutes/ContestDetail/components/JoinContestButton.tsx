import {PaymentRequest} from "@/@types/api";
import paymentTypes from "@/constants/payment.constants";
import {useAppSelector} from "@/store";
import {useNavigate} from "react-router-dom";

interface JoinContestButtonProps {
    contestId: string;
    total: number;
}

const JoinContestButton: React.FC<JoinContestButtonProps> = ({
    contestId,
    total,
}) => {
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );

    const handlePayment = async () => {
        const paymentRequest: PaymentRequest = {
            orderInfo: contestId,
            fullName: "",
            orderType: paymentTypes.ORDER_TYPE_JOIN_CONTEST,
            description: `join contest ${contestId}`,
            amount: total,
        };
        if (isAuthenticated) {
            navigate("/payment", {state: paymentRequest});
        } else {
            // dispatch(setCallback("/payment"));
            navigate("/login");
        }
    };

    return (
        <div>
            <button
                onClick={handlePayment}
                className="inline-flex mt-6 items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Tham gia cuộc đấu này
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
