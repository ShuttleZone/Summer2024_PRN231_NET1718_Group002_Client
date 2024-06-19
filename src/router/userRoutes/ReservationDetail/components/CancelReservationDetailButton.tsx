import {useToast} from "@/components/ui/use-toast";
import {useCancelReservationDetailMutation} from "@/store/services/reservations/reservation.api";

interface CancelReservationDetailButtonProps {
    reservationDetailId: string;
}

const CancelReservationDetailButton: React.FC<
    CancelReservationDetailButtonProps
> = ({reservationDetailId}) => {
    const [cancelReservationDetail, {isLoading}] =
        useCancelReservationDetailMutation();
    const {toast} = useToast();

    const handleCancelReservationDetail = async () => {
        try {
            await cancelReservationDetail({reservationDetailId}).unwrap();
            toast({
                title: "Success",
                description: "Successfully cancel reservation!",
                variant: "default",
            });
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
            onClick={handleCancelReservationDetail}
            disabled={isLoading}
            className="text-red-500"
        >
            {isLoading ? "Canceling..." : "Cancel"}
        </button>
    );
};

export default CancelReservationDetailButton;
