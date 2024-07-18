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
                title: "Thành công",
                description: "Hủy đặt chỗ thành công!",
                variant: "default",
            });
        } catch (err) {
            toast({
                title: "Có lỗi rồi",
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
            {isLoading ? "Đang hủy..." : "Hủy"}
        </button>
    );
};

export default CancelReservationDetailButton;
