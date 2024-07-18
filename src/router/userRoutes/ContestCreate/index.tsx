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
import {useProfileQuery} from "@/store/services/accounts/auth.api";
import {useGetClubReservationDetailQuery} from "@/store/services/clubs/club.api";
import {useCreateContestMutation} from "@/store/services/contests/contest.api";
import {
    BookingSlot,
    clearBookingSlots,
} from "@/store/slices/bookingStage.slice";
import {hideSpinner, showSpinner} from "@/store/slices/spinner.slice";
import {zodResolver} from "@hookform/resolvers/zod";
import {skipToken} from "@reduxjs/toolkit/query";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {PiCourtBasketball} from "react-icons/pi";
import {useNavigate, useParams} from "react-router-dom";
import {z} from "zod";

const formSchema = z.object({
    policy: z
        .string({
            required_error: "Quy định cuộc thi là bắt buộc",
        })
        .min(1, "Quy định cuộc thi là bắt buộc"),
    name: z
        .string({
            required_error: "Tên người thách đấu là bắt buộc",
        })
        .min(1, "Tên người thách đấu là bắt buộc"),
    phone: z
        .string({
            required_error: "Số điện thoại là bắt buộc",
        })
        .regex(/^\d{10}$/, "Số điện thoại là bắt buộc"),
    maxPlayer: z
        .preprocess(
            (value) => parseInt(value as string),
            z.number().int().nonnegative()
        )
        .refine((value) => value > 0 && value % 2 === 0, {
            message: "Số người chơi không hợp lệ",
        }),
});

function ContestCreate() {
    const {data: userInfo} = useProfileQuery();
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
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const [selectedDate, setSelectedDate] = useState<Date>(tomorrow);
    const {toast} = useToast();
    const [createContest, {isLoading}] = useCreateContestMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const {refetch} = useGetClubReservationDetailQuery(id || skipToken);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!slots.length) {
            toast({
                title: "Lỗi",
                description: "Vui lòng chọn thời gian",
                variant: "destructive",
            });
            return;
        }
        if (!allSlotsBelongToOneCourt(slots)) {
            toast({
                title: "Lỗi",
                description: "Tất cả các khung giờ phải thuộc cùng một sân",
                variant: "destructive",
            });
            return;
        }
        if (!continuousSlots(slots)) {
            toast({
                title: "Lỗi",
                description: "Tất cả các khung giờ phải liên tục",
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
                title: "Lỗi",
                description: "Đã xảy ra lỗi khi tạo cuộc thi",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Thành công",
            description: "Cuộc thi đã được tạo",
            variant: "default",
        });
        dispatch(clearBookingSlots());
        navigate("/my-invoices");
        refetch();
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

    useEffect(() => {
        form.setValue("name", userInfo?.fullname || "");
        form.setValue("phone", userInfo?.phoneNumber || "");
    }, [userInfo]);

    isLoading ? dispatch(showSpinner()) : dispatch(hideSpinner());

    return (
        <div className="w-3/4 m-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                        <div className="flex flex-col justify-center items-center py-4 px-16 my-4">
                            <h1 className="font-semibold text-3xl">
                                Tạo cuộc thi
                            </h1>
                            <p>Chọn thời gian và sân để tạo cuộc thi</p>
                        </div>
                        <h2 className="text-xl text-center font-semibold">
                            Chọn thời gian và sân
                        </h2>
                        <div className="flex flex-col justify-between w-full px-8 mb-8">
                            <div className="h-fit w-full mr-8 shadow-lg border-2">
                                <DatePicker
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    minDate={tomorrow}
                                />
                                <CourtSchedule
                                    minDate={tomorrow}
                                    selectedDate={selectedDate}
                                />
                            </div>
                            <div className="w-full flex justify-between">
                                <div className="w-1/5">
                                    <div className="flex flex-row justify-between items-center my-4">
                                        <PiCourtBasketball className="text-5xl text-black" />
                                        <span className="text-xl w-32 font-semibold">
                                            Còn trống
                                        </span>
                                    </div>
                                    <div className="flex flex-row justify-between items-center my-4">
                                        <PiCourtBasketball className="text-5xl text-green-500" />
                                        <span className="text-xl w-32 font-semibold">
                                            Đang chọn
                                        </span>
                                    </div>
                                    <div className="flex flex-row justify-between items-center my-4">
                                        <PiCourtBasketball className="text-5xl text-red-500" />
                                        <span className="text-xl w-32 font-semibold">
                                            Đã bán
                                        </span>
                                    </div>
                                    <div className="flex flex-row justify-between items-center my-4">
                                        <PiCourtBasketball className="text-5xl text-orange-500" />
                                        <span className="text-xl w-32 font-semibold">
                                            Bảo trì/Bận
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start w-full px-8 mb-8">
                        <h2 className="text-xl text-center font-semibold w-full">
                            Thông tin cuộc thi
                        </h2>
                        <div className="grid grid-cols-2 gap-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel htmlFor="name">
                                            Tên người thách đấu
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
                                            Số điện thoại
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
                                            Số người chơi
                                        </FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Chọn số người chơi" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="2">
                                                    2 Người chơi
                                                </SelectItem>
                                                <SelectItem value="4">
                                                    4 Người chơi
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
                                            Quy định cuộc thi
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
                                Tạo cuộc thi
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default ContestCreate;
