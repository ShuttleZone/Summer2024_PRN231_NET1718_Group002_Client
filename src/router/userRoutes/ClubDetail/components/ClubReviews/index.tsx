import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import ClubReview from "../ClubReview";
import {FaStar} from "react-icons/fa";

function ClubReviews() {
    return (
        <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-semibold">
                    Reviews
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex justify-start gap-8 mb-12">
                        <div className="flex flex-col justify-center items-center p-6 bg-amber-300/10 rounded gap-2 aspect-square">
                            <span className="text-2xl font-semibold">5.0</span>
                            <span className="text-lg opacity-75">
                                out of 5.0
                            </span>
                            <ul className="flex gap-1">
                                {Array.from({length: 5}).map((_, index) => (
                                    <li key={index}>
                                        <FaStar color="orange" size={20} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-3 w-full h-full gap-x-24 gap-y-12">
                            <div className="w-full col-span-1">
                                <span>20 reviews</span>
                                <div className="flex gap-2 items-center">
                                    <ul className="flex gap-1">
                                        {Array.from({length: 5}).map(
                                            (_, index) => (
                                                <li key={index}>
                                                    <FaStar
                                                        color="orange"
                                                        size={20}
                                                    />
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <span className="text-lg opacity-75">
                                        5.0
                                    </span>
                                </div>
                            </div>
                            <div className="w-full col-span-1">
                                <span>20 reviews</span>
                                <div className="flex gap-2 items-center">
                                    <ul className="flex gap-1">
                                        {Array.from({length: 4}).map(
                                            (_, index) => (
                                                <li key={index}>
                                                    <FaStar
                                                        color="orange"
                                                        size={20}
                                                    />
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <span className="text-lg opacity-75">
                                        4.0
                                    </span>
                                </div>
                            </div>
                            <div className="w-full col-span-1">
                                <span>20 reviews</span>
                                <div className="flex gap-2 items-center">
                                    <ul className="flex gap-1">
                                        {Array.from({length: 3}).map(
                                            (_, index) => (
                                                <li key={index}>
                                                    <FaStar
                                                        color="orange"
                                                        size={20}
                                                    />
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <span className="text-lg opacity-75">
                                        3.0
                                    </span>
                                </div>
                            </div>
                            <div className="w-full col-span-1">
                                <span>20 reviews</span>
                                <div className="flex gap-2 items-center">
                                    <ul className="flex gap-1">
                                        {Array.from({length: 2}).map(
                                            (_, index) => (
                                                <li key={index}>
                                                    <FaStar
                                                        color="orange"
                                                        size={20}
                                                    />
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <span className="text-lg opacity-75">
                                        2.0
                                    </span>
                                </div>
                            </div>
                            <div className="w-full col-span-1">
                                <span>20 reviews</span>
                                <div className="flex gap-2 items-center">
                                    <ul className="flex gap-1">
                                        {Array.from({length: 1}).map(
                                            (_, index) => (
                                                <li key={index}>
                                                    <FaStar
                                                        color="orange"
                                                        size={20}
                                                    />
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <span className="text-lg opacity-75">
                                        1.0
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="flex flex-col gap-8">
                        {Array.from({length: 3}).map((_, index) => (
                            <ClubReview key={index} />
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default ClubReviews;
