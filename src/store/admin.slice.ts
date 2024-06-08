import {PayloadAction, createSlice} from "@reduxjs/toolkit";
// import {useAcceptClubRequestMutation} from "./services/clubsAdmin/clubAdmin.api";

interface CLubRequestState {
    clubId: string;
}

const initialState: CLubRequestState = {
    clubId: "",
};

const clubRequestSlice = createSlice({
    name: "clubRequest",
    initialState,
    reducers: {
        acceptClubRequest: (state, action: PayloadAction<string>) => {
            state.clubId = action.payload;
        },
    },
});

const clubRequestReducer = clubRequestSlice.reducer;
export const {acceptClubRequest} = clubRequestSlice.actions;
export default clubRequestReducer;
