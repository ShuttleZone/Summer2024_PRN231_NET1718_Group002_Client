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
                return {
                    items: response.value,
                    total: response["@odata.count"],
                };
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.items.map(({id}) => ({
                              type: "ReservationDetails" as never,
                              id,
                          })),
                          {type: "ReservationDetails" as never, id: "LIST"},
                      ]
                    : [{type: "ReservationDetails" as never, id: "LIST"}],
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
            providesTags: (result) =>
                result
                    ? [
                          ...result.items.map(({id}) => ({
                              type: "Reservations" as never,
                              id,
                          })),
                          {type: "Reservations" as never, id: "LIST"},
                      ]
                    : [{type: "Reservations" as never, id: "LIST"}],
        }),
        createReservation: build.mutation({
            query: (data) => ({
                url: "/make-booking",
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => {
                return response;
            },
            invalidatesTags: [{type: "Reservations" as never}],
        }),
        cancelReservation: build.mutation({
            query: ({reservationId}) => ({
                url: `api/Reservation/${reservationId}`,
                method: "PUT",
            }),
            invalidatesTags: [{type: "Reservations" as never}],
        }),
        cancelReservationDetail: build.mutation({
            query: ({reservationDetailId}) => ({
                url: `api/ReservationDetails/${reservationDetailId}`,
                method: "PUT",
            }),
            invalidatesTags: [{type: "ReservationDetails" as never}],
        }),
        staffCreateReservation: build.mutation({
            query: (data) => ({
                url: "/staff/make-booking",
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => {
                return response;
            },
            invalidatesTags: [
                {type: "Reservations" as never},
                {type: "ReservationDetails" as never},
            ],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetReservationDetailsQuery,
    useCreateReservationMutation,
    useGetReservationsQuery,
    useCancelReservationMutation,
    useCancelReservationDetailMutation,
    useStaffCreateReservationMutation,
} = reservationApi;
