import {CiLocationOn} from "react-icons/ci";
import {FaStar} from "react-icons/fa";
import {FiPhoneCall} from "react-icons/fi";
import {Link} from "react-router-dom";
import ShareButton from "./components/ShareButton";

interface ClubHeaderProps {
    name: string;
    address: string;
    phone: string;
    reviewsCount: number;
    rating: number;
}

function ClubHeader({
    name,
    address,
    phone,
    reviewsCount,
    rating,
}: ClubHeaderProps) {
    return (
        <div className="flex justify-between items-end border border-black/10 rounded p-4 gap-12">
            <div className="flex flex-col gap-3">
                <h1 className="text-[2rem] font-bold">{name}</h1>
                <div className="flex items-center gap-4 text-sm opacity-60">
                    <div className="flex items-center gap-1">
                        <CiLocationOn />
                        <span>{address}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FiPhoneCall />
                        <span>{phone}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center gap-6">
                <Link
                    to={"court-booking"}
                    className="flex justify-between items-center gap-2 border border-black/10 rounded px-12 text-nowrap py-1 bg-green-300 hover:bg-green-500"
                >
                    Đặt sân
                </Link>
                <ShareButton />
                <div className="flex gap-4 items-center">
                    <span className="rounded-full p-2 bg-green-600 text-white text-xl font-semibold">
                        {rating.toFixed(1)}
                    </span>
                    <div className="text-nowrap">
                        <ul className="flex">
                            {Array.from({length: rating}).map((_, index) => (
                                <li key={index}>
                                    <FaStar color="yellow" />
                                </li>
                            ))}
                        </ul>
                        <span>{reviewsCount} đánh giá</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClubHeader;
