// import {AcceptClubRequest, ClubRequest} from "@/@types/api";
import {ClubRequest} from "@/@types/api";
import formatTime from "@/lib/time.util";
import {useAcceptClubRequestMutation} from "@/store/services/clubsAdmin/clubAdmin.api";
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

("use client");

function InputData({
    id,
    clubName,
    clubAddress,
    clubPhone,
    // clubDescription,
    status,
    openTime,
    closeTime,
}: ClubRequest) {
    // const [open, setOpen] = React.useState(false);
    const [_, setOpen] = React.useState(true);
    // const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
    // const [acceptRequest, acceptRequestResult] = useAcceptClubRequestMutation();
    const [acceptRequest] = useAcceptClubRequestMutation();
    const {toast} = useToast();

    const handleAccept = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        const result = acceptRequest({id});
        if (result.arg.track == true) {
            toast({
                variant: "default",
                description: "Request accepted !",
            });
            setOpen(false);
        } else {
            toast({
                variant: "destructive",
                description: "Error in server !",
            });
        }
    };
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
                            {clubName}
                        </div>
                        {/* <div className="font-normal text-gray-500">
                                        neil.sims@flowbite.com
                                    </div> */}
                    </div>
                </th>
                <td className="px-6 py-4">{clubAddress}</td>
                <td className="px-6 py-4">{clubPhone}</td>
                <td className="px-6 py-4">{status}</td>
                <td className="px-6 py-4">
                    {formatTime(openTime.toString())} -{" "}
                    {formatTime(closeTime.toString())}
                </td>
                <td className="px-6 py-4">
                    <Dialog>
                        <DialogTrigger
                            onClick={() => setOpen(true)}
                            key={id}
                            className="p-3 bg-green-600 rounded-lg font-medium text-white dark:text-blue-500 hover:bg-green-800 text-sm px-5 py-2.5 me-2 mb-2"
                        >
                            Accept
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Are you absolutely sure to accept this
                                    request?
                                </DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your account and remove
                                    your data from our servers.
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
                                        Accept the request
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger className="p-3 bg-red-600 rounded-lg font-medium text-white dark:text-blue-500 hover:bg-red-800 text-sm px-5 py-2.5 me-2 mb-2">
                            Reject
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Are you absolutely sure to reject this
                                    request?
                                </DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your account and remove
                                    your data from our servers.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        className="p-3 bg-red-600 rounded-lg font-medium text-white dark:text-blue-500 hover:bg-red-800 text-sm px-5 py-2.5 me-2 mb-2"
                                        type="submit"
                                    >
                                        Reject the request
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </td>
            </tr>
        </>
    );
}

interface RequestTableProps {
    requests?: ClubRequest[];
}

function RequestTable({requests}: RequestTableProps) {
    // const dispatch = useDispatch();
    // const acceptClubRequestAdmin = (id: string) => {
    //     dispatch(acceptClubRequest(id));
    // };

    return (
        <div className="bg-gray-50 p-6 mt-4 rounded-md">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-50 dark:bg-gray-900">
                    <caption className="p-5 text-4xl font-semibold text-left rtl:text-right text-gray-900 dark:text-white dark:bg-gray-800">
                        Club Creation Requests
                        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                            Efficiently manage and respond to creation requests
                        </p>
                    </caption>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <Toaster />
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Club Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Owner Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Open - Closed
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests &&
                            requests.map((request) => (
                                <InputData
                                    key={request.id}
                                    id={request.id}
                                    clubName={request.clubName}
                                    clubAddress={request.clubAddress}
                                    clubPhone={request.clubPhone}
                                    clubDescription={request.clubDescription}
                                    status={request.status}
                                    openTime={request.openTime}
                                    closeTime={request.closeTime}
                                />
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RequestTable;
