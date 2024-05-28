function ConfirmBooking() {
    return (
        <div className="mb-16">
            <div className="flex flex-col justify-center items-center py-4 px-16 my-4">
                <h1 className="font-semibold text-2xl">Order Confirmation</h1>
                <p>
                    Booking confirmed. Contact support for changes/inquiries.
                    Enjoy your training experience with us.
                </p>
            </div>
            <div className="w-full h-fit border-2 border-gray-200 px-4 py-8">
                <h1 className="text-2xl font-semibold my-4">
                    Reservation Detail
                </h1>
                <div className="w-full ">
                    <h1 className="text-xl font-semibold">Personal Detail</h1>
                    <div className="flex flex-row mt-4 gap-20 border-b-2 border-b-gray-300 pb-8 my-4">
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">User Name</h1>
                            <p>nguyen hung hai</p>
                        </div>
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">
                                Created reservation date
                            </h1>
                            <p>27th April 2024</p>
                        </div>
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">
                                Phone Number
                            </h1>
                            <p>0123456789</p>
                        </div>
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">Email</h1>
                            <p>abc@gmail.com</p>
                        </div>
                    </div>

                    <h1 className="text-xl font-semibold">Booking Detail</h1>
                    <div className="flex flex-row mt-4 gap-20 border-b-2 border-b-gray-300 pb-8 my-4">
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">
                                Total slot
                            </h1>
                            <p>3</p>
                        </div>

                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">
                                Appointment slot
                            </h1>
                            <p>27/5/2024 | 7:00-8:00 | Court A</p>
                            <p>27/5/2024 | 7:00-8:00 | Court B</p>
                            <p>27/5/2024 | 8:00-9:00 | Court B</p>
                        </div>

                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">Subtotal</h1>
                            <p className="text-green-700">200000 VND</p>
                        </div>
                    </div>

                    <h1 className="text-xl font-semibold">Court Detail</h1>
                    <div className="flex flex-row mt-4 gap-20 border-b-2 border-b-gray-300 pb-8 my-4">
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">Club Name</h1>
                            <p>badminton pro vip club</p>
                        </div>
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">
                                Club Address
                            </h1>
                            <p>123 Pham Van Dong, Go Vap, Tp.HCM</p>
                        </div>
                        <div className="w-62 h-fit">
                            <h1 className="text-lg font-semibold">
                                Club Phone
                            </h1>
                            <p>0789456123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ConfirmBooking;
