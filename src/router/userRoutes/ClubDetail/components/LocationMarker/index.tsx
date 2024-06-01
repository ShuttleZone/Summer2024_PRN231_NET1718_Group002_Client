import {IoLocation} from "react-icons/io5";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface LocationMarkerProps {
    lat: number;
    lng: number;
    text: string;
}

function LocationMarker({text}: LocationMarkerProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <IoLocation size={35} color="white" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default LocationMarker;
