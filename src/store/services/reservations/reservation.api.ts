import {ReservationDetailType, ReservationType} from "@/@types/api";
import commonApi from "@/store/common.api";
interface ReservationQueryParams {
    sort?: string;
    filter?: string;
    page?: number;
    pageSize?: number;
}

const reservationApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getReservationDetails: build.query<
            {items: ReservationDetailType[]; total: number},
            ReservationQueryParams
        >({
            query: ({sort, filter, page = 0, pageSize = 1}) => {
                const skip = (page - 1) * pageSize;
                const filterQuery = filter ? `&$filter=${filter}` : "";
                const sortQuery = sort ? `&$orderby=${sort}` : "";
                const url = `api/ReservationDetails?$count=true${filterQuery}&$top=${pageSize}&$skip=${skip}${sortQuery}`;
                return url;
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: any) => {
                console.log(response);
                return {
                    items: response.value,
                    total: response["@odata.count"],
                };
            },
        }),
        getReservations: build.query<
            {items: ReservationType[]; total: number},
            ReservationQueryParams
        >({
            query: ({sort, filter, page = 0, pageSize = 1}) => {
                const skip = (page - 1) * pageSize;
                const filterQuery = filter ? `&$filter=${filter}` : "";
                const sortQuery = sort ? `&$orderby=${sort}` : "";
                const url = `api/Reservation?$count=true${filterQuery}&$top=${pageSize}&$skip=${skip}${sortQuery}`;
                return url;
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: any) => {
                return {
                    items: response.value,
                    total: response["@odata.count"],
                };
            },
        }),
        createReservation: build.mutation({
            query: (data) => ({
                url: "/make-booking",
                method: "POST",
                body: data,
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetReservationDetailsQuery,
    useCreateReservationMutation,
    useGetReservationsQuery,
} = reservationApi;
