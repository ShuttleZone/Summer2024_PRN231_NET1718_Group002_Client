import {useState, useEffect, FormEvent} from "react";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {
    useGetPackageDetailQuery,
    useUpdatePackageMutation,
} from "@/store/services/packs/package.api";
import {Label} from "@radix-ui/react-dropdown-menu";
import {UpdatePackage} from "@/@types/api";

interface UpdateDialogProps {
    id: string;
}

function UpdateDialog({id}: UpdateDialogProps) {
    const {data: packageDetail, isError} = useGetPackageDetailQuery(id);
    const [updateData, setUpdateData] = useState<UpdatePackage>({
        name: packageDetail?.name ?? "",
        description: packageDetail?.description ?? "",
        packageType: packageDetail?.packageType ?? "",
        price: packageDetail?.price ?? 0,
        id: packageDetail?.id ?? "nothning",
    });
    const [updatePackage] = useUpdatePackageMutation();

    useEffect(() => {
        if (packageDetail) {
            setUpdateData({
                id: packageDetail.id,
                name: packageDetail.name,
                description: packageDetail.description,
                packageType: packageDetail.packageType,
                price: packageDetail.price,
            });
        }
    }, [packageDetail]);

    if (isError) return <div>error</div>;

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await updatePackage({...updateData});
        } catch (error) {
            console.error("Failed to update package:", error);
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <Button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                        Chỉnh sửa
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin gói cước</DialogTitle>
                        <DialogDescription>
                            Chỉnh sửa thông tin chi tiết của gói cước dưới đây
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full gap-2 mt-2">
                            <Label className="text-sm font-medium">Tên</Label>
                            <Input
                                required
                                placeholder="Tên gói"
                                value={updateData.name}
                                onChange={(event) =>
                                    setUpdateData({
                                        ...updateData,
                                        name: event.target.value,
                                    })
                                }
                            />
                            <Label className="text-sm font-medium">
                                Mô tả chi tiết
                            </Label>
                            <Textarea
                                required
                                placeholder="Mô tả chi tiết"
                                value={updateData.description}
                                onChange={(event) =>
                                    setUpdateData({
                                        ...updateData,
                                        description: event.target.value,
                                    })
                                }
                            />
                            <Label className="text-sm font-medium">
                                Chọn loại gói
                            </Label>
                            <select
                                value={updateData.packageType}
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(event) =>
                                    setUpdateData({
                                        ...updateData,
                                        packageType: event.target.value,
                                    })
                                }
                            >
                                <option value="0">Gói tháng</option>
                                <option value="1">Gói năm</option>
                                <option value="2">Gói vô hạn</option>
                            </select>

                            <Label className="text-sm font-medium">Giá</Label>
                            <div className="flex rounded-md pl-2 shadow-sm ring-1 ring-inset ring-gray-300  w-full">
                                <Input
                                    required
                                    type="number"
                                    step={5000}
                                    className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="100.000"
                                    min={0}
                                    value={updateData.price}
                                    onChange={(event) =>
                                        setUpdateData({
                                            ...updateData,
                                            price: event.target.valueAsNumber,
                                        })
                                    }
                                />
                                <span className="flex select-all items-center pr-3 text-gray-500 sm:text-sm">
                                    VNĐ
                                </span>
                            </div>
                            <Button
                                className="mt-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                type="submit"
                            >
                                Lưu chỉnh sửa
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default UpdateDialog;
