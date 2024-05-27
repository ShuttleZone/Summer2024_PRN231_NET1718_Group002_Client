import formatTime from "@/lib/time.util";
import {ClubImageType, ReviewType} from "../..";
import Tag from "../Tag";
import {CiLocationOn} from "react-icons/ci";
import {MdOutlineShoppingBag} from "react-icons/md";
import {useNavigate} from "react-router-dom";

interface ClubCardProps {
    id: string;
    clubName: string;
    clubDescription: string;
    clubAddress: string;
    openTime: string;
    closeTime: string;
    reviews: ReviewType[];
    clubImages: ClubImageType[];
}

function ClubCard({
    id,
    clubName,
    clubDescription,
    clubAddress,
    openTime,
    closeTime,
    reviews,
    clubImages,
}: ClubCardProps) {
    const profileImage =
        clubImages[0]?.imageUrl ||
        "https://lightwidget.com/wp-content/uploads/localhost-file-not-found-480x480.avif";
    const clubRating =
        reviews.length === 0
            ? 0
            : (
                  reviews.reduce((acc, review) => acc + review.rating, 0) /
                  reviews.length
              ).toFixed(1);
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/clubs/${id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="flex flex-col justify-between items-center cursor-pointer shadow-md shadow-gray-200 group hover:shadow-xl hover:rounded-t-xl hover:scale-[1.03] transition-all duration-300"
        >
            <div className="relative w-full h-60 overflow-hidden">
                <img
                    src={profileImage}
                    alt={clubName}
                    className="absolute h-full w-full object-cover rounded-t-xl group-hover:scale-125 group-hover:rotate-6 transition-all"
                />
                <div className="absolute top-4 left-4">
                    <ul className="grid grid-cols-2 gap-2">
                        <li className="col-span-1">
                            <Tag
                                text={`${formatTime(openTime)} - ${formatTime(closeTime)}`}
                            />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full p-4 flex flex-col justify-center items-start gap-4">
                <div className="w-full flex justify-start items-center gap-2">
                    <div className="bg-yellow-400 w-7 h-7 flex justify-center items-center rounded-sm text-white font-semibold">
                        <p>{clubRating || 0}</p>
                    </div>
                    <p className="opacity-50">{reviews.length} reviews</p>
                </div>
                <p className="text-xl font-semibold">{clubName}</p>
                <p className="opacity-50">{clubDescription}</p>
                <div className="flex justify-start items-center gap-2">
                    <CiLocationOn size={20} className="opacity-50" />
                    <p>{clubAddress}</p>
                </div>
                <div className="w-full flex justify-between items-center">
                    <img
                        src={profileImage}
                        alt="club"
                        className="w-8 aspect-square rounded-full"
                    />
                    <button className="flex justify-between items-center gap-2 py-1 px-2 rounded-lg border border-black/10 hover:bg-green-300 hover:border-green-300 transition-colors">
                        <MdOutlineShoppingBag size={20} />
                        <p>Book Now</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ClubCard;
