import {VnPayRequest} from "@/router/userRoutes/Reservation/components/ReservationItem";
import commonApi from "@/store/common.api";

const paymentApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        createPaymentUrl: build.mutation<string, VnPayRequest>({
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
    }),
    overrideExisting: true,
});

export const {useCreatePaymentUrlMutation} = paymentApi;
