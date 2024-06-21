import formatTime from "@/lib/time.util";
import {useGetClubDetailQuery} from "@/store/services/clubs/club.api";
import {useNavigate, useParams} from "react-router-dom";

function Header() {
    const {Id} = useParams();
    const {data: club, isLoading, isError} = useGetClubDetailQuery(Id);
    // console.log(club);
    const navigate = useNavigate();
    if (isLoading) return <div>is loading...</div>;
    if (isError) return <div>Error in loading data</div>;
    return (
        <div>
            <div className="m-2 border-2 p-4 rounded-lg border-black">
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        Club's Reviews
                    </span>{" "}
                    Manager
                </h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    The{" "}
                    <strong className="font-semibold text-gray-900 dark:text-white">
                        Club's Reviews Manager
                    </strong>{" "}
                    section is dedicated to monitoring, responding to, and
                    leveraging customer feedback across various platforms. This
                    system ensures that all reviews, whether positive or
                    negative, are addressed promptly and constructively,
                    enhancing the club's reputation and improving customer
                    satisfaction.
                </p>
            </div>
            <>
                <section className="m-2 rounded-lg bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
                    <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                            {club?.clubName}
                        </h1>
                        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                            Contact: {club?.clubPhone}
                        </p>
                        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                            Address: {club?.clubAddress}
                        </p>
                        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                            Working hours: {formatTime(club?.openTime)} -{" "}
                            {formatTime(club?.closeTime)}
                        </p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                            <a
                                onClick={() => {
                                    navigate(`/clubs/${club?.id}`);
                                }}
                                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                            >
                                Go to club page
                                <svg
                                    className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
                            >
                                Learn more
                            </a>
                        </div>
                    </div>
                </section>
            </>
        </div>
    );
}

export default Header;
