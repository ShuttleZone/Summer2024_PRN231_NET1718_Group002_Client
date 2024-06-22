import {useToast} from "@/components/ui/use-toast";
import {useConfirmEmailQuery} from "@/store/services/accounts/auth.api";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function CallbackConfirmEmail() {
    const navigate = useNavigate();
    const {toast} = useToast();
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get("userId") || "";
    const token = queryParams.get("token") || "";
    const {isLoading, error} = useConfirmEmailQuery({
        userId,
        token: decodeURIComponent(token),
    });
    useEffect(() => {
        if (isLoading) {
            // Handle success
        } else if (!error) {
            // Handle success

            navigate("/login", {
                state: {
                    message: "Successfully confirmed email! Login to continue.",
                },
            });
        } else {
            // Handle error
            toast({
                title: "Error",
                description:
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (error as any)?.data?.value || "Unknown error occurred",
                variant: "destructive",
            });
        }
    }, [isLoading, error, toast, navigate]);

    return <div>Confirming...</div>;
}

export default CallbackConfirmEmail;
