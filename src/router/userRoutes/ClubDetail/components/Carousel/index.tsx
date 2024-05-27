interface CarouselProps {
    images: string[];
}

function Carousel({images}: CarouselProps) {
    return (
        <ul className="grid grid-cols-5 gap-1 mt-1">
            {images.map((image, index) => (
                <li key={index} className="h-[400px]">
                    <img
                        src={image}
                        alt="club"
                        className="h-full w-full object-cover"
                    />
                </li>
            ))}
        </ul>
    );
}

export default Carousel;
