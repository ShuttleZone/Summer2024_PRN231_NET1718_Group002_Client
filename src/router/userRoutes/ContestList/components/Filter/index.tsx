function SortBar() {
    return (
        <div className="sorting-panel">
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 p-5 bg-gray-50 rounded-md">
                <li className="mr-3">
                    <a
                        className="inline-block text-white bg-slate-900 rounded-lg active py-3 px-7 aria-selected:"
                        href="#"
                    >
                        All Contest
                    </a>
                </li>

                <li className="mr-3">
                    <a
                        className="inline-block rounded-lg hover:bg-slate-900 hover:border-slate-900 hover:text-white text-stone-500 py-3 px-7"
                        href="#"
                    >
                        Upcoming
                    </a>
                </li>

                <li className="mr-3">
                    <a
                        className="inline-block rounded-lg hover:bg-slate-900 hover:border-slate-900 hover:text-white text-stone-500 py-3 px-7"
                        href="#"
                    >
                        On Going
                    </a>
                </li>

                <li className="mr-3">
                    <a
                        className="inline-block rounded-lg hover:bg-slate-900 hover:border-slate-900 hover:text-white text-stone-500 py-3 px-7"
                        href="#"
                    >
                        Completed
                    </a>
                </li>

                <li className="mr-3">
                    <a
                        className="inline-block rounded-lg hover:bg-slate-900 hover:border-slate-900 hover:text-white text-stone-500 py-3 px-7"
                        href="#"
                    >
                        Cancelled
                    </a>
                </li>
            </ul>
        </div>
    );
}

function SortingBar() {
    return (
        <div className="sorting-info">
            <div className="sorting-buttons">
                <ul>
                    <SortBar />
                </ul>
            </div>
        </div>
    );
}

export default SortingBar;
