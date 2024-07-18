function ContestHeader() {
    return (
        <div className="mb-2">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    Quản lý
                </span>{" "}
                các cuộc tranh đấu
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Đây là phần để các nhân viên kiểm tra, cập nhật cho các cuộc
                tranh đấu diễn ra ở câu lạc bộ.
            </p>
        </div>
    );
}

export default ContestHeader;
