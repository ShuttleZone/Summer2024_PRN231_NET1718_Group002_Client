import Tag from "../Tag";
import {CiLocationOn} from "react-icons/ci";

interface ClubCardProps {
    name: string;
    description: string;
    location: string;
    image: string;
    profileImage: string;
    tags: string[];
    price: number;
    reviews: number;
    rating: number;
}

function ClubCard({
    name,
    description,
    location,
    image,
    profileImage,
    tags,
    price,
    reviews,
    rating,
}: ClubCardProps) {
    return (
        <div className="flex flex-col justify-between items-center shadow-md shadow-gray-200 group hover:shadow-xl hover:rounded-t-xl hover:scale-[1.03] transition-all duration-300">
            <div className="relative w-full h-60 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="absolute h-full w-full object-cover rounded-t-xl group-hover:scale-125 group-hover:rotate-6 transition-all"
                />
                <div className="absolute top-4 left-4">
                    <ul className="grid grid-cols-2 gap-2">
                        {tags.map((tag) => (
                            <li key={tag} className="col-span-1">
                                <Tag text={tag} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="absolute top-4 right-4">
                    <Tag
                        text={`$${price}/hr`}
                        className="bg-green-700 text-white font-semibold"
                    />
                </div>
            </div>
            <div className="w-full p-4 flex flex-col justify-center items-start gap-4">
                <div className="w-full flex justify-start items-center gap-2">
                    <div className="bg-yellow-400 w-7 h-7 flex justify-center items-center rounded-sm text-white font-semibold">
                        <p>{rating}</p>
                    </div>
                    <p className="opacity-50">{reviews} reviews</p>
                </div>
                <p className="text-xl font-semibold">{name}</p>
                <p className="opacity-50">{description}</p>
                <div className="flex justify-start items-center gap-2">
                    <CiLocationOn size={20} className="opacity-50" />
                    <p>{location}</p>
                </div>
                <div>
                    <img
                        src={profileImage}
                        alt={name}
                        className="w-8 aspect-square rounded-full"
                    />
                </div>
            </div>
        </div>
    );
}

export default ClubCard;
