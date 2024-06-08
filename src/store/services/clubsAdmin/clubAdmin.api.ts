import {AcceptClubRequest, ClubRequest, ClubType} from "@/@types/api";
import ApiRouteBuilder from "@/lib/api.util";
import commonApi from "@/store/common.api";

type ClubRequestsList = {
    value: ClubRequest[];
};

const clubApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getClubRequestsAdmin: build.query<ClubRequest[], string | undefined>({
            query: () => "/api/ClubRequests",
            transformResponse(baseQueryReturnValue: ClubRequestsList) {
                return baseQueryReturnValue.value;
            },
        }),
        getClubRequestDetailAdmin: build.query<ClubType, string | undefined>({
            query: (id) => {
                const routeBuilder = new ApiRouteBuilder(`/api/clubs(${id})`);
                return routeBuilder.build();
            },
        }),
        acceptClubRequest: build.mutation<AcceptClubRequest, {id: string}>({
            query(data) {
                return {
                    url: `api/Clubs/${data.id}`,
                    method: "PUT",
                };
            },
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetClubRequestsAdminQuery,
    useGetClubRequestDetailAdminQuery,
    useAcceptClubRequestMutation,
} = clubApi;
