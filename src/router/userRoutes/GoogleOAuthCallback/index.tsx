import ContentSpinner from "@/components/ContentSpinner";
import {useToast} from "@/components/ui/use-toast";
import {useAppSelector} from "@/store";
import {useLoginWithGoogleMutation} from "@/store/services/accounts/auth.api";
import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

const GoogleOAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const [login] = useLoginWithGoogleMutation();
    const {toast} = useToast();
    const navigate = useNavigate();
    const callbackRoute = useAppSelector(
        (state) => state.callback.callbackRoute
    );

    useEffect(() => {
        const loginWithGoogle = async (code: string) => {
            const response = await login({code});
            if (response.error) {
                toast({
                    title: "Đăng nhập thất bại",
                    description: "Đã có lỗi xảy ra",
                    variant: "destructive",
                });
                navigate("/login");
            } else {
                toast({
                    title: "Đăng nhập thành công",
                    description: "Chào mừng bạn quay trở lại",
                });
                navigate(callbackRoute || "/");
            }
        };

        const code = searchParams.get("code");
        const error = searchParams.get("error");
        if (error) {
            let errrorMessage = "Đã có lỗi xảy ra";
            if (error === "access_denied")
                errrorMessage = "Bạn đã từ chối đăng nhập";
            toast({
                title: "Đăng nhập thất bại",
                description: errrorMessage,
                variant: "destructive",
            });
            navigate("/login");
            return;
        }
        if (code) loginWithGoogle(code);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="w-full h-full flex justify-center items-center">
            <ContentSpinner />
        </div>
    );
};

export default GoogleOAuthCallback;
