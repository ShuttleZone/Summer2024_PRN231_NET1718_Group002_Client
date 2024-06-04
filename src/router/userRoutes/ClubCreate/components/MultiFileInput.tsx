import React, {useState} from "react";

const MultiFileInput: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [fileDragging, setFileDragging] = useState<number | null>(null);
    const [fileDropping, setFileDropping] = useState<number | null>(null);

    const humanFileSize = (size: number): string => {
        const i = Math.floor(Math.log(size) / Math.log(1024));
        return (
            (size / Math.pow(1024, i)).toFixed(2) +
            " " +
            ["B", "kB", "MB", "GB", "TB"][i]
        );
    };

    const removeFile = (index: number): void => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>): void => {
        const index = parseInt(
            e.currentTarget.getAttribute("data-index") || "0",
            10
        );
        setFileDragging(index);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>): void => {
        const targetIndex = parseInt(
            e.currentTarget.getAttribute("data-index") || "0",
            10
        );
        setFileDropping(targetIndex);
    };

    const loadFile = (file: File): string => {
        const blobUrl = URL.createObjectURL(file);
        return blobUrl;
    };

    const addFiles = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files) {
            const fileList = Array.from(event.target.files);
            setFiles([...files, ...fileList]);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Multi-File Input</h2>
            <input
                type="file"
                id="fileInput"
                multiple
                onChange={addFiles}
                className="mb-2"
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
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default MultiFileInput;
