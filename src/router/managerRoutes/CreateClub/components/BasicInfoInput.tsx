import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "..";

interface BasicInfoInputProps {
    form: UseFormReturn<z.infer<typeof formSchema>, any, undefined>;
}

function BasicInfoInput({form}: BasicInfoInputProps) {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full h-fit bg-slate-100 py-8 px-8 my-4"
            defaultValue="item-1"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <h1 className="text-2xl font-semibold ">Basic Info</h1>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col col-span-1 w-4/5">
                            <FormField
                                control={form.control}
                                name="clubName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel htmlFor="clubName">
                                            Club Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} id="clubName" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                        <div className="flex flex-col col-span-1 w-4/5">
                            <FormField
                                control={form.control}
                                name="clubPhone"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel htmlFor="clubPhone">
                                            Club Phone
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                id="clubPhone"
                                                placeholder="Enter your club phone"
                                                pattern="[0-9]{10}"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                        <div className="flex flex-col col-span-2 w-4/5">
                            <FormField
                                control={form.control}
                                name="clubAddress"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel htmlFor="clubAddress">
                                            Club Address
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                id="clubAddress"
                                                placeholder="Enter your club address"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
export default BasicInfoInput;
