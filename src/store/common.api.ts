import {BASE_URL} from "@/constants/api.constants";
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {RootState} from ".";
import {refreshToken as refreshTokenRequest} from "./slices/auth.slice";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithErrorHandling: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && api.endpoint !== "refreshToken") {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
            return result;
        }
        try {
            await api.dispatch(refreshTokenRequest());
            const newToken = (api.getState() as RootState).auth.token;
            const headers = new Headers();
            headers.set("Authorization", `Bearer ${newToken}`);
            const baseQueryWithNewToken = fetchBaseQuery({
                baseUrl: BASE_URL,
                prepareHeaders: () => headers,
            });
            const retryResult = await baseQueryWithNewToken(
                args,
                api,
                extraOptions
            );
            return retryResult;
        } catch (error) {
            localStorage.removeItem("refresh_token");
        }
    }
    return result;
};

const commonApi = createApi({
    reducerPath: "commonApi",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: () => ({}),
});

export default commonApi;
