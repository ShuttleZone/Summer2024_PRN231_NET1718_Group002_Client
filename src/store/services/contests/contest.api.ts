import {ContestInfo} from "@/@types/api";
import ApiRouteBuilder from "@/lib/api.util";
import commonApi from "@/store/common.api";

type ContestsListQueryReturnType = {
    value: ContestInfo[];
};

const contestApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getContests: build.query<ContestInfo[], string | undefined>({
            query: () => "api/Contests?$expand=userContests",
            transformResponse(
                baseQueryReturnValue: ContestsListQueryReturnType
            ) {
                return baseQueryReturnValue.value;
            },
        }),
        getContestsDetail: build.query<ContestInfo, string | undefined>({
            query: (id) => {
                const routeBuilder = new ApiRouteBuilder(
                    `/api/Contests(${id})?$expand=userContests`
                );
                return routeBuilder.build();
            },
        }),
    }),
    overrideExisting: true,
});

export const {useGetContestsQuery, useGetContestsDetailQuery} = contestApi;
