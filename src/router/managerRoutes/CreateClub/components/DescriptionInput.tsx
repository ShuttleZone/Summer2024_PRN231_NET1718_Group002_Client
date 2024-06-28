import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "..";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";

interface DescriptionInputProps {
    form: UseFormReturn<z.infer<typeof formSchema>, any, undefined>;
}

function DescriptionInput({form}: DescriptionInputProps) {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full h-fit bg-slate-100 py-8 px-8 my-4"
            defaultValue="item-1"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <h1 className="text-2xl font-semibold ">Description</h1>
                </AccordionTrigger>
                <AccordionContent>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel htmlFor="description">
                                    Introduce your club
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
