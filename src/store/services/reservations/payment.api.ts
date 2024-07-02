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
        }),
        updateWallet: build.mutation<
            Wallet,
            {id: string; request: PaymentRequest}
        >({
            query: ({id, request}) => ({
                url: `/api/Wallet/${id}`,
                method: "PUT",
                body: request,
            }),
            transformResponse: (response: Wallet) => {
                return response;
            },
        }),
    }),
    overrideExisting: true,
});

export const {
    useCreatePaymentUrlMutation,
    useGetMyWalletQuery,
    useUpdateWalletMutation,
} = paymentApi;
