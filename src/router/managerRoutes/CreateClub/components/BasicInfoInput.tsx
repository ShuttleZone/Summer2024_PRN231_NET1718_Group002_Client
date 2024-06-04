import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
function BasicInfoInput() {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full h-fit bg-slate-100 py-8 px-8 my-4"
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
                            />
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
export default BasicInfoInput;
