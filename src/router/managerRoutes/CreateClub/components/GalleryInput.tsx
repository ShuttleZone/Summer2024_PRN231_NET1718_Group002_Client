import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import MultiFileInput from "@/router/userRoutes/ClubCreate/components/MultiFileInput";
function GalleryInput() {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full h-fit bg-slate-100 py-8 px-8 my-4"
            defaultValue="item-1"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <h1 className="text-2xl font-semibold ">Gallery</h1>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="w-full">
                        <h1 className="text-xl text-slate-700 my-4">
                            Your club gallery
                        </h1>
                        <MultiFileInput />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
export default GalleryInput;
