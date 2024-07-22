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
import {useCreateCourtMutation} from "@/store/services/courts/court.api";
import {useToast} from "@/components/ui/use-toast";
import {useGetClubListQuery} from "@/store/services/clubs/club.api";

const formSchema = z.object({
    name: z
        .string({
            required_error: "Court name is required",
        })
        .min(1, "Court name is required"),
    courtType: z.preprocess(
        (value) => parseInt(!value ? "-1" : (value as string)),
        z.number().int().nonnegative("Court type is required")
    ),
    courtStatus: z.preprocess(
        (value) => parseInt(!value ? "-1" : (value as string)),
        z.number().int().nonnegative("Court status is required")
    ),
    price: z.preprocess(
        (value) => parseFloat(value as string),
        z.number().int().nonnegative("Price must be a positive number")
    ),
});

const courtTypes = [
    {
        value: 0,
        label: "Date",
    },
    {
        value: 1,
        label: "Monthly",
    },
];

const courtStatuses = [
    {
        value: 0,
        label: "Available",
    },
    {
        value: 1,
        label: "Occupied",
    },
    {
        value: 2,
        label: "Under Maintainance",
    },
];

interface CreateCourtPopUpProps {
    clubId: string;
}

function CreateCourtPopUp({clubId}: CreateCourtPopUpProps) {
    const defaultValues = {
        name: "",
        price: 0,
    };
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });
    const {toast} = useToast();
    const [createCourt] = useCreateCourtMutation();
    const {refetch} = useGetClubListQuery();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("clubId", clubId);
        formData.append("courtType", values.courtType.toString());
        formData.append("courtStatus", values.courtStatus.toString());
        formData.append("price", values.price.toString());
        const {error} = await createCourt(formData);
        if (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to create court",
            });
        } else {
            toast({
                variant: "default",
                title: "Success",
                description: "Court created successfully",
            });
            form.reset(defaultValues);
            handleResetForm();
            refetch();
        }
    };

    const handleResetForm = () => {
        form.reset(defaultValues);
        form.setValue("courtType", "" as any); // eslint-disable-line @typescript-eslint/no-explicit-any
        form.setValue("courtStatus", "" as any); // eslint-disable-line @typescript-eslint/no-explicit-any
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
                                        Giá
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
                                        Trạng thái sân
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value?.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn trạng thái sân" />
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
                        <Button type="submit" className="bg-green-500">
                            Xác nhận
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default CreateCourtPopUp;
