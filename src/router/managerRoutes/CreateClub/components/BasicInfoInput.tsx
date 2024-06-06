import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {useAppDispatch} from "@/store";
import {setClubBasicInfo} from "@/store/club.slice";
import {ChangeEvent, useState} from "react";
function BasicInfoInput() {
    const dispatch = useAppDispatch();
    const [clubInfo, setClubInfo] = useState({
        clubName: "",
        clubPhone: "",
        clubAddress: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setClubInfo({...clubInfo, [name]: value});
        dispatch(setClubBasicInfo(clubInfo));
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
                    <h1 className="text-2xl font-semibold ">Basic Info</h1>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col col-span-1 w-4/5">
                            <label className="text-xl py-4">
                                Club Name
                                <span className="text-red-600 mx-2">*</span>
                            </label>
                            <input
                                type="text"
                                className="pl-6 bg-white text-black h-12 text-lg"
                                placeholder="Enter your club name"
                                name="clubName"
                                value={clubInfo.clubName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col col-span-1 w-4/5">
                            <label className="text-xl py-4">
                                Club Phone
                                <span className="text-red-600 mx-2">*</span>
                            </label>
                            <input
                                type="text"
                                className="pl-6 bg-white text-black h-12 text-lg"
                                placeholder="Enter your club phone"
                                pattern="[0-9]{10}"
                                name="clubPhone"
                                value={clubInfo.clubPhone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col col-span-2 w-4/5">
                            <label className="text-xl py-4">
                                Club Address
                                <span className="text-red-600 mx-2">*</span>
                            </label>
                            <input
                                type="text"
                                className="pl-6 bg-white text-black h-12 text-lg"
                                placeholder="Enter your club address"
                                name="clubAddress"
                                value={clubInfo.clubAddress}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
export default BasicInfoInput;
