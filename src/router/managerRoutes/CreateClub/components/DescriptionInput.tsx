import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {useAppDispatch} from "@/store";
import {setClubDescription} from "@/store/club.slice";
import {ChangeEvent, useState} from "react";
function DescriptionInput() {
    const [clubIntro, setClubIntro] = useState("");
    const dispatch = useAppDispatch();
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setClubIntro(event.target.value);
        dispatch(setClubDescription(clubIntro));
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
                    <h1 className="text-2xl font-semibold ">Description</h1>
                </AccordionTrigger>
                <AccordionContent>
                    <h1 className="text-xl text-slate-700 my-4">
                        Introduce your club
                    </h1>
                    <textarea
                        name=""
                        id=""
                        className="w-full h-36 pl-4 pt-4 text-lg"
                        value={clubIntro}
                        onChange={handleChange}
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
export default DescriptionInput;
