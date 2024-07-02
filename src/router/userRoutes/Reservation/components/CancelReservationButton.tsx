import {useToast} from "@/components/ui/use-toast";
import {useCancelReservationMutation} from "@/store/services/reservations/reservation.api";

interface CancelReservationButtonProps {
    reservationId: string;
    refresh?: () => void;
}

const CancelReservationButton: React.FC<CancelReservationButtonProps> = ({
    reservationId,
    refresh,
}) => {
    const [cancelReservation, {isLoading}] = useCancelReservationMutation();
    const {toast} = useToast();

    const handleCancelReservation = async () => {
        try {
            await cancelReservation({reservationId}).unwrap();
            toast({
                title: "Success",
                description: "Successfully cancel reservation!",
                variant: "default",
            });
            refresh && refresh();
        } catch (err) {
            toast({
                title: "Error",
                description:
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (err as any)?.data?.value || "Unknown error occurred",
                variant: "destructive",
            });
        }
    };

    return (
        <button
            onClick={handleCancelReservation}
            disabled={isLoading}
            className="text-red-500"
        >
            {isLoading ? "Canceling..." : "Cancel"}
        </button>
    );
};

export default CancelReservationButton;
