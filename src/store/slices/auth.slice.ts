import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {JwtPayload, jwtDecode} from "jwt-decode";
import {authApi} from "../services/accounts/auth.api";
import {RefreshToken} from "@/@types/api";

export interface AuthState {
    userId?: string;
    username?: string;
    email?: string;
    token?: string;
    role?: string | string[];
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

export interface AuthPayload extends JwtPayload {
    nameid: string;
    username: string;
    email: string;
    role: string | string[];
}

const refreshToken = createAsyncThunk(
    "auth/refreshToken",
    async (_, {dispatch, rejectWithValue}) => {
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
            const data: RefreshToken = {
                accessToken: "",
                refreshToken,
            };
            const response = await dispatch(
                authApi.endpoints.refreshToken.initiate(data)
            );
            if (response.error) {
                localStorage.removeItem("refresh_token");
                return rejectWithValue(response.error);
            }
            return response.data;
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action: {payload: string}) {
            const token = action.payload;
            const payload = jwtDecode<AuthPayload>(token);
            if (!payload || !payload.exp || payload.exp <= Date.now() / 1000) {
                state.isAuthenticated = false;
                state.token = undefined;
                localStorage.removeItem("refresh_token");
                return;
            }
            state.isAuthenticated = true;
            state.token = token;
            state.userId = payload.nameid;
            state.username = payload.username;
            state.email = payload.email;
            state.role = payload.role;
        },
        clearAuth: () => {
            localStorage.removeItem("refresh_token");
            return initialState;
        },
        setLoading(state, action: {payload: boolean}) {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            const clearAuth = () => {
                state.isAuthenticated = false;
                state.token = undefined;
                state.isLoading = false;
                localStorage.removeItem("refresh_token");
            };

            if (!action.payload) {
                clearAuth();
                return;
            }

            const payload = jwtDecode<AuthPayload>(action.payload);
            const currentTime = new Date();
            const expirationTime = new Date();
            expirationTime.setUTCSeconds(payload.exp || 0);

            if (!payload || expirationTime <= currentTime) {
                clearAuth();
                return;
            }

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
