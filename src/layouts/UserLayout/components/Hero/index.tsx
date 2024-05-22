import HeroBackgroundImage from "@/assets/images/breadcrumb-bg2.jpg";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Hero() {
    return (
        <div className="relative text-white flex flex-col justify-center items-center">
            <div className="absolute w-full h-full bg-black/60 z-0" />
            <img
                src={HeroBackgroundImage}
                alt="hero background"
                className="w-full h-full object-cover absolute -z-10"
            />
            <div className="w-3/4 min-h-40 flex flex-col justify-center items-start">
                <div className="z-10">
                    <h1 className="text-3xl font-bold">Clubs List</h1>
                    <Breadcrumb className="mt-4">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="hover:text-red-500">
                                <BreadcrumbLink href="/components">
                                    Components
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
        </div>
    );
}

export default Hero;
