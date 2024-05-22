import {cn} from "@/lib/utils";

interface TagProps {
    text: string;
    className?: string;
}

function Tag({text, className}: TagProps) {
    return (
        <div className={cn("px-2 py-1 bg-blue-300 rounded-md", className)}>
            <p>{text}</p>
        </div>
    );
}

export default Tag;
