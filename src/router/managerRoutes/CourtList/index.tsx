import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {useGetMyClubsQuery} from "@/store/services/clubs/club.api";
import Description from "./components/HeaderDescription";
import {
    useChangeStatusCourtMutation,
    useGetCourtByClubQuery,
    useMaintainCourtMutation,
} from "@/store/services/courts/court.api";
import {useToast} from "@/components/ui/use-toast";
import MaintainButton from "./components/MaintainButton";

interface InputCourtDataProps {
    clubId: string;
}

function InputCourtData({clubId}: InputCourtDataProps) {
    const {toast} = useToast();
    const {
        data: courts,
        isLoading,
        error,
        refetch,
    } = useGetCourtByClubQuery(clubId);
    const [changeCourtStatus] = useChangeStatusCourtMutation();
    const [maintainCourt] = useMaintainCourtMutation();

    if (isLoading)
        return (
            <div>
                <div
                    role="status"
                    className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    if (error)
        return (
            <tr>
                <td>Error loading courts</td>
            </tr>
        );

    const handleChangeStatus = async (courtId: string) => {
        const {error} = await changeCourtStatus({id: courtId});
        if (!error) {
            toast({
                variant: "default",
                description: "Changes saved !",
            });
            refetch();
        } else {
            toast({
                variant: "destructive",
                description: "Error in server !",
            });
            refetch();
        }
    };

    const handleMaintainCourt = async (courtId: string) => {
        const response = await maintainCourt({id: courtId});
        if (response.error) {
            toast({
                title: "Thông báo",
                description: "Đã xảy ra lỗi",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Thông báo",
                description: "Đã lưu thay đổi",
                variant: "default",
            });
        }
    };

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
                    <td className="px-6 py-4">{court.price} VND</td>
                    <td className="px-6 py-4">
                        {court.courtStatus === "Maintain" ? (
                            <MaintainButton
                                onClick={() => handleMaintainCourt(court.id)}
                                title="Xác nhận"
                                content="Hoàn thành bảo trì sân"
                                buttonTitle="Hoàn thành"
                            >
                                <button
                                    type="button"
                                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                >
                                    Hoàn thành bảo trì
                                </button>
                            </MaintainButton>
                        ) : (
                            <MaintainButton
                                onClick={() => handleMaintainCourt(court.id)}
                                title="Xác nhận"
                                content="Xác nhận bảo trì sân"
                                buttonTitle="Bảo trì"
                            >
                                <button
                                    type="button"
                                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                >
                                    Bảo trì
                                </button>
                            </MaintainButton>
                        )}
                        {court.courtStatus != "Unavailable" ? (
                            <button
                                value={court.id}
                                onClick={() => handleChangeStatus(court.id)}
                                type="button"
                                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                Vô hiệu sân
                            </button>
                        ) : (
                            <button
                                value={court.id}
                                onClick={() => handleChangeStatus(court.id)}
                                type="button"
                                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                Kích hoạt sân
                            </button>
                        )}
                    </td>
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
                                                Tên sân
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Loại sân
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Trạng thái
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Giá
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Hành động
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
