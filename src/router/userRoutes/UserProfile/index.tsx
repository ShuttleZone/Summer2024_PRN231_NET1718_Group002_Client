import React, {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

import {Link} from "react-router-dom";
import {
    useProfileQuery,
    useUpdateProfileMutation,
} from "@/store/services/accounts/auth.api";

interface UpdateUserProfile {
    fullname: string;
    phoneNumber: string;
    gender: number;
}

function UserProfile() {
    const {data: userProfile, isLoading, isError} = useProfileQuery();
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
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error...</div>;

    return (
        <div className="w-2/3 mx-auto h-fit flex flex-row py-32 bg-slate-100 px-4 my-8">
            <div className="w-2/5 h-fit flex flex-col items-center py-12 border-r-2 border-gray-400">
                <h1 className="text-4xl tracking-widest font-semibold  text-gray-500 mb-28">
                    Profile Setting
                </h1>
                <div className="w-80 h-80 rounded-full border-2 border-slate-600 gap-7">
                    <img
                        className="w-full h-full object-fill rounded-full"
                        src="../public/user.jpg"
                        alt=""
                    />
                </div>
                <button className="w-52 h-16 bg-gradient-to-r from-[#ececef] via-[#5F9053]/30 to-[#0dde10] text-xl rounded-3xl mt-8">
                    Upload New Avatar
                </button>
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl tracking-widest font-semibold  mt-8">
                        {userProfile?.fullname}
                    </h1>
                    <span className="text-xl my-2">@{userProfile?.email}</span>
                </div>
                <div className="grid grid-cols-2 w-full mt-8">
                    <Link
                        className="col-span-1 flex flex-col items-center text-xl font-semibold tracking-wider border-r-2 border-slate-700 hover:text-green-600 transition-colors duration-200"
                        to="/my-reservation"
                    >
                        <span className="text-5xl">
                            {userProfile?.totalReservation}
                        </span>
                        <h1>Reservations</h1>
                    </Link>
                    <Link
                        className="col-span-1 flex flex-col items-center text-xl font-semibold tracking-wider hover:text-green-600 transition-colors duration-200"
                        to=""
                    >
                        <span className="text-5xl">
                            {userProfile?.totalWinContest}
                        </span>
                        <h1>Winning Contests</h1>
                    </Link>
                </div>
            </div>
            <div className="w-3/5 h-fit ">
                <div className="mx-auto p-6 mt-3">
                    <h2
                        className="text-5xl text-gray-500 font-semibold tracking-widest mb-4 flex flex-row gap-10 items-center
                    "
                    >
                        Basic Information
                        <div className="mt-4 flex flex-row gap-10">
                            {!editMode && (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="w-56 text-xl font-semibold tracking-wider bg-gradient-to-r from-[#ececef] via-[#5F9053]/30 to-[#0dde10] hover:text-gray-200 py-2 px-4 hover:bg-green-600 focus:outline-none focus:bg-green-600 transition-colors duration-200 rounded-3xl"
                                >
                                    Edit
                                </button>
                            )}
                            {editMode && (
                                <button
                                    type="submit"
                                    form="userForm"
                                    className="w-56 text-xl font-semibold tracking-wider bg-gradient-to-r from-[#ececef] via-[#5F9053]/30 to-[#0dde10] hover:text-gray-200 py-2 px-4 hover:bg-green-600 focus:outline-none focus:bg-green-600 transition-colors duration-200 rounded-3xl"
                                >
                                    Save
                                </button>
                            )}
                        </div>
                    </h2>

                    <form id="userForm" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="fullName"
                                className="my-4 block text-xl font-semibold tracking-wider text-gray-700"
                            >
                                Full Name
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
                                } rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-xl ${
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
                                className="my-4 block text-xl font-semibold tracking-wider text-gray-700"
                            >
                                Phone Number
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
                                } rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-xl ${
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
                                className="my-4 block text-xl font-semibold tracking-wider text-gray-700"
                            >
                                Gender
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
                                } rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-xl ${
                                    !editMode
                                        ? "bg-gray-300 hover:cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                <option value="0">Male</option>
                                <option value="1">Female</option>
                            </select>
                            {errors.gender && (
                                <p className="text-red-500 text-lg mt-1">
                                    {errors.gender}
                                </p>
                            )}
                        </div>
                    </form>
                    <div className="mt-8 float-right">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    className="bg-gradient-to-r from-[#ececef] via-[#5F9053]/30 to-[#0dde10] h-12 w-52 hover:bg-black hover:text-white"
                                    variant="outline"
                                >
                                    Change Password
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl">
                                        Change your password
                                    </DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click
                                        save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="name"
                                            className="text-right"
                                        >
                                            Old Password
                                        </Label>
                                        <Input
                                            id="name"
                                            defaultValue="Pedro Duarte"
                                            className="col-span-3"
                                            type="password"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="username"
                                            className="text-right"
                                        >
                                            New Password
                                        </Label>
                                        <Input
                                            id="username"
                                            defaultValue="@peduarte"
                                            className="col-span-3"
                                            type="password"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;