import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

const formSchema = z.object({
    amount: z.preprocess(
        (value) => parseFloat(value as string),
        z
            .number({
                invalid_type_error: "Số tiền không được để trống",
            })
            .int()
            .nonnegative("Số tiền không hợp lệ")
    ),
});

function DepositPopup() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 0,
        },
    });

    const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
                <Button className="bg-green-500 text-xl">Nạp tiền</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    <DialogHeader>Nạp tiền vào ví</DialogHeader>
                </DialogTitle>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleFormSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            placeholder="Nhập số tiền"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <div className="flex justify-end gap-4">
                            <Button
                                onClick={() => setIsDialogOpen(false)}
                                type="button"
                                className="bg-red-500 text-lg"
                            >
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                className="bg-green-500 text-lg"
                            >
                                Xác nhận
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default DepositPopup;
