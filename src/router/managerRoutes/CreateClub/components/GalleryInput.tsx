import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import MultiFileInput from "@/router/userRoutes/ClubCreate/components/MultiFileInput";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "..";

interface GalleryInputProps {
    form: UseFormReturn<z.infer<typeof formSchema>, any, undefined>;
}

function GalleryInput({form}: GalleryInputProps) {
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
                        <MultiFileInput form={form} />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
export default GalleryInput;
