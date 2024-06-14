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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {useToast} from "@/components/ui/use-toast";
import {formattedTimeToDateTime} from "@/lib/time.util";
import {useAppDispatch, useAppSelector} from "@/store";
import {useCreateContestMutation} from "@/store/services/contests/contest.api";
import {BookingSlot} from "@/store/slices/bookingStage.slice";
import {hideSpinner, showSpinner} from "@/store/slices/spinner.slice";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {z} from "zod";

const formSchema = z.object({
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
    maxPlayer: z
        .preprocess(
            (value) => parseInt(value as string),
            z.number().int().nonnegative()
        )
        .refine((value) => value > 0 && value % 2 === 0, {
            message: "Max players is invalid",
        }),
});

function ContestCreate() {
    const defaultValues = {
        policy: "",
        name: "",
        phone: "",
        maxPlayer: 0,
    };
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });
    const slots = useAppSelector(
        (state) => state.bookingStage.TimeAndDate.Slots
    );
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const {toast} = useToast();
    const [createContest, {isLoading}] = useCreateContestMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!slots.length) {
            toast({
                title: "Error",
                description: "Please select a slot",
                variant: "destructive",
            });
            return;
        }
        if (!allSlotsBelongToOneCourt(slots)) {
            toast({
                title: "Error",
                description: "All slots must belong to the same court",
                variant: "destructive",
            });
            return;
        }
        if (!continuousSlots(slots)) {
            toast({
                title: "Error",
                description: "Slots must be continuous",
                variant: "destructive",
            });
            return;
        }

        const courtId = slots[0].CourtId;
        const response = await createContest({
            ...values,
            contestSlots: slots.map((slot) => ({
                startTime: formattedTimeToDateTime(
                    slot.StartTime,
                    selectedDate
                ).toISOString(),
                endTime: formattedTimeToDateTime(
                    slot.EndTime,
                    selectedDate
                ).toISOString(),
            })),
            courtId,
        });

        if (response.error) {
            toast({
                title: "Error",
                description: "Failed to create contest",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Success",
            description: "Contest created successfully",
            variant: "default",
        });
        navigate("/my-invoices");
    };

    const allSlotsBelongToOneCourt = (slots: BookingSlot[]) => {
        const courtId = slots[0]?.CourtId || "";
        return slots.every((slot) => slot.CourtId === courtId);
    };

    const continuousSlots = (slots: BookingSlot[]) => {
        const sortedSlots = [...slots].sort((a, b) =>
            a.StartTime.localeCompare(b.StartTime)
        );
        return sortedSlots.every((slot, index) => {
            if (index === 0) return true;
            const previousSlot = sortedSlots[index - 1];
            return (
                slot.CourtId === previousSlot.CourtId &&
                slot.Date === previousSlot.Date &&
                slot.StartTime === previousSlot.EndTime
            );
        });
    };

    isLoading ? dispatch(showSpinner()) : dispatch(hideSpinner());

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
                                name="maxPlayer"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel htmlFor="maxPlayer">
                                            Max players
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            // value={field.value.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select max players" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="2">
                                                    2 Players
                                                </SelectItem>
                                                <SelectItem value="4">
                                                    4 Players
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
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
