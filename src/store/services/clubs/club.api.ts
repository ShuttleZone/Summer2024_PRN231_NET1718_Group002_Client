import {ClubType} from "@/@types/api";
import ApiRouteBuilder from "@/lib/api.util";
import commonApi from "@/store/common.api";

const clubApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getClubs: build.query<ClubType[], string | undefined>({
            query: () => "/api/clubs",
        }),
        getClubDetail: build.query<ClubType, string | undefined>({
            query: (id) => {
                const routeBuilder = new ApiRouteBuilder("/api/clubs");
                routeBuilder.filter("id", id || "");
                return routeBuilder.build();
            },
            transformResponse(baseQueryReturnValue) {
                return (baseQueryReturnValue as ClubType[])[0];
            },
        }),
    }),
    overrideExisting: true,
});

export const {useGetClubsQuery, useGetClubDetailQuery} = clubApi;
