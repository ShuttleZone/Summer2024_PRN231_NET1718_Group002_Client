import {useLoginMutation} from "@/store/services/accounts/auth.api";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {LoginAccount} from "@/@types/api";
import {useAppDispatch, useAppSelector} from "@/store";
import {useToast} from "@/components/ui/use-toast";
import {Toaster} from "@/components/ui/toaster";
import {clearCallback} from "@/store/slices/callback.slice";
import {jwtDecode} from "jwt-decode";
import {AuthPayload} from "@/store/slices/auth.slice";
import getDefaultRoute from "@/lib/route.util";
import {GOOGLE_OAUTH_URL} from "@/constants/api.constants";

function LoginForm() {
    const initialState: Omit<LoginAccount, ""> = {
        id: "",
        account: "",
        password: "",
        token: "",
        refreshToken: "",
    };
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const [formData, setFormData] =
        useState<Omit<LoginAccount, "">>(initialState);
    const {shouldCallback, callbackRoute} = useAppSelector(
        (state) => state.callback
    );
    const {toast} = useToast();
    const dispatch = useAppDispatch();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await login(formData);
        const refreshToken = result.data?.refreshToken;
        refreshToken && localStorage.setItem("refresh_token", refreshToken);

        if (!result.error) {
            toast({
                variant: "default",
                description: "Đăng nhập thành công",
            });
            const payload = jwtDecode<AuthPayload>(result.data?.token || "");
            shouldCallback
                ? navigate(callbackRoute || "")
                : navigate(getDefaultRoute(payload.role || ""));
            dispatch(clearCallback());
            setFormData(initialState);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } else if ((result.error as any).status == 401)
            toast({
                variant: "destructive",
                description: "Mật khẩu không đúng",
            });
        else {
            toast({
                variant: "destructive",

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                description: `${(result.error as any).data}`,
            });
        }
    };

    const redirectToGgOauth = () => (window.location.href = GOOGLE_OAUTH_URL);

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
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Chào mừng trở lại
                        </h1>
                        <h2 className="text-sm font-normal leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Đăng nhập vào tài khoản của bạn
                        </h2>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <Toaster />
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Email hoặc tên tài khoản
                                </label>
                                <input
                                    value={formData.account}
                                    onChange={(event) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            account: event.target.value,
                                        }))
                                    }
                                    required
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Mật khẩu
                                </label>
                                <input
                                    value={formData.password}
                                    onChange={(event) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            password: event.target.value,
                                        }))
                                    }
                                    required
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="text-gray-500 dark:text-gray-300">
                                            Ghi nhớ tôi
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Quên mật khẩu?
                                </a>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <button
                                        onClick={redirectToGgOauth}
                                        type="button"
                                        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                                    >
                                        <svg
                                            className="w-4 h-4 me-2"
                                            aria-hidden="true"
                                            xmlns="https://www.svgrepo.com/show/475656/google-color.svg"
                                            fill="currentColor"
                                            viewBox="0 0 18 19"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        Đăng nhập bằng google
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Đăng nhập
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Bạn chưa có tài khoản?{" "}
                                <a
                                    href="/register"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Đăng ký ngay
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;
