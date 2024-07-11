import {FormChildProps} from "@/router/managerRoutes/CreateClub";
import React, {useEffect, useState} from "react";

function MultiFileInput({form}: FormChildProps) {
    const [files, setFiles] = useState<File[]>([]);

    const removeFile = (index: number): void => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    const addFiles = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files) {
            const fileList = Array.from(event.target.files);
            // Filter only image files
            const imageFiles = fileList.filter((file) =>
                file.type.startsWith("image/")
            );
            setFiles([...files, ...imageFiles]);
        }
    };

    useEffect(() => {
        form.setValue("clubGallery", files);
    }, [form, files]);

    return (
        <div className="p-4 w-full border rounded-lg shadow-md">
            <label
                htmlFor="fileInput"
                className="text-lg font-semibold cursor-pointer"
            >
                Thêm hình ảnh
            </label>
            <input
                type="file"
                id="fileInput"
                multiple
                accept="image/*"
                onChange={addFiles}
                className="mb-2 hidden"
            />
            <div className="space-y-2">
                {files.map((file, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-2 border rounded-md my-4"
                    >
                        <span>{file.name}</span>
                        <div></div>
                        <button
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Xóa
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MultiFileInput;
