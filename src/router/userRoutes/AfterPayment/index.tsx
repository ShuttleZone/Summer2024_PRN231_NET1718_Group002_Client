import {useLocation} from "react-router-dom";
import PaymentResult from "../Payment/components/PaymentResult";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function AfterPayment() {
    const query = useQuery();
    const isSuccess =
        query.get("isSuccess") === "true" ||
        query.get("vnp_ResponseCode") === "00";
    const amount = parseInt(
        query.get("amount") || query.get("vnp_Amount") || "0",
        10
    );

    return (
        <div className="my-32">
            <PaymentResult isSuccess={isSuccess} amount={amount} />
        </div>
    );
}
export default AfterPayment;
