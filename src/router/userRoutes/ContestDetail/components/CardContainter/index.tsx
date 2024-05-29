import CardBody from "../CardBody";
import CardHeader from "../CardHeader";

function CardContainter() {
    return (
        <div className="bg-gray-50 p-8 mt-4 rounded-md">
            <div className="static object-cover">
                <figure className=" transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
                    <a href="#">
                        <img
                            className="size-full rounded-lg"
                            src="https://plus.unsplash.com/premium_photo-1716396589811-69274847ce9f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8"
                            alt="image description"
                        />
                    </a>
                </figure>
                <div className="grid grid-cols- md:grid-cols-1 gap-4">
                    <div className="relative">
                        <CardHeader />
                    </div>
                    <div className="relative">
                        <CardBody />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardContainter;
