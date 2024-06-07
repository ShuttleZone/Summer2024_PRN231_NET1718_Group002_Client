import {BASE_URL} from "@/constants/api.constants";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from ".";

const commonApi = createApi({
    reducerPath: "commonApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
});

export default commonApi;
