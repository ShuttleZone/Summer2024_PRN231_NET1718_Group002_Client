import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface Props {
    icon: React.ReactNode;
    text: string;
    className?: string;
}

function ButtonWithIcon({icon, text, className = ""}: Props) {
    return (
        <Button
            className={cn(
                "bg-[#0a7e53] flex justify-between items-center gap-1",
                className
            )}
        >
            {icon}
            <span>{text}</span>
        </Button>
    );
}

export default ButtonWithIcon;
