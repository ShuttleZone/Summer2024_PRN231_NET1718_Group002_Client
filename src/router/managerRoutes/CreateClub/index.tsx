import BasicInfoInput from "./components/BasicInfoInput";
import SettingInput from "./components/SettingsInput";
import AvailabilityInput from "./components/AvailabilityInput";
import DescriptionInput from "./components/DescriptionInput";
import GalleryInput from "./components/GalleryInput";
import {useCreateClubMutation} from "@/store/services/clubs/club.api";
import {useToast} from "@/components/ui/use-toast";
import {Link, useNavigate} from "react-router-dom";
import {z} from "zod";
import {UseFormReturn, useForm} from "react-hook-form";
import {Form} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import CourtsInput from "./components/CourtsInput";
import {useGetCurrentPackageQuery} from "@/store/services/packs/package.api";
import ContentSpinner from "@/components/ContentSpinner";

export interface FormChildProps {
    form: UseFormReturn<z.infer<typeof formSchema>, any, undefined>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const formSchema = z
    .object({
        clubName: z
            .string({
                required_error: "Tên câu lạc bộ là bắt buộc",
            })
            .min(1, "Tên câu lạc bộ là bắt buộc"),
        clubPhone: z
            .string({
                required_error: "Số điện thoại là bắt buộc",
            })
            .regex(/^\d{10}$/, "Số điện thoại là bắt buộc"),
        clubAddress: z
            .string({
                required_error: "Địa chỉ câu lạc bộ là bắt buộc",
            })
            .min(1, "Địa chỉ câu lạc bộ là bắt buộc"),
        openTime: z
            .string({
                required_error: "Thời gian mở cửa là bắt buộc",
            })
            .min(1, "Thời gian mở cửa là bắt buộc"),
        closeTime: z
            .string({
                required_error: "Thời gian đóng cửa là bắt buộc",
            })
            .min(1, "Thời gian đóng cửa là bắt buộc"),
        minDuration: z.string({
            required_error:
                "Thời gian tối thiểu của mỗi lần đặt sân là bắt buộc",
        }),
        availability: z.array(z.string()),
        description: z
            .string({
                required_error: "Mô tả câu lạc bộ là bắt buộc",
            })
            .min(1, "Mô tả câu lạc bộ là bắt buộc"),
        clubGallery: z.array(z.custom()),
        courts: z.array(z.custom()).nonempty("Phải có ít nhất một sân"),
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
            courts: [],
        },
    });
    const [createClub] = useCreateClubMutation();
    const navigate = useNavigate();
    const {toast} = useToast();
    const {data: currentPackage, isLoading} = useGetCurrentPackageQuery();

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
        formData.append("CourtsJson", JSON.stringify(values.courts));
        values.availability.forEach((day) =>
            formData.append("DaysInWeekOpen", day)
        );
        formData.append("ClubDescription", values.description);

        values.clubGallery.forEach((file) =>
            formData.append("Files", file as File)
        );
        const {error} = await createClub(formData);

        if (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const errorMessage = (error as any).data.value;
            if (errorMessage) {
                toast({
                    title: "Lỗi",
                    description: errorMessage,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Lỗi",
                    description: "Có lỗi xảy ra, vui lòng thử lại",
                    variant: "destructive",
                });
            }
        } else {
            toast({
                title: "Thành công",
                description: "Tạo câu lạc bộ thành công",
                variant: "default",
            });
            navigate("/manager/clubs");
        }
    };

    if (isLoading) {
        return <ContentSpinner />;
    }

    if (!currentPackage) {
        return (
            <div className="w-full flex flex-col items-center py-8">
                <p className="text-xl mt-4 text-red-400 font-bold">
                    Bạn cần mua gói dịch vụ để tạo câu lạc bộ
                </p>
                <Link
                    to="/manager/packages"
                    className="text-blue-700 mt-4 hover:underline"
                >
                    Mua gói dịch vụ
                </Link>
            </div>
        );
    }

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
                <CourtsInput form={form} />
                <button
                    className="bg-green-700 px-8 py-4 rounded-2xl mt-8 text-white hover:bg-green-400 transition-colors duration-300"
                    type="submit"
                >
                    Tạo câu lạc bộ
                </button>
            </form>
        </Form>
    );
}
export default CreateClub;
