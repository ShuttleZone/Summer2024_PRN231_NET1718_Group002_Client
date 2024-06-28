import {useAppDispatch, useAppSelector} from "@/store";
import {useProfileQuery} from "@/store/services/accounts/auth.api";
import {
    selectStageById,
    setBookingPersonInformation,
    setStage,
} from "@/store/slices/bookingStage.slice";
import {ChangeEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

function PersonalInformation() {
    const dispatch = useAppDispatch();
    const [isSaved, setIsSaved] = useState(false);
    const {data: userInfo} = useProfileQuery();

    const navigate = useNavigate();
    const currentStageId = useAppSelector(
        (state) => state.bookingStage.CurrentStage
    );
    const currentStage = useAppSelector((state) =>
        selectStageById(state.bookingStage, currentStageId)
    );
    const {id} = useParams();
    const bookingLocation = `/clubs/${id}/court-booking`;
    const handleClick = (id: number) => {
        dispatch(setStage(id));
    };
    useEffect(() => {
        if (currentStage?.Path) {
            navigate(bookingLocation + currentStage.Path);
        }
    }, [currentStage, navigate, bookingLocation]);

    const storedFormData = useAppSelector(
        (state) =>
            state.bookingStage.PersonaInformation.BookingPersonInformation
    );

    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        Phone: "",
        Note: "",
    });

    useEffect(() => {
        if (storedFormData && storedFormData.Email) {
            // if email is not empty then it means that the form data is already stored
            setFormData(storedFormData);
        } else if (userInfo) {
            setFormData((prevData) => ({
                ...prevData,
                Name: userInfo.fullname || prevData.Name,
                Email: userInfo.email || prevData.Email,
                Phone: userInfo.phoneNumber || prevData.Phone,
            }));
        }
    }, [storedFormData, userInfo]);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {id, value} = e.currentTarget;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setBookingPersonInformation(formData));
        setIsSaved(true);
        handleClick(4);
    };

    return (
        <div className="mb-16">
            <div className="flex flex-col justify-center items-center py-4 px-16 my-4">
                <h1 className="font-semibold text-2xl">Thông tin cá nhân</h1>
                <p>
                    Đảm bảo thông tin được nhập là chính xác để thuận tiện cho
                    quá trình đặt sân.
                </p>
            </div>

            <form
                className="border-2 border-gray-200 px-8 md:px-16 py-4 md:py-8 rounded-md"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl py-4 border-y-2 border-b-gray-400 font-semibold">
                    Thông tin cá nhân
                </h1>
                <div className="py-2">
                    <label className="block text-xl font-semibold">
                        Họ và tên
                    </label>
                    <input
                        id="Name"
                        className="w-full rounded-md h-10 bg-gray-100 text-gray-600 text-xl my-4 pl-8 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-700"
                        type="text"
                        placeholder="Tên của bạn"
                        aria-label="Name"
                        aria-required="true"
                        value={formData.Name}
                        onChange={handleInputChange}
                        required
                        disabled={isSaved}
                    />
                </div>
                <div className="py-2">
                    <label className="block text-xl font-semibold">Email</label>
                    <input
                        id="Email"
                        className="w-full rounded-md h-10 bg-gray-100 text-gray-600 text-xl my-4 pl-8 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-700"
                        type="email"
                        placeholder="Email của bạn"
                        aria-label="Email"
                        aria-required="true"
                        value={formData.Email}
                        onChange={handleInputChange}
                        required
                        disabled={isSaved}
                    />
                </div>
                <div className="py-2">
                    <label className="block text-xl font-semibold">
                        Số điện thoại
                    </label>
                    <input
                        id="Phone"
                        className="w-full rounded-md h-10 bg-gray-100 text-gray-600 text-xl my-4 pl-8 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-700"
                        type="text"
                        value={formData.Phone}
                        onChange={handleInputChange}
                        pattern="[0-9]{10}"
                        placeholder="Số điện thoại của bạn"
                        aria-label="Phone number"
                        aria-required="true"
                        required
                        disabled={isSaved}
                    />
                    <small className="text-gray-500">Cú pháp: 1234567890</small>
                </div>
                <div className="py-2">
                    <label className="block text-xl font-semibold">
                        Chú thích
                    </label>
                    <textarea
                        id="Note"
                        className="w-full rounded-md h-32 bg-gray-100 text-gray-600 text-xl my-4 pl-8 font-semibold pt-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
                        placeholder="Chú thích của bạn"
                        value={formData.Note}
                        onChange={handleInputChange}
                        aria-label="Notes"
                        disabled={isSaved}
                    />
                </div>
                <div className="py-4 flex justify-center items-center">
                    <button
                        type="submit"
                        className={`w-1/3 transition-colors duration-300 text-white text-xl font-semibold py-2 rounded-3xl focus:outline-none focus:ring-2 ${isSaved ? "bg-slate-500 hover:bg-slate-700 focus:ring-slate-700" : "bg-green-500 hover:bg-green-700 focus:ring-green-700"}`}
                    >
                        {isSaved ? "Đã Lưu" : "Lưu"}
                    </button>
                </div>
            </form>
        </div>
    );
}
export default PersonalInformation;
