import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {useAppDispatch} from "@/store";
import {setClubSetting} from "@/store/club.slice";
import {ChangeEvent, useState} from "react";
function SettingInput() {
    const dispatch = useAppDispatch();
    const [settings, setSettings] = useState({
        openTime: "",
        closeTime: "",
        minDuration: 0,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setSettings({...settings, [name]: value});
        dispatch(setClubSetting(settings));
    };
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full h-fit bg-slate-100 py-8 px-8 my-4"
        >
            <AccordionItem value="item-2">
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
                                className="pl-6 bg-white text-black h-12 text-lg pr-4"
                                placeholder="Enter your club name"
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
                                className="pl-6 bg-white text-black h-12 text-lg pr-4"
                                placeholder="Enter your club phone"
                                name="closeTime"
                                value={settings.closeTime}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col col-span-1 w-4/5">
                            <label className="text-xl py-4">
                                Time per slot (in hour){" "}
                                <span className="text-red-600 mx-2">*</span>
                            </label>
                            <input
                                type="number"
                                className="pl-6 bg-white text-black h-12 text-lg"
                                placeholder="Enter Time per slot"
                                name="minDuration"
                                value={settings.minDuration}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
export default SettingInput;
