import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";

interface BookingStepProps {
    title: string;
    shouldContinue: boolean;
    step: number;
    currentStep: number;
    onGoToNextStep: () => void;
    children: JSX.Element;
}

function BookingStep({
    title,
    step,
    currentStep,
    shouldContinue,
    onGoToNextStep,
    children,
}: BookingStepProps) {
    const handleContinue = () => {
        onGoToNextStep();
    };

    return (
        currentStep >= step && (
            <Accordion
                type="single"
                collapsible
                className="w-full h-fit bg-slate-100 py-8 px-8 my-4"
                defaultValue="item-1"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <h1 className="text-2xl font-semibold ">{title}</h1>
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                        <div className="flex flex-col col-span-1 relative">
                            {currentStep !== step && (
                                <div className="absolute w-full h-full bg-white/50 z-10"></div>
                            )}
                            {children}
                        </div>
                        {step === currentStep && currentStep !== 3 && (
                            <div className="flex justify-end mt-4">
                                <Button
                                    onClick={handleContinue}
                                    disabled={!shouldContinue}
                                    type="button"
                                    variant={"outline"}
                                >
                                    Tiếp
                                </Button>
                            </div>
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        )
    );
}

export default BookingStep;
