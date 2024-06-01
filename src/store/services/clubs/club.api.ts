import {ClubType} from "@/@types/api";
import ApiRouteBuilder from "@/lib/api.util";
import commonApi from "@/store/common.api";

const clubApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getClubs: build.query<ClubType[], string | undefined>({
            query: () => "/api/clubs",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse(baseQueryReturnValue: any) {
                return baseQueryReturnValue.value;
            },
        }),
        getClubDetail: build.query<ClubType, string | undefined>({
            query: (id) => {
                const routeBuilder = new ApiRouteBuilder(`/api/clubs(${id})`);
                return routeBuilder.build();
            },
        }),
    }),
    overrideExisting: true,
});

export const {useGetClubsQuery, useGetClubDetailQuery} = clubApi;
