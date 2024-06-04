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

function CreateCourt() {
    const defaultValues = {
        clubId: "",
        name: "",
        courtStatus: 0,
        courtType: 0,
    };
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("create court", values);
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
                                            <SelectItem value="aodmfadf">
                                                Club 1
                                            </SelectItem>
                                            <SelectItem value="aodmfadsfwjj">
                                                Club 2
                                            </SelectItem>
                                            <SelectItem value="odmfadsf">
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
                                        value={field.value.toString()}
                                        defaultValue={field.value.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select court type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="0">
                                                Outdoor
                                            </SelectItem>
                                            <SelectItem value="1">
                                                Indoor
                                            </SelectItem>
                                            <SelectItem value="2">
                                                WTF
                                            </SelectItem>
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
                                        value={field.value.toString()}
                                        defaultValue={field.value.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select court status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="0">
                                                Available
                                            </SelectItem>
                                            <SelectItem value="1">
                                                Occupied
                                            </SelectItem>
                                            <SelectItem value="2">
                                                Maintainance
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
