import BasicInfoInput from "./components/BasicInfoInput";
import SettingInput from "./components/SettingsInput";
import AvailabilityInput from "./components/AvailabilityInput";
import DescriptionInput from "./components/DescriptionInput";
import GalleryInput from "./components/GalleryInput";
import {useCreateClubMutation} from "@/store/services/clubs/club.api";
import {useToast} from "@/components/ui/use-toast";
import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {UseFormReturn, useForm} from "react-hook-form";
import {Form} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";

export interface FormChildProps {
    form: UseFormReturn<z.infer<typeof formSchema>, any, undefined>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const formSchema = z
    .object({
        clubName: z
            .string({
                required_error: "Club name is required",
            })
            .min(1, "Club name is required"),
        clubPhone: z
            .string({
                required_error: "Club phone is required",
            })
            .regex(/^\d{10}$/, "Phone number is invalid"),
        clubAddress: z
            .string({
                required_error: "Club address is required",
            })
            .min(1, "Club address is required"),
        openTime: z
            .string({
                required_error: "Club open time is required",
            })
            .min(1, "Club open time is required"),
        closeTime: z
            .string({
                required_error: "Club close time is required",
            })
            .min(1, "Club close time is required"),
        minDuration: z.string({
            required_error: "Slot mininum duration is required",
        }),
        availability: z.array(z.string()),
        description: z
            .string({
                required_error: "Club description is required",
            })
            .min(1, "Club description is required"),
        clubGallery: z.array(z.custom()),
    })
    .refine(
        (data) => {
            const openTime = data.openTime;
            const closeTime = data.closeTime;
            const minDuration = parseFloat(data.minDuration);

            if (openTime && closeTime && minDuration > 0) {
                const [openHours, openMinutes] = openTime
                    .split(":")
                    .map(Number);
                const [closeHours, closeMinutes] = closeTime
                    .split(":")
                    .map(Number);

                const openTotalMinutes = openHours * 60 + openMinutes;
                const closeTotalMinutes = closeHours * 60 + closeMinutes;
                const durationInMinutes = minDuration * 60;

                return (
                    (closeTotalMinutes - openTotalMinutes) %
                        durationInMinutes ===
                    0
                );
            }
            return false;
        },
        {
            message: "Open hours must be divisible by the duration",
            path: ["minDuration"],
        }
    );

function CreateClub() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clubName: "",
            clubPhone: "",
            clubAddress: "",
        },
    });
    const [createClub] = useCreateClubMutation();
    const navigate = useNavigate();
    const {toast} = useToast();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (values.availability.length === 0) {
            form.setError("availability", {
                type: "manual",
                message: "Select at least one day",
            });
            return;
        }

        const formData = new FormData();

        formData.append("BasicInformation.ClubName", values.clubName);
        formData.append("BasicInformation.ClubAddress", values.clubAddress);
        formData.append("BasicInformation.ClubPhone", values.clubPhone);
        formData.append("Settings.OpenTime", values.openTime);
        formData.append("Settings.CloseTime", values.closeTime);
        formData.append("Settings.MinDuration", values.minDuration);
        values.availability.forEach((day) =>
            formData.append("DaysInWeekOpen", day)
        );
        formData.append("ClubDescription", values.description);

        values.clubGallery.forEach((file) =>
            formData.append("Files", file as File)
        );
        const {error} = await createClub(formData);

        if (error) {
            toast({
                title: "Error",
                description: "Error while creating club",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Success",
                description: "Club created successfully",
                variant: "default",
            });
            navigate("/manager/courts/new");
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col items-center py-8"
            >
                <BasicInfoInput form={form} />
                <SettingInput form={form} />
                <AvailabilityInput form={form} />
                <DescriptionInput form={form} />
                <GalleryInput form={form} />
                <button
                    className="bg-green-700 px-8 py-4 rounded-2xl mt-8 text-white hover:bg-green-400 transition-colors duration-300"
                    type="submit"
                >
                    Add new club
                </button>
            </form>
        </Form>
    );
}
export default CreateClub;
