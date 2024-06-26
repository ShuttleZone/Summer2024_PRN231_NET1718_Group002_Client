import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {IoSearchOutline} from "react-icons/io5";
function WallPaper() {
    return (
        <div className="w-full h-screen relative">
            <img src="/public/wallpaper.jpg" className="w-full h-full" alt="" />
            <div className="w-1/2 h-1/3 absolute top-1/3 right-1/3">
                <h1 className="text-6xl text-white font-bold">
                    Chọn sân của bạn và bắt đầu tập luyện cùng{" "}
                    <span className="text-green-300">Shuttle Zone</span>
                </h1>
                <div>
                    <div className="mt-8 flex flex-row w-full justify-between py-8 px-16 bg-white rounded-2xl items-center">
                        <div className="flex flex-col w-2/3">
                            <label htmlFor="" className="text-lg mb-2">
                                Địa điểm
                            </label>
                            <div className="flex flex-row justify-between">
                                <Select>
                                    <SelectTrigger className="w-2/3">
                                        <SelectValue placeholder="Chọn địa điểm của bạn" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">
                                            Quận 1
                                        </SelectItem>
                                        <SelectItem value="dark">
                                            Quận 2
                                        </SelectItem>
                                        <SelectItem value="system">
                                            Quận 3
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className="bg-gradient-to-r from-[#badfcc] to-[#0fe712d5]">
                                    <IoSearchOutline />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default WallPaper;
