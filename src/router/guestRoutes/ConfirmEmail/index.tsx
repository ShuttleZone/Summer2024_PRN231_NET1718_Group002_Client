import {useLocation} from "react-router-dom";

function ConfirmEmail() {
    const location = useLocation();
    const {email} = location.state || {};

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
                <img
                    src="src/assets/images/email.jpg"
                    alt="Xác Nhận Email"
                    className="w-24 h-24 mx-auto mb-4"
                />
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Xác Nhận Email
                </h2>
                <p className="text-gray-700 mb-6">
                    Chúng tôi đã gửi một email đến{" "}
                    <span className="font-semibold text-gray-900">{email}</span>{" "}
                    để xác nhận tính hợp lệ của địa chỉ email của bạn. Sau khi
                    nhận được email, hãy làm theo liên kết được cung cấp để hoàn
                    tất việc đăng ký của bạn.
                </p>
            </div>
        </div>
    );
}

export default ConfirmEmail;
