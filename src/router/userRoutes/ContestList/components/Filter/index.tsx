function SortBar() {
    return (
        <div className="sorting-panel">
            <ul className="flex justify-start flex-wrap bg-gray-100 p- rounded-md p-5">
                <li className="mr-3">
                    <a
                        className="inline-block border border-slate-900 rounded-md bg-slate-900 text-white py-3 px-7"
                        href="#"
                    >
                        All Contest
                    </a>
                </li>

                <li className="mr-3">
                    <a
                        className="inline-block border border-white hover:bg-slate-900 hover:border-slate-900 hover:text-white rounded-md bg-white text-stone-500 py-3 px-7"
                        href="#"
                    >
                        Upcoming
                    </a>
                </li>

                <li className="mr-3">
                    <a
                        className="inline-block border border-white hover:bg-slate-900 hover:border-slate-900 hover:text-white rounded-md bg-white text-stone-500 py-3 px-7"
                        href="#"
                    >
                        On Going
                    </a>
                </li>

                <li className="mr-3">
                    <a
                        className="inline-block border border-white hover:bg-slate-900 hover:border-slate-900 hover:text-white rounded-md bg-white text-stone-500 py-3 px-7"
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
