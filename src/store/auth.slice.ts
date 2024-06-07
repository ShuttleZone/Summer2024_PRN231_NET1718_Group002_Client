import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

export interface AuthState {
    userId?: string;
    username?: string;
    email?: string;
    token?: string;
    role?: string;
    isLoading: boolean;
    isAuthenticated?: boolean;
}

const initialState: AuthState = {
    userId: undefined,
    username: undefined,
    email: undefined,
    token: undefined,
    role: undefined,
    isLoading: false,
    isAuthenticated: false,
};

interface AuthPayload {
    userId: string;
    username: string;
    email: string;
    role: string;
}

const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
    // call refresh token api
    // shoule be uncommented after implementing refresh token
    // const refreshToken = localStorage.getItem('refresh_token');
    // const formData = new FormData();
    // formData.append('refreshToken', refreshToken || '');
    // if (refreshToken) {
    //     const { data: response } = await dispatch(api.endpoints.refreshToken.initiate(formData));
    //     const refreshToken = response?.refreshToken;
    //     const accessToken = response?.accessToken;
    //     refreshToken && localStorage.setItem('refresh_token', refreshToken);
    //     return accessToken;
    //
    // }

    // temporarily return token from local storage
    const token = localStorage.getItem("token");
    return token;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action: {payload: string}) {
            state.isAuthenticated = true;
            state.token = action.payload;
            const payload = jwtDecode<AuthPayload>(action.payload);
            state.userId = payload.userId;
            state.username = payload.username;
            state.email = payload.email;
            state.role = payload.role;
            // save token to local storage
            // should be removed after implementing refresh token
            localStorage.setItem("token", action.payload);
        },
        clearAuth: () => initialState,
        setLoading(state, action: {payload: boolean}) {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            if (!action.payload) {
                state.isAuthenticated = false;
                state.token = undefined;
                state.isLoading = false;
                return;
            }
            const payload = jwtDecode<AuthPayload>(action.payload);
            state.token = action.payload;
            state.role = payload.role;
            state.username = payload.username;
            state.isAuthenticated = true;
            state.isLoading = false;
        });
        builder.addCase(refreshToken.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(refreshToken.rejected, (state) => {
            state.isAuthenticated = false;
            state.token = undefined;
            state.isLoading = false;
        });
    },
});

export {refreshToken};
export const {setAuth, clearAuth, setLoading} = authSlice.actions;
export default authSlice.reducer;
