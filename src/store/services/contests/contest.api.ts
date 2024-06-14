import {ContestInfo, CreateContestResponse} from "@/@types/api";
import {CreateContestType} from "@/@types/requests";
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
        createContest: build.mutation<CreateContestResponse, CreateContestType>(
            {
                query: (contest) => ({
                    url: "/api/Contests",
                    method: "POST",
                    body: contest,
                }),
            }
        ),
    }),
    overrideExisting: true,
});

export const {
    useGetContestsQuery,
    useGetContestsDetailQuery,
    useCreateContestMutation,
} = contestApi;
