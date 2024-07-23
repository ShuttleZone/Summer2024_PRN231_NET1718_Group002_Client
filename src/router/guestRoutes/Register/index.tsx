import RegisterForm from "./RegisterForm";
import RegisteBackground from "@/assets/images/register-bg.jpg";

function RegisterPage() {
    return (
        <div>
            <div className="grid grid-cols-2">
                <div className="image-section">
                    <img
                        alt="Logo"
                        className="img-fluid"
                        src={RegisteBackground}
                    />
                </div>
                <div className="form-section">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
