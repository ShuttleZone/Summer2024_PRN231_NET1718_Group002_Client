import LoginForm from "./components/LoginForm";

function LoginPage() {
    return (
        <div>
            <div className="grid grid-cols-2">
                <div className="image-section">01</div>
                <div className="form-section">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
