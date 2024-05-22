import {createSlice} from "@reduxjs/toolkit";

export interface AuthState {
    userId?: string;
    token?: string;
}

const initialState: AuthState = {
    userId: undefined,
    token: undefined,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action) {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        },
        clearAuth(state) {
            state.userId = undefined;
            state.token = undefined;
        },
    },
});

export const {setAuth, clearAuth} = authSlice.actions;
export default authSlice.reducer;
