import commonApi from "@/store/common.api";
import {LoginAccount, RegisterAccount, UserProfile} from "@/@types/api";
import {setAuth} from "@/store/slices/auth.slice";
import ApiRouteBuilder from "@/lib/api.util";

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
        register: build.mutation<string, Omit<RegisterAccount, "">>({
            query: (body) => ({
                url: "/api/account/register",
                method: "POST",
                body,
                responseHandler: (response) => response.text(),
            }),
            transformResponse: (response: string) => {
                return response;
            },
        }),
        registerManager: build.mutation<string, Omit<RegisterAccount, "">>({
            query: (body) => ({
                url: "/api/account/registerManager",
                method: "POST",
                body,
                responseHandler: (response) => response.text(),
            }),
            transformResponse: (response: string) => {
                return response;
            },
        }),
        profile: build.query<UserProfile, void>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder("/api/profile");
                return routeBuilder.build();
            },
        }),
        updateProfile: build.mutation({
            query(body) {
                return {
                    url: "/api/profile",
                    method: "PUT",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
            },
        }),

        confirmEmail: build.query({
            query: ({userId, token}) => ({
                url: "/confirm-email",
                method: "GET",
                params: {userId, token},
            }),
        }),
        updatePassword: build.mutation({
            query(body) {
                return {
                    url: "/api/account/password",
                    method: "PUT",
                    body: body,
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useProfileQuery,
    useUpdateProfileMutation,
    useConfirmEmailQuery,
    useUpdatePasswordMutation,
    useRegisterManagerMutation,
} = authApi;
