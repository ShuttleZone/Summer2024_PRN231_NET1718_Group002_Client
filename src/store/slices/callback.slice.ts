import {createSlice} from "@reduxjs/toolkit";

interface CallbackState {
    shouldCallback: boolean;
    callbackRoute: string | null;
}

const initialState: CallbackState = {
    shouldCallback: false,
    callbackRoute: null,
};

const callbackSlice = createSlice({
    name: "callback",
    initialState,
    reducers: {
        setCallback: (state, action: {payload: string}) => {
            state.shouldCallback = true;
            state.callbackRoute = action.payload;
        },
        clearCallback: () => initialState,
    },
});

export const {setCallback, clearCallback} = callbackSlice.actions;
export default callbackSlice.reducer;
