import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {useGetMyClubsQuery} from "@/store/services/clubs/club.api";
import Description from "./components/HeaderDescription";
import {useGetCourtByClubQuery} from "@/store/services/courts/court.api";

interface InputCourtDataProps {
    clubId: string;
}

function InputCourtData({clubId}: InputCourtDataProps) {
    const {data: courts, isLoading, error} = useGetCourtByClubQuery(clubId);
    console.log(courts);
    if (isLoading) return <div>is loading...</div>;
    if (error)
        return (
            <tr>
                <td>Error loading courts</td>
            </tr>
        );
    return (
        <>
            {courts?.map((court) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        {court.name}
                    </th>
                    <td className="px-6 py-4"> {court.courtType} </td>
                    <td className="px-6 py-4">{court.courtStatus}</td>
                    <td className="px-6 py-4">{court.price}</td>
                    <td className="px-6 py-4">Edit - Delete - Maintainence</td>
                </tr>
            ))}
        </>
    );
}

function CourtList() {
    const {data: clubs, isLoading} = useGetMyClubsQuery(undefined);
    if (isLoading) return <div>is loading...</div>;

    return (
        <div>
            <Description />
            <Accordion type="single" collapsible>
                {clubs?.map((club, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black border border-b-0 border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3">
                            <span className="flex items-center">
                                <img
                                    className="m-3"
                                    width="20"
                                    height="20"
                                    src="https://img.icons8.com/ios/50/badminton.png"
                                    alt="badminton"
                                />{" "}
                                {club.ClubName}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="relative overflow-x-auto mt-4 mb-4">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Court name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Type
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Price
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <InputCourtData clubId={club.Id} />
                                    </tbody>
                                </table>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export default CourtList;
