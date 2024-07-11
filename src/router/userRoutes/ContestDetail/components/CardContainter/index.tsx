import CardBody from "../CardBody";
import CardHeader from "../CardHeader";
import {ContestInfo} from "@/@types/api";

interface ContestTableProps {
    contest: ContestInfo;
}

function CardContainter({contest}: ContestTableProps) {
    return (
        <div className="bg-gray-50 p-8 mt-4 rounded-md">
            <div className="static object-cover">
                <figure className=" transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
                    <a href="#">
                        <img
                            className="size-full rounded-lg"
                            src="https://plus.unsplash.com/premium_photo-1677543938005-6e0eb736dc19?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="image description"
                        />
                    </a>
                </figure>
                <div className="grid grid-cols- md:grid-cols-1 gap-4">
                    <div className="relative">
                        <CardHeader contest={contest} />
                    </div>
                    <div className="relative">
                        <CardBody contest={contest} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardContainter;
