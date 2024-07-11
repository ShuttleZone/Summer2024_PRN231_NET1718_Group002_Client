import {AcceptClubRequest, ClubRequest, ClubType} from "@/@types/api";
import ApiRouteBuilder from "@/lib/api.util";
import commonApi from "@/store/common.api";

type ClubRequestsList = {
    value: ClubRequest[];
};

const clubApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getClubRequestsAdmin: build.query<ClubRequest[], void>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder("/api/ClubRequests");
                return (
                    routeBuilder
                        .filter("clubStatusEnum", "'RequestPending'")
                        // .expand("status")
                        .build()
                );
            },
            transformResponse(baseQueryReturnValue: ClubRequestsList) {
                return baseQueryReturnValue.value;
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({id}) => ({
                              type: "ClubRequests" as never,
                              id,
                          })),
                          {type: "ClubRequests" as never, id: "LIST"},
                      ]
                    : [{type: "ClubRequests" as never, id: "LIST"}],
        }),
        getClubRequestDetailAdmin: build.query<ClubType, string>({
            query: (id) => {
                const routeBuilder = new ApiRouteBuilder(`/api/clubs(${id})`);
                return routeBuilder.build();
            },
            providesTags: (result, _, id) =>
                result
                    ? [{type: "Clubs" as never, id}]
                    : [{type: "Clubs" as never, id: "DETAIL"}],
        }),
        acceptClubRequest: build.mutation<AcceptClubRequest, {id: string}>({
            query(data) {
                return {
                    url: `api/Clubs/${data.id}`,
                    method: "PUT",
                };
            },
            invalidatesTags: [{type: "ClubRequests" as never}],
        }),
        rejectClubRequest: build.mutation<AcceptClubRequest, {id: string}>({
            query(data) {
                return {
                    url: `api/Clubs/rejectRequest/${data.id}`,
                    method: "PUT",
                };
            },
            invalidatesTags: [{type: "ClubRequests" as never}],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetClubRequestsAdminQuery,
    useGetClubRequestDetailAdminQuery,
    useAcceptClubRequestMutation,
    useRejectClubRequestMutation,
} = clubApi;
