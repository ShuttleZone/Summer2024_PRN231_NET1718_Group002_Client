import {ChangeEvent} from "react";
import axios from "axios";

const uploadFile = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        await axios.post("https://ourproject.io.vn/api/Media", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    } catch (error) {
        // Handle error
        console.error("Error uploading file", error);
    }
};

const AvatarUpload = () => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            uploadFile(event.target.files[0]);
        }
    };

    return (
        <div className="relative">
            <label
                htmlFor="avatar-upload"
                className="w-44 h-16 border-2 border-black text-black hover:bg-green-500 hover:border-green-300 hover:text-white transition-colors duration-200 text-lg font-semibold rounded-3xl mt-8 cursor-pointer flex items-center justify-center"
            >
                Đổi ảnh đại diện
            </label>
            <input
                id="avatar-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default AvatarUpload;
