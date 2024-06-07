import commonApi from "@/store/common.api";
import {LoginAccount, RegisterAccount} from "@/@types/api";
import {setAuth} from "@/store/slices/auth.slice";

export const authApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginAccount, Omit<LoginAccount, "">>({
            query(body) {
                return {
                    url: "/api/account/login",
                    method: "POST",
                    body,
                };
            },
            onQueryStarted: async (_, {queryFulfilled, dispatch}) => {
                try {
                    const response = await queryFulfilled;
                    const token = response.data?.token;
                    dispatch(setAuth(token));
                } catch (err) {
                    // what should I do when the request fails?
                    // probably show a toast
                    // somebody should implement this
                    // i'm just too lazy
                }
            },
        }),
        register: build.mutation<RegisterAccount, Omit<RegisterAccount, "">>({
            query(body) {
                return {
                    url: "/api/account/register",
                    method: "POST",
                    body,
                };
            },
        }),
    }),
});

export const {useLoginMutation, useRegisterMutation} = authApi;
