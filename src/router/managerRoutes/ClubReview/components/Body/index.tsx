import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useGetClubReviewsQuery} from "@/store/services/reviews/review.api";
import {useParams} from "react-router-dom";

function AllReviews() {
    const {Id} = useParams();
    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    };

    const {data: reviews, isLoading} = useGetClubReviewsQuery(Id);
    console.log(reviews);
    if (isLoading) return <div>is loading...</div>;
    if (reviews?.length == 0) {
        return (
            <div>
                {" "}
                <p className="text-lg font-normal text-center p-4 text-gray-500 lg:text-xl dark:text-gray-400">
                    <strong className="font-semibold text-gray-900 dark:text-white">
                        This Club does not has any review yet !
                    </strong>{" "}
                </p>
            </div>
        );
    }
    return (
        <>
            {reviews?.map((review) => {
                return (
                    <div className="border-2 rounded-lg p-4 m-2 border-green-500/50">
                        <article>
                            <div className="flex items-center mb-4">
                                <img
                                    className="w-10 h-10 me-4 rounded-full"
                                    src="/docs/images/people/profile-picture-5.jpg"
                                    alt=""
                                />
                                <div className="font-medium dark:text-white">
                                    <p>
                                        {review.createdBy}{" "}
                                        <time className="block text-sm text-gray-500 dark:text-gray-400">
                                            {formatDateTime(review.created)}
                                        </time>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                <svg
                                    className="w-4 h-4 text-yellow-300"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                >
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg
                                    className="w-4 h-4 text-yellow-300"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                >
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg
                                    className="w-4 h-4 text-yellow-300"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                >
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg
                                    className="w-4 h-4 text-yellow-300"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                >
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg
                                    className="w-4 h-4 text-gray-300 dark:text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                >
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <br />
                                <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
                                    Thinking to buy another one!
                                </h3>
                            </div>
                            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                <p>
                                    Reviewed in{" "}
                                    <strong> {review.clubName} </strong>
                                    on
                                    <time>
                                        <strong>
                                            {" "}
                                            {formatDateTime(review.created)}
                                        </strong>
                                    </time>
                                </p>
                            </footer>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
                                    <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
                                        " {review.comment}"
                                    </p>
                                </blockquote>
                            </p>
                            {/* <p className="mb-3 text-gray-500 dark:text-gray-400">
                    It is obviously not the same build quality as those very
                    expensive watches. But that is like comparing a Citroën to a
                    Ferrari. This watch was well under £100! An absolute
                    bargain.
                </p> */}
                            {/* <a
                    href="#"
                    className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                    Read more
                </a> */}
                            <aside>
                                {/* <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        19 people found this helpful
                    </p> */}
                                <div className="flex items-center mt-3">
                                    <a
                                        href="#"
                                        className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        Reply
                                    </a>{" "}
                                    <a
                                        href="#"
                                        className="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600"
                                    >
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                Action
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>
                                                    Review Action
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Dialog>
                                                        <DialogTrigger>
                                                            Hide Review
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    Are you
                                                                    absolutely
                                                                    sure to hide
                                                                    this review?
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    This action
                                                                    cannot be
                                                                    undone.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter>
                                                                <DialogClose>
                                                                    <Button
                                                                        className="p-3 bg-green-600 rounded-lg font-medium text-white dark:text-blue-500 hover:bg-green-800 text-sm px-5 py-2.5 me-2 mb-2"
                                                                        type="submit"
                                                                        // onClick={
                                                                        //     handleAccept
                                                                        // }
                                                                        variant="secondary"
                                                                    >
                                                                        Hide the
                                                                        review
                                                                    </Button>
                                                                </DialogClose>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Dialog>
                                                        <DialogTrigger>
                                                            Delete Review
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    Are you
                                                                    absolutely
                                                                    sure to
                                                                    reject this
                                                                    request?
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    This action
                                                                    cannot be
                                                                    undone. This
                                                                    will
                                                                    permanently
                                                                    delete your
                                                                    account and
                                                                    remove your
                                                                    data from
                                                                    our servers.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter>
                                                                <DialogClose>
                                                                    <Button
                                                                        className="p-3 bg-red-600 rounded-lg font-medium text-white dark:text-blue-500 hover:bg-red-800 text-sm px-5 py-2.5 me-2 mb-2"
                                                                        type="submit"
                                                                        variant="secondary"
                                                                    >
                                                                        Reject
                                                                        the
                                                                        request
                                                                    </Button>
                                                                </DialogClose>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </a>
                                </div>
                            </aside>
                        </article>
                    </div>
                );
            })}
        </>
    );
}

export default AllReviews;
