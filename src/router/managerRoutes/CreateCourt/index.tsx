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
import {useAppDispatch} from "@/store";
import {hideSpinner, showSpinner} from "@/store/slices/spinner.slice";
import {useCreateCourtMutation} from "@/store/services/courts/court.api";
import {useToast} from "@/components/ui/use-toast";

const formSchema = z.object({
    clubId: z
        .string({
            required_error: "Club is required",
        })
        .min(1, "Club is required"),
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
        (value) => parseInt(value as string),
        z.number().int().nonnegative()
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

function CreateCourt() {
    const defaultValues = {
        clubId: "",
        name: "",
    };
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });
    const {toast} = useToast();
    const dispatch = useAppDispatch();
    const [createCourt, {isLoading}] = useCreateCourtMutation();

    isLoading ? dispatch(showSpinner()) : dispatch(hideSpinner());

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("clubId", values.clubId);
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
        }
    };

    return (
        <div className="py-20 w-3/4 m-auto">
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
                                        Court Name
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
                            name="clubId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel htmlFor="clubId">Club</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value.toString()}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your club" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="d91de014-9979-4432-af51-430455d233b1">
                                                Club 1
                                            </SelectItem>
                                            <SelectItem value="3813333e-6832-4602-b1e4-48919f37bda0">
                                                Club 2
                                            </SelectItem>
                                            <SelectItem value="229ecfb3-9cb3-44f0-9062-65da986422ed">
                                                Club 3
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                        Court Type
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value?.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select court type" />
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
                                        Court Status
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value?.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select court status" />
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
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel htmlFor="courtPrice">
                                        Court Price
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
                    <div className="self-end flex justify-between gap-4">
                        <Button
                            onClick={() => form.reset(defaultValues)}
                            type="reset"
                            variant={"destructive"}
                        >
                            Reset
                        </Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default CreateCourt;
