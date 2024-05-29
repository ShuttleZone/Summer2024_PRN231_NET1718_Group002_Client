import {ContestInfo} from "@/@types/api";
import ApiRouteBuilder from "@/lib/api.util";
import commonApi from "@/store/common.api";

const contestApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getContests: build.query<ContestInfo[], string | undefined>({
            query: () => "/api/Contest",
        }),
        getContestsDetail: build.query<ContestInfo, string | undefined>({
            query: (id) => {
                const routeBuilder = new ApiRouteBuilder("/api/Contest");
                routeBuilder.filter("id", id || "");
                return routeBuilder.build();
            },
            transformResponse(baseQueryReturnValue) {
                return (baseQueryReturnValue as ContestInfo[])[0];
            },
        }),
    }),
    overrideExisting: true,
});

export const {useGetContestsQuery, useGetContestsDetailQuery} = contestApi;
