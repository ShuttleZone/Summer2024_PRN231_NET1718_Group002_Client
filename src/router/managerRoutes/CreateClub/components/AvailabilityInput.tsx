import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {useEffect, useState} from "react";
import {FormChildProps} from "..";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

function AvailabilityInput({form}: FormChildProps) {
    const DayInWeek = [
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
        "Chủ nhật",
    ];
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const toggleDay = (day: string) => {
        setSelectedDays((prevSelectedDays) =>
            prevSelectedDays.includes(day)
                ? prevSelectedDays.filter((d) => d !== day)
                : [...prevSelectedDays, day]
        );
    };

    useEffect(() => {
        form.setValue("availability", selectedDays);
    }, [form, selectedDays]);

    return (
        <Accordion
            type="single"
            collapsible
            className="w-full h-fit bg-slate-100 py-8 px-8 my-4"
            defaultValue="item-1"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <h1 className="text-2xl font-semibold ">Ngày mở cửa</h1>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                    <div className="w-full">
                        <FormField
                            control={form.control}
                            name="availability"
                            render={() => (
                                <FormItem>
                                    <FormLabel htmlFor="clubName">
                                        Chọn ngày mở cửa
                                    </FormLabel>
                                    <FormControl>
                                        <div className="h-fit flex flex-row justify-start gap-10">
                                            {DayInWeek.map((item) => (
                                                <div
                                                    key={item}
                                                    className={`border-2 w-32 h-12 flex justify-center items-center rounded-xl hover:cursor-pointer ${
                                                        selectedDays.includes(
                                                            item
                                                        )
                                                            ? "text-green-500 border-green-500"
                                                            : "hover:scale-110"
                                                    }`}
                                                    onClick={() =>
                                                        toggleDay(item)
                                                    }
                                                >
                                                    <p className="font-semibold">
                                                        {item}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
export default AvailabilityInput;
