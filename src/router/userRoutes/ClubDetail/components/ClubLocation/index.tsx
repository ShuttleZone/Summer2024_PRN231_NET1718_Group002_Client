import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface ClubLocationProps {
    lat: number;
    lng: number;
}

// eslint-disable-next-line no-empty-pattern
function ClubLocation({}: ClubLocationProps) {
    return (
        <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-semibold">
                    Địa chỉ
                </AccordionTrigger>
                <AccordionContent>
                    <iframe
                        className="w-full  h-96 aspect-video"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.1640561681966!2d106.79814311188517!3d10.875123789234998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2zTmjDoCBWxINuIGjDs2EgU2luaCB2acOqbiBUUC5IQ00!5e0!3m2!1svi!2s!4v1716964598367!5m2!1svi!2s"
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default ClubLocation;
