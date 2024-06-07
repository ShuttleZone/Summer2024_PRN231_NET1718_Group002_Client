import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {useAppDispatch, useAppSelector} from "@/store";
import {selectStageById, setStage} from "@/store/slices/bookingStage.slice";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

function BookingBreadcrumb() {
    const navigate = useNavigate();
    const currentStageId = useAppSelector(
        (state) => state.bookingStage.CurrentStage
    );
    const currentStage = useAppSelector((state) =>
        selectStageById(state.bookingStage, currentStageId)
    );
    const dispatch = useAppDispatch();
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

    return (
        <Breadcrumb className="flex flex-row justify-center items-center my-8">
            <BreadcrumbList className="text-2xl text-black">
                <BreadcrumbItem>
                    <p
                        className={`font-semibold transition-colors duration-200 text-black flex flex-row gap-2 ${currentStageId === 1 ? "hover:cursor-default" : "hover:cursor-pointer"}`}
                        onClick={() => handleClick(1)}
                    >
                        <div
                            className={`w-8 h-8 rounded-full px-3 ${currentStageId === 1 ? "bg-green-600 text-black" : "bg-gray-400"} flex justify-center items-center`}
                        >
                            <span className="text-white text-center">1</span>
                        </div>{" "}
                        Type Of Booking
                    </p>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-gray-400 transition-colors duration-200 hover:text-black scale-150" />
                <BreadcrumbItem>
                    <p
                        className={`font-semibold transition-colors duration-200 text-black flex flex-row gap-2 ${currentStageId === 2 ? "hover:cursor-default" : "hover:cursor-pointer"}`}
                        onClick={() => handleClick(2)}
                    >
                        <div
                            className={`w-8 h-8 rounded-full px-3 ${currentStageId === 2 ? "bg-green-600 text-black" : "bg-gray-400"}  flex justify-center items-center`}
                        >
                            <span className="text-white text-center">2</span>
                        </div>
                        Time & Date
                    </p>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-gray-400 transition-colors duration-200 hover:text-black scale-150" />
                <BreadcrumbItem>
                    <p
                        className={`font-semibold transition-colors duration-200 text-black flex flex-row gap-2 ${currentStageId === 3 ? "hover:cursor-default" : "hover:cursor-pointer"}`}
                        onClick={() => handleClick(3)}
                    >
                        <div
                            className={`w-8 h-8 rounded-full px-3 ${currentStageId === 3 ? "bg-green-600 text-black" : "bg-gray-400"}  flex justify-center items-center`}
                        >
                            <span className="text-white text-center">3</span>
                        </div>
                        Personal Information
                    </p>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-gray-400 transition-colors duration-200 hover:text-black scale-150" />
                <BreadcrumbItem>
                    <p
                        className={`font-semibold transition-colors duration-200 text-black flex flex-row gap-2 ${currentStageId === 4 ? "hover:cursor-default" : "hover:cursor-pointer"}`}
                        onClick={() => handleClick(4)}
                    >
                        <div
                            className={`w-8 h-8 rounded-full px-3 ${currentStageId === 4 ? "bg-green-600 text-black" : "bg-gray-400"}  flex justify-center items-center`}
                        >
                            <span className="text-white text-center">4</span>
                        </div>
                        Order Confirmation & Payment
                    </p>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
export default BookingBreadcrumb;
