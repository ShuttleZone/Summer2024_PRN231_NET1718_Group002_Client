import {useNavigate} from "react-router-dom";

function BottomButtons() {
    const navigate = useNavigate();
    return (
        <div className="mt-4 grid grid-cols-2 gap-2">
            <button
                type="button"
                className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-4 text-center me-2 mb-2 w-full"
            >
                Thay đổi gói cước
            </button>

            <button
                type="button"
                onClick={() => {
                    navigate("/manager/package-list");
                }}
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
            >
                Xem các gói cước khác
            </button>
        </div>
    );
}

export default BottomButtons;
