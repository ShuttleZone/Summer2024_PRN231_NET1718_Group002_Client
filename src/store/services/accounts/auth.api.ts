import commonApi from "@/store/common.api";
import {
    LoginAccount,
    RefreshToken,
    RegisterAccount,
    UserForBooking,
    UserProfile,
} from "@/@types/api";
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
                    /*
                        what should I do when the request fails?
                        probably show a toast
                        somebody should implement this
                        i'm just too lazy
                    */
                }
            },
        }),
        refreshToken: build.mutation<string, RefreshToken>({
            query: (data) => ({
                url: "/api/account/refresh",
                method: "POST",
                body: data,
                responseHandler: (response) => response.text(),
            }),
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
            providesTags: [{type: "UserProfile" as never}],
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
            invalidatesTags: [{type: "UserProfile" as never}],
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
        getUsersForBooking: build.query<UserForBooking[], string>({
            query: () => ({
                url: "/api/users-booking",
            }),
        }),
        loginWithGoogle: build.mutation<
            {accessToken: string; refreshToken: string},
            {code: string}
        >({
            query: (data) => ({
                url: "/api/account/google-auth",
                method: "POST",
                body: {
                    state: "string",
                    code: data.code,
                    scope: "string",
                    authser: "string",
                    hd: "string",
                    prompt: "string",
                },
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const {data: response} = await queryFulfilled;
                    if (response) {
                        dispatch(setAuth(response.accessToken));
                        localStorage.setItem(
                            "refresh_token",
                            response.refreshToken
                        );
                    }
                } catch (error) {
                    console.error("An error occurred:", error);
                }
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
    useGetUsersForBookingQuery,
    useLoginWithGoogleMutation,
} = authApi;
