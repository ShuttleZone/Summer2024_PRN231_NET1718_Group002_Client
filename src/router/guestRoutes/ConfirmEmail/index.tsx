import {useLocation} from "react-router-dom";

function ConfirmEmail() {
    const location = useLocation();
    const {email} = location.state || {};

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
                <img
                    src="src/assets/images/email.jpg"
                    alt="Email Confirmation"
                    className="w-24 h-24 mx-auto mb-4"
                />
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Email Confirmation
                </h2>
                <p className="text-gray-700 mb-6">
                    We have sent an email to{" "}
                    <span className="font-semibold text-gray-900">{email}</span>{" "}
                    to confirm the validity of your email address. After
                    receiving the email, follow the link provided to complete
                    your registration.
                </p>
                {/* <button className="w-full bg-pink-500 text-white py-3 rounded-full shadow-md hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300">
                    Resend Email
                </button> */}
            </div>
        </div>
    );
}

export default ConfirmEmail;
