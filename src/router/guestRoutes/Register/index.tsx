import RegisterForm from "./RegisterForm";
function RegisterPage() {
    return (
        <div>
            <div className="grid grid-cols-2">
                <div className="image-section">
                    <img
                        alt="Logo"
                        className="img-fluid"
                        src="/assets/images/register-bg.jpg"
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
