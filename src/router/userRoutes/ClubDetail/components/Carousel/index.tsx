import {useState} from "react";
import {IoChevronBackCircle, IoChevronForwardCircle} from "react-icons/io5";

interface CarouselProps {
    images: string[];
}

function Carousel({images}: CarouselProps) {
    const [translateX, setTranslateX] = useState(0);

    const handleNext = () => {
        translateX === images.length * -25 + 100
            ? setTranslateX(0)
            : setTranslateX((prev) => prev - 25);
    };

    const handlePrev = () => {
        translateX === 0
            ? setTranslateX(images.length * -25 + 100)
            : setTranslateX((prev) => prev + 25);
    };

    return (
        <div className="relative overflow-x-hidden">
            <ul
                className="flex flex-nowrap transition-transform duration-300"
                style={{transform: `translateX(${translateX}%)`}}
            >
                {images.map((image) => (
                    <li
                        key={image}
                        className="h-[400px] w-1/4 aspect-video p-1"
                    >
                        <img
                            src={image}
                            alt="club"
                            className="h-full w-full object-cover"
                        />
                    </li>
                ))}
            </ul>
            <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4">
                <button onClick={handlePrev} className="hover:scale-110">
                    <IoChevronBackCircle size={56} className="opacity-90" />
                </button>
                <button onClick={handleNext} className="hover:scale-110">
                    <IoChevronForwardCircle size={56} className="opacity-90" />
                </button>
            </div>
        </div>
    );
}

export default Carousel;
