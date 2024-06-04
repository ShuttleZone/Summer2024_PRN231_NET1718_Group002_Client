import {createSlice} from "@reduxjs/toolkit";

interface BasicInfo {
    clubName: string;
    clubPhone: string;
    clubAddress: string;
}
interface ClubSetting {
    openTime: string;
    closeTime: string;
    minDuration: string;
}

interface ClubCreateObject {
    BasicInfo: BasicInfo;
    ClubSetting: ClubSetting;
    Availability: string[];
    Description: string;
    Galleries: File[];
}
const initialState: ClubCreateObject = {
    BasicInfo: {clubName: "", clubPhone: "", clubAddress: ""},
    ClubSetting: {openTime: "", closeTime: "", minDuration: ""},
    Availability: [],
    Description: "",
    Galleries: [],
};

const ClubCreateSlice = createSlice({
    name: "clubCreate",
    initialState,
    reducers: {
        setClubBasicInfo(state, action) {
            state.BasicInfo = action.payload;
        },
        setClubSetting(state, action) {
            state.ClubSetting = action.payload;
        },
        setClubAvailability(state, action) {
            state.Availability = action.payload;
        },
        setClubDescription(state, action) {
            state.Description = action.payload;
        },
        setClubGalleries(state, action) {
            state.Galleries = action.payload;
        },
    },
});

export const {
    setClubBasicInfo,
    setClubSetting,
    setClubAvailability,
    setClubDescription,
    setClubGalleries,
} = ClubCreateSlice.actions;
