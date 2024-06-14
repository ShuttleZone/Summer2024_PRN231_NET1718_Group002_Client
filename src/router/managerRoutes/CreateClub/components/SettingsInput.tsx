import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {useAppDispatch} from "@/store";
import {setClubSetting} from "@/store/slices/club.slice";
import {ChangeEvent, useState} from "react";

function SettingInput() {
    const dispatch = useAppDispatch();
    const [settings, setSettings] = useState({
        openTime: "",
        closeTime: "",
        minDuration: 0,
    });
    const [validationError, setValidationError] = useState("");

    const validateOpenHours = (
        openTime: string,
        closeTime: string,
        minDuration: number
    ) => {
        if (openTime && closeTime && minDuration > 0) {
            const [openHours, openMinutes] = openTime.split(":").map(Number);
            const [closeHours, closeMinutes] = closeTime.split(":").map(Number);

            const openTotalMinutes = openHours * 60 + openMinutes;
            const closeTotalMinutes = closeHours * 60 + closeMinutes;
            const durationInMinutes = minDuration * 60;

            return (
                (closeTotalMinutes - openTotalMinutes) % durationInMinutes === 0
            );
        }
        return true;
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        const updatedValue =
            name === "minDuration" ? Math.max(0, Number(value)) : value;
        const updatedSettings = {...settings, [name]: updatedValue};

        if (
            name === "openTime" ||
            name === "closeTime" ||
            name === "minDuration"
        ) {
            const {openTime, closeTime, minDuration} = updatedSettings;

            if (!validateOpenHours(openTime, closeTime, minDuration)) {
                setValidationError(
                    "Open hours should be divisible by the duration."
                );
            } else {
                setValidationError("");
            }
        }

        setSettings(updatedSettings);
        dispatch(setClubSetting(updatedSettings));
    };

    return (
        <Accordion
            type="single"
            collapsible
            className="w-full h-fit bg-slate-100 py-8 px-8 my-4"
            defaultValue="item-1"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <h1 className="text-2xl font-semibold ">Settings</h1>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="grid grid-cols-3">
                        <div className="flex flex-col col-span-1 w-4/5">
                            <label className="text-xl py-4">
                                Open Time
                                <span className="text-red-600 mx-2">*</span>
                            </label>
                            <input
                                type="time"
                                step="1800"
                                className="pl-6 bg-white text-black h-12 text-lg pr-4"
                                name="openTime"
                                value={settings.openTime}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col col-span-1 w-4/5">
                            <label className="text-xl py-4">
                                Close Time
                                <span className="text-red-600 mx-2">*</span>
                            </label>
                            <input
                                type="time"
                                step="1800"
                                className="pl-6 bg-white text-black h-12 text-lg pr-4"
                                name="closeTime"
                                value={settings.closeTime}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col col-span-1 w-4/5">
                            <label className="text-xl py-4">
                                Time per slot (in hours)
                                <span className="text-red-600 mx-2">*</span>
                            </label>
                            <input
                                type="number"
                                className="pl-6 bg-white text-black h-12 text-lg"
                                name="minDuration"
                                min="0.5"
                                value={settings.minDuration}
                                step={0.5}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {validationError && (
                        <div className="text-red-600 mt-4 text-lg">
                            {validationError}
                        </div>
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default SettingInput;
