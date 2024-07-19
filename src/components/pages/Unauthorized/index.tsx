import {useNavigate} from "react-router-dom";

function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-red-400">
            <div className="text-center p-8">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-gray-700">403</h1>
                    <p className="text-lg text-gray-700 mt-4">
                        Bạn không có quyền truy cập vào trang này
                    </p>
                </div>
                <div className="flex flex-col justify-between items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-6 px-32 py-3 bg-white text-black rounded-full hover:text-white hover:bg-black trnasition duration-300"
                    >
                        Back
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-6 px-32 py-3 bg-white text-black rounded-full hover:text-white hover:bg-black trnasition duration-300"
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Unauthorized;
