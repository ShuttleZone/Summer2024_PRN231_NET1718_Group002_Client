import {PaymentRequest, Wallet} from "@/@types/api";
import commonApi from "@/store/common.api";

const paymentApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        createPaymentUrl: build.mutation<string, PaymentRequest>({
            query: (request) => ({
                url: "/create-payment-url",
                method: "POST",
                body: request,
                responseHandler: (response) => response.text(),
            }),
            transformResponse: (response: string) => {
                return response;
            },
        }),
        getMyWallet: build.query<Wallet, void>({
            query: () => {
                const url = "/api/Wallet/me";
                return url;
            },
            transformResponse: (response: Wallet) => {
                return response;
            },
            providesTags: (result) =>
                result
                    ? [{type: "Wallet" as never, id: result.id}]
                    : [{type: "Wallet" as never, id: "DETAIL"}],
        }),
        updateWallet: build.mutation<
            void,
            {id: string; request: PaymentRequest}
        >({
            query: ({id, request}) => ({
                url: `/api/Wallet/${id}`,
                method: "PUT",
                body: request,
            }),
            transformResponse: (response: void) => {
                return response;
            },
            invalidatesTags: (_, __, {id}) => [{type: "Wallet" as never, id}],
        }),
    }),
    overrideExisting: true,
});

export const {
    useCreatePaymentUrlMutation,
    useGetMyWalletQuery,
    useUpdateWalletMutation,
} = paymentApi;
