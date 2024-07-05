import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import CreateCourtPopup from "./CreateCourtPopup";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {useState} from "react";
import formatVietnameseDong from "@/lib/currency.util";
import {FormChildProps} from "..";
import {FormField, FormItem, FormMessage} from "@/components/ui/form";

interface Court {
    courtName: string;
    courtType: number;
    courtStatus: number;
    price: number;
}

const transformCourtType = (value: number) => {
    switch (value) {
        case 0:
            return "Theo khung giờ";
        case 1:
            return "Theo ngày";
        default:
            return "Không xác định";
    }
};

const transformCourtStatus = (value: number) => {
    switch (value) {
        case 0:
            return "Còn trống";
        case 1:
            return "Đã đặt";
        case 2:
            return "Đang bảo trì";
        default:
            return "Không xác định";
    }
};

function CourtsInput({form}: FormChildProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [courts, setCourts] = useState<Court[]>([]);

    const handleAddCourt = (values: any) => {
        const court: Court = {
            courtName: values.name,
            courtType: values.courtType,
            courtStatus: values.courtStatus,
            price: values.price,
        };
        const newCourts = [...courts, court];
        setCourts(newCourts);
        form.setValue("courts", newCourts as any);
        form.trigger("courts");
        setIsDialogOpen(false);
    };

    const handleRemoveCourt = (index: number) => {
        const newCourts = [...courts];
        newCourts.splice(index, 1);
        setCourts(newCourts);
    };

    return (
        <>
            <Accordion
                type="single"
                collapsible
                className="w-full h-fit bg-slate-100 py-8 px-8 my-4"
                defaultValue="item-1"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <h1 className="text-2xl font-semibold ">Sân</h1>
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                        <FormField
                            control={form.control}
                            name="courts"
                            render={() => (
                                <FormItem>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <ul className="flex flex-col gap-4">
                            {courts.map((court, index) => (
                                <li
                                    key={index}
                                    className="grid grid-cols-12 items-center"
                                >
                                    <span className="col-span-3">
                                        {court.courtName}
                                    </span>
                                    <span className="col-span-3">
                                        {transformCourtType(court.courtType)}
                                    </span>
                                    <span className="col-span-3">
                                        {transformCourtStatus(
                                            court.courtStatus
                                        )}
                                    </span>
                                    <span className="col-span-2">
                                        Giá:{" "}
                                        {formatVietnameseDong(
                                            court.price,
                                            "VND"
                                        )}
                                        đ
                                    </span>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant={"destructive"}
                                                type="button"
                                                className="col-span-1"
                                            >
                                                Xóa
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Xác nhận xóa sân
                                                </DialogTitle>
                                            </DialogHeader>
                                            <DialogDescription>
                                                <p>
                                                    Bạn có chắc chắn muốn xóa
                                                    sân này?
                                                </p>
                                            </DialogDescription>
                                            <DialogTrigger className="flex justify-end items-center gap-4">
                                                <Button
                                                    type="button"
                                                    className="col-span-1"
                                                >
                                                    Hủy
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        handleRemoveCourt(index)
                                                    }
                                                    variant={"destructive"}
                                                    type="button"
                                                    className="col-span-1"
                                                >
                                                    Xóa
                                                </Button>
                                            </DialogTrigger>
                                        </DialogContent>
                                    </Dialog>
                                </li>
                            ))}
                        </ul>
                        <div className="w-full flex justify-center">
                            <Dialog
                                open={isDialogOpen}
                                onOpenChange={setIsDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button
                                        type="button"
                                        className="bg-green-500 text-xl"
                                    >
                                        Thêm sân
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Thêm sân mới</DialogTitle>
                                    </DialogHeader>
                                    <CreateCourtPopup
                                        onSubmit={handleAddCourt}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    );
}

export default CourtsInput;
