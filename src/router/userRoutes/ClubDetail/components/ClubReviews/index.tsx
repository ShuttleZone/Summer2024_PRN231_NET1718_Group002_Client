import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import ClubReview from "../ClubReview";

function ClubReviews() {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-semibold">
                    Reviews
                </AccordionTrigger>
                <ul className="flex flex-col gap-8">
                    {Array.from({length: 3}).map((_, index) => (
                        <AccordionContent key={index}>
                            <ClubReview />
                        </AccordionContent>
                    ))}
                </ul>
            </AccordionItem>
        </Accordion>
    );
}

export default ClubReviews;
