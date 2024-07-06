import {useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
    name: z
        .string({
            required_error: "Tên sân không được để trống",
        })
        .min(1, "Tên sân không được để trống"),
    courtType: z.preprocess(
        (value) => parseInt(!value ? "-1" : (value as string)),
        z.number().int().nonnegative("Loại sân không được để trống")
    ),
    courtStatus: z.preprocess(
        (value) => parseInt(!value ? "-1" : (value as string)),
        z.number().int().nonnegative("Tình trạng sân không được để trống")
    ),
    price: z.preprocess(
        (value) => parseFloat(value as string),
        z.number().int().nonnegative("Giá sân phải lớn hơn 0")
    ),
});

const courtTypes = [
    {
        value: 0,
        label: "Theo khung giờ",
    },
    {
        value: 1,
        label: "Theo ngày",
    },
];

const courtStatuses = [
    {
        value: 0,
        label: "Còn trống",
    },
    {
        value: 1,
        label: "Đã đặt",
    },
    {
        value: 2,
        label: "Đang bảo trì",
    },
];

interface CreateCourtPopUpProps {
    onSubmit: (values: z.infer<typeof formSchema>) => void;
}

function CreateCourtPopup({onSubmit}: CreateCourtPopUpProps) {
    const defaultValues = {
        name: "",
        price: 0,
    };
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const handleResetForm = () => {
        form.reset(defaultValues);
        form.setValue("courtType", "" as any); // eslint-disable-line @typescript-eslint/no-explicit-any
        form.setValue("courtStatus", "" as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    };

    const handleFormSubmit = () => {
        form.handleSubmit(onSubmit)();
    };

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col justify-start gap-4"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">
                                        Tên sân
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} id="name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name="price"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel htmlFor="courtPrice">
                                        Giá sân
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            id="courtPrice"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="courtType"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel htmlFor="courtType">
                                        Loại sân
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value?.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn loại sân" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {courtTypes.map((type) => (
                                                <SelectItem
                                                    key={type.value}
                                                    value={type.value.toString()}
                                                >
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name="courtStatus"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel htmlFor="courtStatus">
                                        Tình trạng sân
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value?.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn tình trạng sân" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {courtStatuses.map((status) => (
                                                <SelectItem
                                                    key={status.value}
                                                    value={status.value.toString()}
                                                >
                                                    {status.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                    </div>
                    <div className="self-end flex justify-between gap-4">
                        <Button
                            onClick={handleResetForm}
                            type="reset"
                            variant={"destructive"}
                        >
                            Đặt lại
                        </Button>
                        <Button
                            type="button"
                            onClick={handleFormSubmit}
                            className="bg-green-500"
                        >
                            Xác nhận
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default CreateCourtPopup;
