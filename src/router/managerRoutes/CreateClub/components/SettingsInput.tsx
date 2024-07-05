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
import {Input} from "@/components/ui/input";

function SettingInput({form}: FormChildProps) {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full h-fit bg-slate-100 py-8 px-8 my-4"
            defaultValue="item-1"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <h1 className="text-2xl font-semibold ">Cài đặt</h1>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="grid grid-cols-3">
                        <div className="flex flex-col col-span-1 w-4/5">
                            <FormField
                                control={form.control}
                                name="openTime"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel htmlFor="openTime">
                                            Giờ mở cửa
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                id="openTime"
                                                type="time"
                                                step="1800"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                        <div className="flex flex-col col-span-1 w-4/5">
                            <FormField
                                control={form.control}
                                name="closeTime"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel htmlFor="closeTime">
                                            Giờ đóng cửa
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                id="closeTime"
                                                type="time"
                                                step="60 * 30"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                        <div className="flex flex-col col-span-1 w-4/5">
                            <FormField
                                control={form.control}
                                name="minDuration"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel htmlFor="minDuration">
                                            Thời gian tối thiểu của mỗi lần đặt
                                            sân (giờ)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                id="minDuration"
                                                type="number"
                                                step="0.5"
                                                min={0.5}
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

export default SettingInput;
