// import {Button} from "@/components/ui/button";
import {IoSearchOutline} from "react-icons/io5";

function HowWeWord() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-start py-32 gap-20 border-2 border-b-black">
            <div className="w-2/3 h-fit py-2">
                <h1 className="text-4xl text-center font-bold bg-gradient-to-r from-slate-400 to-lime-500 bg-clip-text text-transparent">
                    Cách chúng tôi hoạt động
                </h1>
                <h1 className="text-xl text-center mt-4 font-semibold">
                    Nhanh chóng, Tiện lợi và Nhiệt tình
                </h1>
            </div>
            <div className="flex flex-row w-2/3 justify-between py-6">
                <div className="w-1/4 h-fit flex flex-col gap-5 items-center shadow-md px-2 shadow-gray-400 rounded-2xl py-8 justify-between py-2">
                    <IoSearchOutline className="text-4xl" />
                    <div className="flex flex-col justify-center ">
                        <h1 className="text-lg text-center font-semibold">
                            Tham gia với chúng tôi
                        </h1>
                        <span className="text-s text-center">
                            Đăng kí một cách nhanh chóng: hãy làm quen với hệ
                            thống chúng tôi bắt đầu từ việc tạo tài khoản
                        </span>
                    </div>
                    {/* <Button className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white bg-white">
                        Đăng kí ngay
                    </Button> */}
                </div>
                <div className="w-1/4 h-fit flex flex-col gap-5 items-center shadow-md px-2 shadow-gray-400 rounded-2xl py-8 justify-between py-2">
                    <IoSearchOutline className="text-4xl" />
                    <div className="flex flex-col justify-center ">
                        <h1 className="text-lg text-center font-semibold">
                            Tham gia với chúng tôi
                        </h1>
                        <span className="text-s text-center">
                            Đăng kí một cách nhanh chóng: hãy làm quen với hệ
                            thống chúng tôi bắt đầu từ việc tạo tài khoản
                        </span>
                    </div>
                    {/* <Button className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white bg-white">
                        Đăng kí ngay
                    </Button> */}
                </div>
                <div className="w-1/4 h-fit flex flex-col gap-5 items-center shadow-md px-2 shadow-gray-400 rounded-2xl py-8 justify-between py-2">
                    <IoSearchOutline className="text-4xl" />
                    <div className="flex flex-col justify-center ">
                        <h1 className="text-lg text-center font-semibold">
                            Tham gia với chúng tôi
                        </h1>
                        <span className="text-s text-center">
                            Đăng kí một cách nhanh chóng: hãy làm quen với hệ
                            thống chúng tôi bắt đầu từ việc tạo tài khoản
                        </span>
                    </div>
                    {/* <Button className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white bg-white">
                        Đăng kí ngay
                    </Button> */}
                </div>
            </div>
        </div>
    );
}
export default HowWeWord;
