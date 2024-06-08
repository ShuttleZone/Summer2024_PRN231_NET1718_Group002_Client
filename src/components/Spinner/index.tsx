import {useAppSelector} from "@/store";
import {motion} from "framer-motion";

function Spinner() {
    const showSpinner = useAppSelector((state) => state.spinner.loading);

    return (
        showSpinner && (
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.3}}
                className="absolute bg-white/50 h-screen w-screen flex flex-col gap-4 justify-center items-center"
            >
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-700"></div>
                <span className="text-2xl text-green-700">Loading...</span>
            </motion.div>
        )
    );
}

export default Spinner;
