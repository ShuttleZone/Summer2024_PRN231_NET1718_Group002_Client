import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import MultiFileInput from "@/router/userRoutes/ClubCreate/components/MultiFileInput";
import {FormChildProps} from "..";

function GalleryInput({form}: FormChildProps) {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full h-fit bg-slate-100 py-8 px-8 my-4"
            defaultValue="item-1"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <h1 className="text-2xl font-semibold ">
                        Hình ảnh câu lạc bộ
                    </h1>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                    <div className="w-full">
                        {/*
                        <h1 className="text-xl text-slate-700 my-4">
                            Thêm hình ảnh
                        </h1>
                    */}
                        <MultiFileInput form={form} />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
export default GalleryInput;
