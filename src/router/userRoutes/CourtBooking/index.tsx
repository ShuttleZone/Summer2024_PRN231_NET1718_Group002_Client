import {Outlet} from "react-router-dom";
import BookingBreadcrumb from "./components/BookingBreadcrumb";
import {useAppSelector} from "@/store";
// import {Button} from "@/components/ui/button";
// import {FaArrowCircleRight} from "react-icons/fa";
// import {FaArrowCircleLeft} from "react-icons/fa";
function CourtBooking() {
    const club = useAppSelector((state) => state.bookingStage.ClubDetail);
    return (
        <div className="w-3/4 flex flex-col justify-center mx-auto pb-12">
            <div className="text-3xl text-black-300 bg-gradient-to-r from-slate-300 to-slate-500 h-24 text-center flex flex-col items-center justify-center font-semibold tracking-widest">
                <h1>{club.clubName}</h1>
            </div>
            <BookingBreadcrumb />
            <Outlet />
            {/* <div className="flex flex-row justify-center gap-5">
                <Button className="w-36 text-2xl py-8 bg-slate-400 rounded-2xl text-center">
                    <FaArrowCircleLeft className="mx-2" />
                    Back
                </Button>
                <Button className="w-36 text-2xl py-8 bg-slate-400 rounded-2xl text-center">
                    Next <FaArrowCircleRight className="mx-2" />
                </Button>
            </div> */}
        </div>
    );
}
export default CourtBooking;
