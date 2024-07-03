import {useGetMyWalletQuery} from "@/store/services/reservations/payment.api";
import DepositPopup from "./components/DepositPopup";
import formatVietnameseDong from "@/lib/currency.util";

function Wallet() {
    const {data: myWallet} = useGetMyWalletQuery();

    return (
        <section className="h-full px-20 flex flex-col">
            <div className="text-end">
                {/* Should handle the case that wallet can't be loaded */}
                <DepositPopup walletId={myWallet?.id || "unknown"} />
            </div>
            <div className="flex flex-col justify-center items-center h-full">
                <h2 className="text-[3.5rem] font-semibold">Số dư ví:</h2>
                <p className="text-[4rem]">
                    {formatVietnameseDong(myWallet?.balance || 0, "vnd")} vnd
                </p>
            </div>
        </section>
    );
}

export default Wallet;
