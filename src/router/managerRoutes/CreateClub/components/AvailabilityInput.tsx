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
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectAllActive, setSelectAllActive] = useState(false);

    const toggleDay = (day: string) => {
        setSelectedDays((prevSelectedDays) =>
            prevSelectedDays.includes(day)
                ? prevSelectedDays.filter((d) => d !== day)
                : [...prevSelectedDays, day]
        );
        setSelectAllActive(false); // Reset select all button state
    };

    const transformDayInWeek = (day: string) => {
        switch (day) {
            case "Monday":
                return "Thứ 2";
            case "Tuesday":
                return "Thứ 3";
            case "Wednesday":
                return "Thứ 4";
            case "Thursday":
                return "Thứ 5";
            case "Friday":
                return "Thứ 6";
            case "Saturday":
                return "Thứ 7";
            case "Sunday":
                return "Chủ nhật";
            default:
                return "";
        }
    };

    const handleSelectAll = () => {
        setSelectedDays(DayInWeek);
        setSelectAllActive(true);
    };

    const handleCancelSelectAll = () => {
        setSelectedDays([]);
        setSelectAllActive(false);
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
                    <h1 className="text-2xl font-semibold">Ngày mở cửa</h1>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                    <div className="w-full">
                        <FormField
                            control={form.control}
                            name="availability"
                            render={() => (
                                <FormItem>
                                    <FormLabel className="flex flex-row justify-end pr-16">
                                        {!selectAllActive ? (
                                            <div
                                                className="w-32 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300 py-2 text-center rounded-md hover:cursor-pointer"
                                                onClick={handleSelectAll}
                                            >
                                                Chọn tất cả
                                            </div>
                                        ) : (
                                            <div
                                                className="w-32 border-2 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white transition-colors duration-300 py-2 text-center rounded-md hover:cursor-pointer"
                                                onClick={handleCancelSelectAll}
                                            >
                                                Hủy chọn tất cả
                                            </div>
                                        )}
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
                                                        {transformDayInWeek(
                                                            item
                                                        )}
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
