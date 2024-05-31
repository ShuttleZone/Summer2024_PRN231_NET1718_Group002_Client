import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface ClubDescriptionProps {
    description: string;
}

function ClubDescription({description}: ClubDescriptionProps) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-semibold">
                    Overview
                </AccordionTrigger>
                <AccordionContent>{description}</AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default ClubDescription;
