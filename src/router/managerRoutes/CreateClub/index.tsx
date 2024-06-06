import BasicInfoInput from "./components/BasicInfoInput";
import SettingInput from "./components/SettingsInput";
import AvailabilityInput from "./components/AvailabilityInput";
import DescriptionInput from "./components/DescriptionInput";
import GalleryInput from "./components/GalleryInput";
import {useAppSelector} from "@/store";
import {useCreateClubMutation} from "@/store/services/clubs/club.api";

function CreateClub() {
    const clubBasicData = useAppSelector((state) => state.clubCreate.BasicInfo);
    const [createClub] = useCreateClubMutation();
    const clubSettingData = useAppSelector(
        (state) => state.clubCreate.ClubSetting
    );
    const clubAvailabilityData = useAppSelector(
        (state) => state.clubCreate.Availability
    );
    const clubDescription = useAppSelector(
        (state) => state.clubCreate.Description
    );
    const clubGallery = useAppSelector((state) => state.clubCreate.Galleries);

    const handleSubmit = async (e: React.FormEvent) => {
        console.log("minDuration", clubSettingData);
        e.preventDefault();
        const formData = new FormData();
        formData.append("BasicInformation.ClubName", clubBasicData.clubName);
        formData.append(
            "BasicInformation.ClubAddress",
            clubBasicData.clubAddress
        );
        formData.append("BasicInformation.ClubPhone", clubBasicData.clubPhone);

        formData.append("Settings.OpenTime", clubSettingData.openTime);
        formData.append("Settings.CloseTime", clubSettingData.closeTime);
        formData.append(
            "Settings.MinDuration",
            clubSettingData.minDuration.toString()
        );

        // formData.append("DaysInWeekOpen",clubAvailabilityData);
        clubAvailabilityData.forEach((day) =>
            formData.append("DaysInWeekOpen", day)
        );
        formData.append("ClubDescription", clubDescription);

        // formData.append("Files",JSON.stringify(clubGallery));
        clubGallery.forEach((file) => formData.append("Files", file));
        const response = await createClub(formData);
        console.log(response);
    };

    return (
        <div className="w-full flex flex-col items-center py-8">
            <BasicInfoInput />
            <SettingInput />
            <AvailabilityInput />
            <DescriptionInput />
            <GalleryInput />
            <button
                className="bg-green-700 px-8 py-4 rounded-2xl mt-8 text-white hover:bg-green-400 transition-colors duration-300"
                onClick={handleSubmit}
            >
                Add new club
            </button>
        </div>
    );
}
export default CreateClub;
