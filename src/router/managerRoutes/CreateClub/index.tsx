import BasicInfoInput from "./components/BasicInfoInput";
import SettingInput from "./components/SettingsInput";
import AvailabilityInput from "./components/AvailabilityInput";
import DescriptionInput from "./components/DescriptionInput";
import GalleryInput from "./components/GalleryInput";

function CreateClub() {
    return (
        <div className="w-full flex flex-col items-center py-8">
            <BasicInfoInput />
            <SettingInput />
            <AvailabilityInput />
            <DescriptionInput />
            <GalleryInput />
        </div>
    );
}
export default CreateClub;
