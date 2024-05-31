import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import GoogleMapReact from "google-map-react";
import LocationMarker from "../LocationMarker";

interface ClubLocationProps {
    lat: number;
    lng: number;
}

function ClubLocation({lat, lng}: ClubLocationProps) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-semibold">
                    Location
                </AccordionTrigger>
                <AccordionContent>
                    <div className="w-full flex justify-center items-center">
                        <div className="h-96 w-96">
                            <GoogleMapReact
                                center={{lat: lat, lng: lng}}
                                defaultZoom={12}
                            >
                                <LocationMarker
                                    lat={lat}
                                    lng={lng}
                                    text="Club location"
                                />
                            </GoogleMapReact>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default ClubLocation;
