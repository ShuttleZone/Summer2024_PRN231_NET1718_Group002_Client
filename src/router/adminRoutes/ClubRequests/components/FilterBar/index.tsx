function FilterBarModule() {
    return (
        <div className="filter-bar-module">
            <FilterBar />
        </div>
    );
}

function FilterBar() {
    return (
        <div className="mb-4">
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 p-5 bg-gray-50 rounded-lg">
                <li className="me-2">
                    <a
                        href="#"
                        className="inline-block px-4 py-3 text-white bg-blue-600 rounded-lg active"
                        aria-current="page"
                    >
                        All
                    </a>
                </li>
                <li className="me-2">
                    <a
                        href="#"
                        className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                        aria-current="page"
                    >
                        Pending
                    </a>
                </li>
                <li className="me-2">
                    <a
                        href="#"
                        className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                        Accepted
                    </a>
                </li>
                <li className="me-2">
                    <a
                        href="#"
                        className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                        Rejected
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default FilterBarModule;
