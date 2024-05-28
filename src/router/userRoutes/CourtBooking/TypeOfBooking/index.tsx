function TypeOfBooking() {
    return (
        <div className="flex flex-col my-20">
            <div className="flex flex-col justify-center items-center py-4 px-16 my-8">
                <h1 className="font-semibold text-3xl">Book a court</h1>
                <p>Choose your most appropriate combo</p>
            </div>
            <div className="flex flex-col justify-center items-center py-4 px-16 my-4">
                <h1 className="font-semibold text-3xl">
                    How do you prefer to book your court
                </h1>
                <p>Please Select The Options below</p>
            </div>
            <div className="flex flex-row justify-center items-center gap-5">
                <div className="w-96 h-32 bg-slate-400 flex justify-between items-center px-8 text-white rounded-2xl hover:bg-green-500 transition-colors duration-300 hover:cursor-pointer">
                    <h1 className="text-3xl">Single Slot</h1>
                    <span className="text-3xl">&gt;</span>
                </div>
                <div className="w-96 h-32 bg-slate-400 flex justify-between items-center px-8 text-white rounded-2xl hover:bg-green-500 transition-colors duration-300 hover:cursor-pointer">
                    <h1 className="text-3xl">Multiple Slot</h1>
                    <span className="text-3xl">&gt;</span>
                </div>
            </div>
        </div>
    );
}
export default TypeOfBooking;