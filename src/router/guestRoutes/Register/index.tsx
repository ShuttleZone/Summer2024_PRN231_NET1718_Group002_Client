import RegisterForm from "./RegisterForm";
function RegisterPage() {
    return (
        <div>
            <div className="grid grid-cols-2">
                <div className="image-section">01</div>
                <div className="form-section">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
