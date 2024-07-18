import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {FormChildProps} from "..";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";

function DescriptionInput({form}: FormChildProps) {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full h-fit bg-slate-100 py-8 px-8 my-4"
            defaultValue="item-1"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <h1 className="text-2xl font-semibold ">Mô tả</h1>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel htmlFor="description">
                                    Giới thiệu câu lạc bộ
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} id="description" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
export default DescriptionInput;
