import {Button} from "@/components/ui/button";

function Wallet() {
    return (
        <section className="h-full px-20 flex flex-col">
            <div className="text-end">
                <Button className="bg-green-500 text-xl">Nạp tiền</Button>
            </div>
            <div className="flex flex-col justify-center items-center h-full">
                <h2 className="text-[2rem] font-semibold">Số dư ví:</h2>
                <p className="text-[2.5rem]">100.000.000 vnd</p>
            </div>
        </section>
    );
}

export default Wallet;
