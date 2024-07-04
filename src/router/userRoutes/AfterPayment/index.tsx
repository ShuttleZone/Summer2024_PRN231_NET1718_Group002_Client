import {useLocation} from "react-router-dom";
import PaymentResult from "../Payment/components/PaymentResult";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function AfterPayment() {
    const query = useQuery();
    const isSuccess = query.get("isSuccess") === "true";
    const amount = parseInt(query.get("amount") || "0", 10);
    console.log(isSuccess, amount);
    return (
        <div className="my-32">
            <PaymentResult isSuccess={isSuccess} amount={amount} />
        </div>
    );
}
export default AfterPayment;
