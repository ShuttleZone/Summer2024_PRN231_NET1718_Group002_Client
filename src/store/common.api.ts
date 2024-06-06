import {BASE_URL} from "@/constants/api.constants";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const getToken = () => {
    // Implement this function to retrieve the JWT token from the session
    return sessionStorage.getItem("token"); // or use any other method to get the token
};

const commonApi = createApi({
    reducerPath: "commonApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            // const state = getState() as RootState;
            const token = getToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
});

export default commonApi;
