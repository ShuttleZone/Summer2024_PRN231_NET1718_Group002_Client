import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {useAppDispatch} from "@/store";
import {setClubAvailability} from "@/store/slices/club.slice";
import {useEffect, useState} from "react";
function AvailabilityInput() {
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

    const toggleDay = (day: string) => {
        setSelectedDays((prevSelectedDays) =>
            prevSelectedDays.includes(day)
                ? prevSelectedDays.filter((d) => d !== day)
                : [...prevSelectedDays, day]
        );
    };

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setClubAvailability(selectedDays));
    }, [dispatch, selectedDays]);

    return (
        <Accordion
            type="single"
            collapsible
            className="w-full h-fit bg-slate-100 py-8 px-8 my-4"
            defaultValue="item-1"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <h1 className="text-2xl font-semibold ">Availability</h1>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="w-full">
                        <h1 className="text-xl text-slate-700 my-4">
                            Select days
                        </h1>
                        <div className="h-fit flex flex-row justify-start gap-10">
                            {DayInWeek.map((item) => (
                                <div
                                    key={item}
                                    className={`border-2 w-32 h-12 flex justify-center items-center rounded-xl hover:cursor-pointer ${
                                        selectedDays.includes(item)
                                            ? "text-green-500 border-green-500"
                                            : "hover:text-green-500 hover:border-green-500"
                                    }`}
                                    onClick={() => toggleDay(item)}
                                >
                                    <p className="font-semibold">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
export default AvailabilityInput;