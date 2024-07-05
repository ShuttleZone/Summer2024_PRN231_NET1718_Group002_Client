import React, {useState, useEffect} from "react";

import {Link} from "react-router-dom";
import {
    useProfileQuery,
    useUpdateProfileMutation,
} from "@/store/services/accounts/auth.api";
import {toast} from "@/components/ui/use-toast";
import {hideSpinner, showSpinner} from "@/store/slices/spinner.slice";
import {useAppDispatch} from "@/store";
import ChangePassword from "./components/ChangePassword.tsx";
import formatVietnameseDong from "@/lib/currency.util.ts";
// import {Button} from "@/components/ui/button.tsx";

interface UpdateUserProfile {
    fullname: string;
    phoneNumber: string;
    gender: number;
}

function UserProfile() {
    const {data: userProfile, isLoading, isError} = useProfileQuery();
    const dispatch = useAppDispatch();
    const [updateProfile] = useUpdateProfileMutation();
    const [formData, setFormData] = useState<UpdateUserProfile>({
        fullname: "",
        phoneNumber: "",
        gender: 0,
    });
    const [editMode, setEditMode] = useState(false);
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    useEffect(() => {
        if (userProfile) {
            setFormData({
                fullname: userProfile.fullname || "",
                phoneNumber: userProfile.phoneNumber || "",
                gender: userProfile.gender,
            });
        }
    }, [userProfile]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formErrors: {[key: string]: string} = {};
        if (!formData.fullname || formData.fullname.length < 3) {
            formErrors["fullName"] =
                "Full name must be at least 3 characters long";
        }
        if (!formData.phoneNumber || !formData.phoneNumber.match(/^\d{10}$/)) {
            formErrors["phone"] = "Phone number must be 10 digits";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        try {
            await updateProfile(formData);
            console.log("Profile updated successfully");
            setEditMode(false);
            setErrors({});
            toast({
                title: "Success",
                description: "Update successfully",
                variant: "default",
            });
        } catch (error) {
            toast({
                title: "failed",
                description: "Update Failed",
                variant: "default",
            });
        }
    };

    isLoading ? dispatch(showSpinner()) : dispatch(hideSpinner());

    if (isError) return <div>Error...</div>;

    return (
        <div className="w-2/3 mx-auto h-screen flex flex-row py-8">
            <div className="w-2/5 h-fit flex flex-col items-center py-12 border-r-2 border-gray-400">
                <h1 className="text-2xl tracking-widest font-semibold  text-gray-500 mb-28">
                    Cài đặt thông tin
                </h1>
                <div className="w-80 h-80 rounded-full border-2 border-slate-600 gap-7">
                    <img
                        className="w-full h-full object-fill rounded-full"
                        src={
                            userProfile?.profileImage !== ""
                                ? userProfile?.profileImage
                                : "/public/user.jpg"
                        }
                        alt=""
                    />
                </div>
                <div className="relative">
                    <label
                        htmlFor="avatar-upload"
                        className="w-44 h-16 border-2 border-black text-black hover:bg-green-500 hover:border-green-300 hover:text-white transition-colors duration-200 text-lg font-semibold rounded-3xl mt-8 cursor-pointer flex items-center justify-center"
                    >
                        Đổi ảnh đại diện
                    </label>
                    <input id="avatar-upload" type="file" className="hidden" />
                </div>

                <div className="flex flex-col items-center">
                    <h1 className="text-xl tracking-widest font-semibold  mt-8">
                        {userProfile?.fullname}
                    </h1>
                    <span className="text-lg my-2">@{userProfile?.email}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-lg my-2">
                        Số dư:{" "}
                        {formatVietnameseDong(userProfile?.balance ?? 0, "VND")}{" "}
                        VND
                    </span>
                </div>
                <div className="grid grid-cols-2 w-full mt-8">
                    <Link
                        className="col-span-1 flex flex-col items-center text-lg font-semibold tracking-wider border-r-2 border-slate-700 hover:text-green-600 transition-colors duration-200"
                        to="/my-invoices"
                    >
                        <span className="text-3xl">
                            {userProfile?.totalReservation}
                        </span>
                        <h1>Số lần đặt lịch</h1>
                    </Link>
                    <Link
                        className="col-span-1 flex flex-col items-center text-lg font-semibold tracking-wider hover:text-green-600 transition-colors duration-200"
                        to=""
                    >
                        <span className="text-3xl">
                            {userProfile?.totalWinContest}
                        </span>
                        <h1>Số lần thắng cuộc thi</h1>
                    </Link>
                </div>
            </div>
            <div className="w-3/5 h-fit ">
                <div className="mx-auto p-6 mt-3">
                    <h2
                        className="text-3xl text-gray-500 font-semibold tracking-widest mb-4 flex flex-row gap-10 items-center justify-between
                    "
                    >
                        Thông tin cá nhân
                        <div className="mt-4 flex flex-row gap-10">
                            {!editMode && (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="w-28 text-lg font-semibold tracking-wider border-2 border-black rounded-md cursor-pointer text-black hover:bg-green-500 hover:border-green-300 hover:text-white transition-colors duration-200"
                                >
                                    Chỉnh sửa
                                </button>
                            )}
                            {editMode && (
                                <button
                                    type="submit"
                                    form="userForm"
                                    className="w-28 text-lg font-semibold tracking-wider border-2 border-black rounded-md cursor-pointer text-black hover:bg-green-500 hover:border-green-300 hover:text-white transition-colors duration-200"
                                >
                                    Lưu
                                </button>
                            )}
                        </div>
                    </h2>

                    <form id="userForm" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="fullName"
                                className="my-4 block text-lg font-semibold tracking-wider text-gray-700"
                            >
                                Họ và tên
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullname"
                                placeholder="Enter your full name"
                                value={formData.fullname}
                                onChange={handleChange}
                                disabled={!editMode}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.fullName
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-lg ${
                                    !editMode
                                        ? "bg-gray-300 hover:cursor-not-allowed"
                                        : ""
                                }`}
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-lg mt-1">
                                    {errors.fullName}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="phone"
                                className="my-4 block text-lg font-semibold tracking-wider text-gray-700"
                            >
                                Số điện thoại
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phoneNumber"
                                placeholder="Enter your phone number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                disabled={!editMode}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.phone
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-lg ${
                                    !editMode
                                        ? "bg-gray-300 hover:cursor-not-allowed"
                                        : ""
                                }`}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-lg mt-1">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="gender"
                                className="my-4 block text-lg font-semibold tracking-wider text-gray-700"
                            >
                                Giới tính
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender.toString()}
                                onChange={handleChange}
                                disabled={!editMode}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.gender
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-lg ${
                                    !editMode
                                        ? "bg-gray-300 hover:cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                <option value="0">Nam</option>
                                <option value="1">Nữ</option>
                            </select>
                            {errors.gender && (
                                <p className="text-red-500 text-lg mt-1">
                                    {errors.gender}
                                </p>
                            )}
                        </div>
                    </form>
                    <div className="mt-8 float-right">
                        <ChangePassword />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
