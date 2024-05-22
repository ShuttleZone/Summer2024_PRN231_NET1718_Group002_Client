import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function Filter() {
    return (
        <div className="flex justify-between items-center p-4 border border-black/20 rounded-md shadow-md shadow-gray-300/50">
            <div>
                <span className="text-green-600">999 </span>
                <span>clubs are listed</span>
            </div>
            <div>
                <div className="flex justify-between items-center gap-2 px-2 py-1 border border-black/20 rounded-md">
                    <p className="opacity-50 text-sm font-semibold">Sort By</p>
                    <Select>
                        <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Relavance" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="relavance">Relavance</SelectItem>
                            <SelectItem value="distance">Distance</SelectItem>
                            <SelectItem value="price">Price</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}

export default Filter;
