import {useAppSelector} from "@/store";

function Spinner() {
    const showSpinner = useAppSelector((state) => state.spinner.loading);

    return (
        showSpinner && (
            <div className="absolute bg-white/50 h-screen w-screen flex flex-col gap-4 justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-700"></div>
                <span className="text-2xl text-green-700">Loading...</span>
            </div>
        )
    );
}

export default Spinner;
