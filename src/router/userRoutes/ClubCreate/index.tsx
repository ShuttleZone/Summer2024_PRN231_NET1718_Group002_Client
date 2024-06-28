import React, {useState} from "react";

function ClubCreate() {
    const [clubName, setClubName] = useState<string>("");
    const [clubAddress, setClubAddress] = useState<string>("");
    const [clubPhone, setClubPhone] = useState<string>("");
    const [clubDescription, setClubDescription] = useState<string>("");
    const [openTime, setOpenTime] = useState<string>("");
    const [closeTime, setCloseTime] = useState<string>("");
    const [minDuration, setMinDuration] = useState<number | "">("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (
            !clubName ||
            !clubAddress ||
            !clubPhone ||
            !clubDescription ||
            !openTime ||
            !closeTime ||
            minDuration === ""
        ) {
            setErrorMessage("Please fill out all fields.");
            return;
        }
        // Proceed with form submission logic
    };

    return (
        <div className="w-3/4 m-auto h-fit border-2 border-red-400 flex flex-col items-center bg-slate-200 ">
            <div className="my-8">
                <h1 className="text-3xl font-semibold">
                    Join your club with us
                </h1>
            </div>
            <form className="w-full h-full my-12" onSubmit={handleSubmit}>
                <div className="flex flex-col px-40 w-4/5 m-auto ">
                    <div className="flex flex-row my-8">
                        <div className="text-xl bg-slate-100 px-4 py-2 h-12 w-1/6 rounded-l-3xl">
                            Club Name
                        </div>
                        <input
                            type="text"
                            className="text-xl py-2 h-12 w-3/4 rounded-r-3xl"
                            value={clubName}
                            onChange={(e) => setClubName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row my-8">
                        <div className="text-xl bg-slate-100 px-4 py-2 h-12 w-1/6 rounded-l-3xl">
                            Club Address
                        </div>
                        <input
                            type="text"
                            className="text-xl py-2 h-12 w-3/4 rounded-r-3xl"
                            value={clubAddress}
                            onChange={(e) => setClubAddress(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row my-8">
                        <div className="text-xl bg-slate-100 px-4 py-2 h-12 w-1/6 rounded-l-3xl">
                            Club Phone
                        </div>
                        <input
                            type="text"
                            className="text-xl py-2 h-12 w-3/4 rounded-r-3xl"
                            value={clubPhone}
                            onChange={(e) => setClubPhone(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row my-8">
                        <div className="text-xl bg-slate-100 px-4 py-2 h-24 w-1/6 rounded-l-3xl ">
                            Club Description
                        </div>
                        <textarea
                            className="text-xl py-2 h-24 w-3/4 rounded-r-3xl"
                            value={clubDescription}
                            onChange={(e) => setClubDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row my-8">
                        <div className="text-xl bg-slate-100 px-4 py-2 h-12 w-1/6 rounded-l-3xl">
                            Opening Time
                        </div>
                        <input
                            type="time"
                            id="start-time"
                            className="bg-gray-50 border text-xl leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            min="09:00"
                            max="18:00"
                            required
                            value={openTime}
                            onChange={(e) => setOpenTime(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row my-8">
                        <div className="text-xl bg-slate-100 px-4 py-2 h-12 w-1/6 rounded-l-3xl">
                            Closing Time
                        </div>
                        <input
                            type="time"
                            id="start-time"
                            className="text-xl bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            min="09:00"
                            max="18:00"
                            required
                            value={closeTime}
                            onChange={(e) => setCloseTime(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row my-8">
                        <div className="text-xl bg-slate-100 px-4 py-2 h-12 w-1/6 rounded-l-3xl">
                            Minimum Duration
                        </div>
                        <input
                            type="number"
                            className="text-xl pl-8 py-2 h-12 w-3/4 rounded-r-3xl"
                            value={minDuration}
                            onChange={(e) =>
                                setMinDuration(parseInt(e.target.value))
                            }
                        />
                    </div>
                    <div className="w-full">{/*<MultiFileInput />*/}</div>
                    {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                    )}
                    <button
                        type="submit"
                        className="text-xl py-2 h-12 w-1/4 m-auto mt-8 bg-blue-500 text-white rounded-full"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ClubCreate;
