import {RegisterAccount} from "@/@types/api";
import {useRegisterMutation} from "@/store/services/accounts/auth.api";
import {useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import React, {useState} from "react";

function RegisterForm() {
    const initialState: Omit<RegisterAccount, ""> = {
        fullname: "",
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        repassword: "",
        token: "",
    };

    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        if (formData.repassword.match(formData.password)) {
            toast.error("Password is not match !");
        }
        event.preventDefault();
        const result = await register(formData);
        console.log(result.error);
        if (result.data != null) {
            toast.success("Register successfully ! Please proceed to login ");
            setTimeout(() => {
                navigate("/login");
            }, 5000); //
        } else {
            if (!result.error.data.description) {
                toast.error(`${result.error.data}`);
            } else {
                toast.error(`${result.error.data.description}`);
            }
        }
    };

    const [formData, setFormData] =
        useState<Omit<RegisterAccount, "">>(initialState);

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="/"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <img
                        className="w-8 h-8 mr-2"
                        src="src/assets/images/apple-touch-icon-120x120.png"
                        alt="logo"
                    />
                    Shuttle Zone
                    <ToastContainer />
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Get Started With Shuttle Zone
                        </h1>
                        <p className="text-sm font-normal leading-tight tracking-tight text-gray-900 md:text-sm dark:text-white">
                            Ignite your sports journey with Shuttle Zone and get
                            started now.
                        </p>
                        <form
                            className="max-w-sm mx-auto"
                            onSubmit={handleSubmit}
                        >
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your Email
                            </label>
                            <div className="mb-5">
                                <div className="flex">
                                    <div className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                        <svg
                                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 16"
                                        >
                                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                        </svg>
                                    </div>
                                    <input
                                        value={formData.email}
                                        onChange={(event) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                email: event.target.value,
                                            }))
                                        }
                                        type="text"
                                        required
                                        id="email-address-icon"
                                        className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your username
                                </label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                    <input
                                        value={formData.username}
                                        onChange={(event) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                username: event.target.value,
                                            }))
                                        }
                                        type="text"
                                        required
                                        id="website-admin"
                                        className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="bonniegreen"
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your fullname
                                </label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                    <input
                                        value={formData.fullname}
                                        onChange={(event) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                fullname: event.target.value,
                                            }))
                                        }
                                        type="text"
                                        required
                                        className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Bonnie Green"
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your phone number
                                </label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                    <input
                                        value={formData.phoneNumber}
                                        onChange={(event) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                phoneNumber: event.target.value,
                                            }))
                                        }
                                        type="text"
                                        required
                                        className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="0123456789"
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your password
                                </label>
                                <input
                                    value={formData.password}
                                    onChange={(event) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            password: event.target.value,
                                        }))
                                    }
                                    type="password"
                                    id="password"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Repeat password
                                </label>
                                <input
                                    type="password"
                                    id="repeat-password"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                            </div>
                            <div className="flex items-start mb-5">
                                <div className="flex items-center h-5">
                                    <input
                                        value={formData.repassword}
                                        onChange={(event) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                repassword: event.target.value,
                                            }))
                                        }
                                        id="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                        required
                                    />
                                </div>
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    I agree with the{" "}
                                    <a
                                        href="#"
                                        className="text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        terms and conditions
                                    </a>
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Register new account
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
                                Have an account ? {""}
                                <a
                                    href="/login"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Sign in
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegisterForm;
