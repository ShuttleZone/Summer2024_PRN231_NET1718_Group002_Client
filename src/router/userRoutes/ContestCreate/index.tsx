import CourtSchedule from "@/components/CourtSchedule";
import DatePicker from "@/components/DatePicker";
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
import {Textarea} from "@/components/ui/textarea";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

const formSchema = z.object({
    courtId: z
        .string({
            required_error: "Court is invalid",
        })
        .min(1, "Court is required"),
    policy: z
        .string({
            required_error: "Contest policy is required",
        })
        .min(1, "Contest policy is required"),
    name: z.string({
        required_error: "Name is required",
    }),
    phone: z
        .string({
            required_error: "Phone number is required",
        })
        .regex(/^\d{10}$/, "Phone number is invalid"),
    startTime: z.string({
        required_error: "Start time is required",
    }),
    endTime: z.string({
        required_error: "End time is required",
    }),
});

function ContestCreate() {
    const defaultValues = {
        courtId: "",
        policy: "",
        startTime: "",
        endTime: "",
    };
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <div className="w-3/4 m-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                        <div className="flex flex-col justify-center items-center py-4 px-16 my-4">
                            <h1 className="font-semibold text-3xl">
                                Create a Contest
                            </h1>
                            <p>Choose a date and time for your contest.</p>
                        </div>
                        <h2 className="text-xl text-center font-semibold">
                            Choose a time
                        </h2>
                        <div className="flex flex-row justify-between w-full px-8 mb-8">
                            <div className="h-fit w-full mr-8 shadow-lg border-2">
                                <DatePicker
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                />
                                <CourtSchedule selectedDate={selectedDate} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start w-full px-8 mb-8">
                        <h2 className="text-xl text-center font-semibold w-full">
                            Personal Information
                        </h2>
                        <div className="grid grid-cols-2 gap-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel htmlFor="name">
                                            Name
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
                                name="phone"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel htmlFor="phone">
                                            Phone Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} id="phone" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="policy"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel htmlFor="policy">
                                            Policy
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea {...field} id="policy" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                        <div className="text-end">
                            <Button
                                type="submit"
                                className="bg-green-600 rounded-xl text-lg mt-8"
                            >
                                Create Contest
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default ContestCreate;
