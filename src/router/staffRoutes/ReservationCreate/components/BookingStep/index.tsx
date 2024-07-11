import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {AnimatePresence, motion} from "framer-motion";

interface BookingStepProps {
    title: string;
    shouldContinue: boolean;
    step: number;
    currentStep: number;
    onGoToNextStep: () => void;
    onGoBack: () => void;
    children: JSX.Element;
}

function BookingStep({
    title,
    step,
    currentStep,
    shouldContinue,
    onGoToNextStep,
    onGoBack,
    children,
}: BookingStepProps) {
    const handleContinue = () => {
        onGoToNextStep();
    };

    const handleBack = () => {
        onGoBack();
    };

    return (
        <AnimatePresence>
            {currentStep >= step && (
                <motion.div
                    key={step}
                    initial={{opacity: 0, translateX: "100%"}}
                    animate={{opacity: 1, translateX: 0}}
                    exit={{opacity: 0, translateX: "100%"}}
                    transition={{duration: 0.3}}
                >
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full h-fit bg-slate-100 py-8 px-8 my-4"
                        defaultValue="item-1"
                    >
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <h1 className="text-2xl font-semibold ">
                                    {title}
                                </h1>
                            </AccordionTrigger>
                            <AccordionContent className="px-4">
                                <div className="flex flex-col col-span-1 relative">
                                    {currentStep !== step && (
                                        <div className="absolute w-full h-full bg-white/50 z-10"></div>
                                    )}
                                    {children}
                                </div>
                                <div className="flex justify-end gap-4">
                                    {step === currentStep &&
                                        currentStep !== 0 && (
                                            <div className="flex justify-end mt-4">
                                                <Button
                                                    onClick={handleBack}
                                                    type="button"
                                                    variant={"outline"}
                                                >
                                                    Trước đó
                                                </Button>
                                            </div>
                                        )}
                                    {step === currentStep &&
                                        currentStep !== 3 && (
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
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default BookingStep;
