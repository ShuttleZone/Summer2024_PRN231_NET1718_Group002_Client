import {useState} from "react";
import {PiCourtBasketball} from "react-icons/pi";

interface CourtCardProps {
    courtName: string;
    isSelectable: boolean;
    onSelect: () => void;
}

function CourtCard({courtName, onSelect, isSelectable}: CourtCardProps) {
    const [isSelected, setIsSelected] = useState<boolean>(false);

    const handleClick = () => {
        if (!isSelectable) return;
        setIsSelected((prev) => !prev);
        onSelect();
    };

    return (
        <div
            onClick={handleClick}
            className={`flex flex-col justify-center items-center gap-4 ${isSelected ? "bg-green-300" : "bg-gray-300"} rounded aspect-video cursor-pointer hover:scale-105 shadow-md hover:shadow-gray-300 transition-all`}
        >
            <PiCourtBasketball className="text-5xl text-green-700" />
            <span className="text-xl text-black">{courtName}</span>
        </div>
    );
}

export default CourtCard;
