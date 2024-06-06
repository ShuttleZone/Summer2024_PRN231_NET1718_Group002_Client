import commonApi from "@/store/common.api";

import {LoginAccount, RegisterAccount, RegisterResponse} from "@/@types/api";

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
