import {useGetCourtByClubQuery} from "@/store/services/courts/court.api";
import BookingStep from "../BookingStep";
import CourtCard from "../CourtCard";
import {skipToken} from "@reduxjs/toolkit/query";

interface SelectCourtsStepProps {
    currentStep: number;
    shouldContinue: boolean;
    onGoToNextStep: () => void;
    onGoBack: () => void;
    onCourtSelect: (courtId: string) => void;
    clubId?: string;
}

function SelectCourtsStep({
    currentStep,
    shouldContinue,
    onGoToNextStep,
    onGoBack,
    onCourtSelect,
    clubId,
}: SelectCourtsStepProps) {
    const {data: courts} = useGetCourtByClubQuery(clubId ?? skipToken);

    return (
        <BookingStep
            title={"Chọn sân"}
            step={0}
            shouldContinue={shouldContinue}
            currentStep={currentStep}
            onGoToNextStep={onGoToNextStep}
            onGoBack={onGoBack}
        >
            <ul className="grid grid-cols-12 gap-4 py-4">
                {courts?.map((court) => (
                    <li className="col-span-2" key={court.id}>
                        <CourtCard
                            courtName={court.name}
                            isSelectable={currentStep === 0}
                            onSelect={() => onCourtSelect(court.id)}
                        />
                    </li>
                ))}
            </ul>
        </BookingStep>
    );
}

export default SelectCourtsStep;
