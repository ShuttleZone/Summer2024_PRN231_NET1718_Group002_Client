import {FaStar} from "react-icons/fa";

interface RatingProps {
    rating: number;
    reviewsCount: number;
}

function Rating({rating, reviewsCount}: RatingProps) {
    return (
        <li className="w-full col-span-1">
            <span>{reviewsCount} reviews</span>
            <div className="flex gap-2 items-center">
                <ul className="flex gap-1">
                    {Array.from({length: rating}).map((_, index) => (
                        <li key={index}>
                            <FaStar color="orange" size={20} />
                        </li>
                    ))}
                </ul>
                <span className="text-lg opacity-75">5.0</span>
            </div>
        </li>
    );
}

export default Rating;
