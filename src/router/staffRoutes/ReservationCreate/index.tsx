import {useEffect, useState} from "react";
import {useGetMyWorkingClubQuery} from "@/store/services/clubs/club.api";
import SelectCourtsStep from "./components/SelectCourtsStep";
import SelectSlotsStep from "./components/SelectSlotsStep";
import SelectCustomerStep from "./components/SelectCustomerStep";
import ConfirmReservationStep from "./components/ConfirmReservationStep";
import {useAppDispatch} from "@/store";
import {clearBookingSlots} from "@/store/slices/bookingStage.slice";

export interface BookedSlot {
    CourtName: string;
    Date: string;
    EndTime: string;
    StartTime: string;
    Price: number;
    CourtId: string;
}

interface UserInfo {
    fullname: string;
    phoneNumber: string;
}

function ReservationCreate() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [selectedCourts, setSelectedCourts] = useState<string[]>([]);
    const [selectedSlots, setSelectedSlots] = useState<BookedSlot[]>([]);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const {data: club} = useGetMyWorkingClubQuery();
    const dispatch = useAppDispatch();

    const handleSelectCourt = (courtId: string) => {
        const courtSelected = selectedCourts.includes(courtId);
        courtSelected
            ? setSelectedCourts((prev) =>
                  prev.filter((court) => court !== courtId)
              )
            : setSelectedCourts((prev) => [...prev, courtId]);
    };

    const handleBookSlot = (bookedSlot: BookedSlot) => {
        const slotSelected = selectedSlots.some(
            (slot) =>
                slot.CourtName === bookedSlot.CourtName &&
                slot.Date === bookedSlot.Date &&
                slot.StartTime === bookedSlot.StartTime &&
                slot.EndTime === bookedSlot.EndTime
        );
        slotSelected
            ? setSelectedSlots((prev) =>
                  prev.filter(
                      (slot) =>
                          slot.CourtName !== bookedSlot.CourtName ||
                          slot.Date !== bookedSlot.Date ||
                          slot.StartTime !== bookedSlot.StartTime ||
                          slot.EndTime !== bookedSlot.EndTime
                  )
              )
            : setSelectedSlots((prev) => [...prev, bookedSlot]);
    };

    const handleSelectUser = (fullname: string, phoneNumber: string) => {
        setUserInfo({fullname, phoneNumber});
    };

    const handleGoToNextStep = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const handleGoToPreviousStep = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const getTotalPrice = () => {
        return selectedSlots.reduce((acc, slot) => acc + slot.Price, 0);
    };

    useEffect(() => {
        return () => {
            dispatch(clearBookingSlots());
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section>
            <SelectCourtsStep
                currentStep={currentStep}
                shouldContinue={selectedCourts.length > 0}
                onGoToNextStep={handleGoToNextStep}
                onGoBack={handleGoToPreviousStep}
                onCourtSelect={handleSelectCourt}
                clubId={club?.Id}
            />
            <SelectSlotsStep
                currentStep={currentStep}
                shouldContinue={selectedSlots.length > 0}
                clubId={club?.Id}
                onGoToNextStep={handleGoToNextStep}
                onGoBack={handleGoToPreviousStep}
                selectedDate={selectedDate}
                onSetSelectedDate={setSelectedDate}
                onBookSlot={handleBookSlot}
                targettedCourts={selectedCourts}
            />
            <SelectCustomerStep
                currentStep={currentStep}
                shouldContinue={
                    !!userInfo &&
                    !!userInfo.fullname &&
                    !!userInfo.phoneNumber &&
                    userInfo.phoneNumber.length === 10
                }
                onGoToNextStep={handleGoToNextStep}
                onGoBack={handleGoToPreviousStep}
                onSelectUser={handleSelectUser}
            />
            <ConfirmReservationStep
                currentStep={currentStep}
                phoneNumber={userInfo?.phoneNumber || ""}
                name={userInfo?.fullname || ""}
                slotsCount={selectedSlots.length}
                selectedSlots={selectedSlots}
                totalPrice={getTotalPrice()}
                clubPhone={club?.ClubPhone || ""}
                clubAddress={club?.ClubAddress || ""}
                clubName={club?.ClubName || ""}
                onGoBack={handleGoToPreviousStep}
            />
        </section>
    );
}

export default ReservationCreate;
