import {Button} from "@/components/ui/button";

interface Props {
    icon: React.ReactNode;
    text: string;
}

function ButtonWithIcon({icon, text}: Props) {
    return (
        <Button className="bg-[#0a7e53] flex justify-between items-center gap-1">
            {icon}
            <span>{text}</span>
        </Button>
    );
}

export default ButtonWithIcon;
