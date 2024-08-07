// import {AcceptClubRequest, ClubRequest} from "@/@types/api";
import {ClubRequest} from "@/@types/api";
import formatTime from "@/lib/time.util";
import {
    useAcceptClubRequestMutation,
    useRejectClubRequestMutation,
} from "@/store/services/clubsAdmin/clubAdmin.api";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import "react-toastify/ReactToastify.css";
import {Toaster} from "@/components/ui/toaster";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import React from "react";

interface InputDataProps {
    clubRequest: ClubRequest;
    refetch: () => void;
    // refetch: () => QueryActionCreatorResult<
    //     QueryDefinition<
    //         string | undefined,
    //         BaseQueryFn<
    //             string | FetchArgs,
    //             unknown,
    //             FetchBaseQueryError,
    //             Record<string, never>,
    //             FetchBaseQueryMeta
    //         >,
    //         never,
    //         ClubRequest[],
    //         "commonApi"
    //     >
    // >;
}

function InputData({
    // id,
    // clubName,
    // clubAddress,
    // clubPhone,
    // // clubDescription,
    // status,
    // openTime,
    // closeTime,
    clubRequest,
    refetch,
}: InputDataProps) {
    const [_, setOpen] = React.useState(false); // eslint-disable-line @typescript-eslint/no-unused-vars
    const [acceptRequest] = useAcceptClubRequestMutation();
    const [rejectRequest] = useRejectClubRequestMutation();
    const {toast} = useToast();
    // const [reloadFlag, setReloadFlag] = useState(false);

    const handleAccept = async () => {
        setOpen(true);

        const {error} = await acceptRequest({id: clubRequest.id});
        if (!error) {
            toast({
                variant: "default",
                description: "Request accepted !",
            });

            // setReloadFlag((prevFlag) => !prevFlag);
        } else {
            toast({
                variant: "destructive",
                description: "Error in server !",
            });
        }
        refetch();
    };

    const handleReject = async () => {
        setOpen(true);
        // var id = clubRequest.id;
        const {error} = await rejectRequest({id: clubRequest.id});
        if (!error) {
            toast({
                variant: "default",
                description: "Request rejected !",
            });

            // setReloadFlag((prevFlag) => !prevFlag);
        } else {
            toast({
                variant: "destructive",
                description: "Error in server !",
            });
        }
        refetch();
    };
    if (!clubRequest) return <div>Nothing</div>;
    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                    <img
                        className="w-10 h-10 rounded-full"
                        src="/docs/images/people/profile-picture-1.jpg"
                        alt="Jese image"
                    />
                    <div className="ps-3">
                        <div className="text-base font-semibold">
                            {clubRequest.clubName}
                        </div>
                        {/* <div className="font-normal text-gray-500">
                            neil.sims@flowbite.com
                        </div> */}
                    </div>
                </th>
                <td className="px-6 py-4 whitespace-pre-wrap">
                    {clubRequest.clubAddress}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    {clubRequest.clubPhone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    Yêu cầu đang chờ
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    {formatTime(clubRequest.openTime.toString())} -{" "}
                    {formatTime(clubRequest.closeTime.toString())}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    {clubRequest.clubStatusEnum == "CreateRequestAccepted" ? (
                        <span className="text-green-500">Request Accepted</span>
                    ) : clubRequest.clubStatusEnum == "CreateRequestDenied" ? (
                        <span className="text-red-500">Request Rejected</span>
                    ) : clubRequest.clubStatusEnum == "RequestPending" ? (
                        <div className="flex">
                            <Dialog>
                                <DialogTrigger
                                    onClick={() => setOpen(true)}
                                    key={clubRequest.id}
                                    className="p-3 bg-green-600 rounded-lg font-medium text-white dark:text-blue-500 hover:bg-green-800 text-sm px-5 py-2.5 me-2 mb-2"
                                >
                                    Chấp thuận
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Bạn có chắc là muốn chấp thuận yêu
                                            cầu này không ?
                                        </DialogTitle>
                                        <DialogDescription>
                                            Chấp thuận yêu cầu không thể hoàn
                                            tác! Hãy quyết định chắc chắn với
                                            lựa chọn của bạn.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <DialogClose>
                                            <Button
                                                className="p-3 bg-green-600 rounded-lg font-medium text-white dark:text-blue-500 hover:bg-green-800 text-sm px-5 py-2.5 me-2 mb-2"
                                                type="submit"
                                                onClick={handleAccept}
                                                variant="secondary"
                                            >
                                                Chấp thuận yêu cầu
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <Dialog>
                                <DialogTrigger
                                    onClick={() => setOpen(true)}
                                    key={clubRequest.id}
                                    className="p-3 bg-red-600 rounded-lg font-medium text-white dark:text-blue-500 hover:bg-red-800 text-sm px-5 py-2.5 me-2 mb-2"
                                >
                                    Từ chối
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Bạn có chắc là muốn từ chối yêu cầu
                                            này không ?
                                        </DialogTitle>
                                        <DialogDescription>
                                            Từ chối yêu cầu không thể hoàn tác!
                                            Hãy quyết định chắc chắn với lựa
                                            chọn của bạn.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <DialogClose>
                                            <Button
                                                className="p-3 bg-red-600 rounded-lg font-medium text-white dark:text-blue-500 hover:bg-red-800 text-sm px-5 py-2.5 me-2 mb-2"
                                                type="submit"
                                                onClick={handleReject}
                                                variant="secondary"
                                            >
                                                Từ chối yêu cầu
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    ) : (
                        <span className="text-red-500">
                            Không có thông tin!
                        </span>
                    )}
                </td>
            </tr>
        </>
    );
}

interface RequestTableProps {
    requests?: ClubRequest[];
    refetch: () => void;
    // refetch: () => QueryActionCreatorResult<
    //     QueryDefinition<
    //         string | undefined,
    //         BaseQueryFn<
    //             string | FetchArgs,
    //             unknown,
    //             FetchBaseQueryError,
    //             Record<string, never>,
    //             FetchBaseQueryMeta
    //         >,
    //         never,
    //         ClubRequest[],
    //         "commonApi"
    //     >
    // >;
}

function RequestTable({requests, refetch}: RequestTableProps) {
    // const dispatch = useDispatch();
    // const acceptClubRequestAdmin = (id: string) => {
    //     dispatch(acceptClubRequest(id));
    // };

    return (
        <div className="bg-gray-50 p-6 mt-4 rounded-md">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-50 dark:bg-gray-900">
                    <caption className="p-5 text-4xl font-semibold text-left rtl:text-right text-gray-900 dark:text-white dark:bg-gray-800">
                        Quản lý yêu cầu tạo Câu Lạc Bộ
                        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                            Quản lý nhanh chóng và hiệu quả
                        </p>
                    </caption>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <Toaster />
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Tên câu lạc bộ
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Địa chỉ
                            </th>
                            <th scope="col" className="px-6 py-3">
                                SĐT chủ sân
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Trạng thái
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Giờ mở - Giờ đóng
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests &&
                            requests.map((request) => (
                                <InputData
                                    key={request.id}
                                    clubRequest={request}
                                    refetch={refetch}
                                    // id={request.id}
                                    // clubName={request.clubName}
                                    // clubAddress={request.clubAddress}
                                    // clubPhone={request.clubPhone}
                                    // clubDescription={request.clubDescription}
                                    // status={request.status}
                                    // openTime={request.openTime}
                                    // closeTime={request.closeTime}
                                    // refetch={refetch}
                                />
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RequestTable;
