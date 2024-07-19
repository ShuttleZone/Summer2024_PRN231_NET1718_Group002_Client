import {useLocation} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import {useToast} from "@/components/ui/use-toast";
import {useEffect} from "react";
import RegisterBackground from "@/assets/images/register-bg.jpg";

function LoginPage() {
    const location = useLocation();
    const {message} = location.state || {};
    const {toast} = useToast();
    useEffect(() => {
        if (message) {
            toast({
                title: "Success",
                description: message,
                variant: "default",
            });
        }
    }, [message, toast]);

    return (
        <div>
            <div className="grid grid-cols-2">
                <div className="image-section">
                    <img
                        alt="Logo"
                        className="img-fluid"
                        src={RegisterBackground}
                    />
                </div>
                <div className="form-section">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
