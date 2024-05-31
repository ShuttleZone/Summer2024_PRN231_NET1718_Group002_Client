import {ReservationDetailType} from "@/@types/api";
import commonApi from "@/store/common.api";

const reservationApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getReservationDetails: build.query<
            ReservationDetailType[],
            {sort?: string; filter?: string}
        >({
            query: ({sort, filter}) => {
                const params = new URLSearchParams();

                if (filter) params.append("$filter", filter);
                if (sort) params.append("$orderby", sort);

                return `/api/ReservationDetails/my-reservations?${params.toString()}`;
            },
            transformResponse: (response: any) => {
                try {
                    return JSON.parse(response);
                } catch (error) {
                    console.error("Failed to parse response", error);
                    throw new Error("PARSING_ERROR");
                }
            },
        }),
    }),
    overrideExisting: true,
});

export const {useGetReservationDetailsQuery} = reservationApi;
