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
import {FormChildProps} from "..";

function BasicInfoInput({form}: FormChildProps) {
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
                        Thông tin cơ bản
                    </h1>
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
                                            Tên câu lạc bộ
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
                                            Số điện thoại
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                id="clubPhone"
                                                placeholder="Nhập số điện thoại của câu lạc bộ"
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
                                            Địa chỉ
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                id="clubAddress"
                                                placeholder="Nhập địa chỉ câu lạc bộ của bạn"
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
