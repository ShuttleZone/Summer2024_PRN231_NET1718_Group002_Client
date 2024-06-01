import {ReservationDetailType} from "@/@types/api";
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
            query: ({sort, filter, page = 0, pageSize = 5}) => {
                const skip = (page - 1) * pageSize;
                const filterQuery = filter ? `&$filter=${filter}` : "";
                const sortQuery = sort ? `&$orderby=${sort}` : "";
                const url = `/my-reservations?$count=true&${filterQuery}${sortQuery}`;
                // paging "$top=${pageSize}&$skip=${skip}";
                return url;
            },
            transformResponse: (response: any) => {
                console.log(response["@odata.count"]);
                return {
                    items: response,
                    total: response["@odata.count"],
                };
            },
        }),
    }),
    overrideExisting: true,
});

export const {useGetReservationDetailsQuery} = reservationApi;
