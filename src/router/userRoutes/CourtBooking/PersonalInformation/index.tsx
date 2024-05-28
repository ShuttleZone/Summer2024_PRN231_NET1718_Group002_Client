function PersonalInformation() {
    return (
        <div className="mb-16">
            <div className="flex flex-col justify-center items-center py-4 px-16 my-4">
                <h1 className="font-semibold text-2xl">Personal Information</h1>
                <p>
                    Ensure accurate and complete information for a smooth
                    booking process.
                </p>
            </div>

            <form className="border-2 border-gray-200 px-8 md:px-16 py-4 md:py-8 rounded-md">
                <h1 className="text-2xl py-4 border-y-2 border-b-gray-400 font-semibold">
                    Personal Information
                </h1>
                <div className="py-2">
                    <label className="block text-xl font-semibold">Name</label>
                    <input
                        id="name"
                        className="w-full rounded-md h-10 bg-gray-100 text-gray-600 text-xl my-4 pl-8 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-700"
                        type="text"
                        placeholder="Enter your name"
                        aria-label="Name"
                        aria-required="true"
                        required
                    />
                </div>
                <div className="py-2">
                    <label className="block text-xl font-semibold">Email</label>
                    <input
                        id="email"
                        className="w-full rounded-md h-10 bg-gray-100 text-gray-600 text-xl my-4 pl-8 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-700"
                        type="email"
                        placeholder="Enter your email address"
                        aria-label="Email"
                        aria-required="true"
                        required
                    />
                </div>
                <div className="py-2">
                    <label className="block text-xl font-semibold">
                        Phone number
                    </label>
                    <input
                        id="phone"
                        className="w-full rounded-md h-10 bg-gray-100 text-gray-600 text-xl my-4 pl-8 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-700"
                        type="text"
                        pattern="[0-9]{10}"
                        placeholder="Enter your phone number"
                        aria-label="Phone number"
                        aria-required="true"
                        required
                    />
                    <small className="text-gray-500">
                        Format: 123-456-7890
                    </small>
                </div>
                <div className="py-2">
                    <label className="block text-xl font-semibold">Notes</label>
                    <textarea
                        id="notes"
                        className="w-full rounded-md h-32 bg-gray-100 text-gray-600 text-xl my-4 pl-8 font-semibold pt-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
                        placeholder="Enter your note"
                        aria-label="Notes"
                    ></textarea>
                </div>
                <div className="py-4 flex justify-center items-center">
                    <button
                        type="submit"
                        className="w-1/3 bg-green-500 transition-colors duration-300 text-white text-xl font-semibold py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                    >
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
}
export default PersonalInformation;
