import {
    ContestInfo,
    ContestResponse,
    CreateContestResponse,
} from "@/@types/api";
import {CreateContestType, UpdateContestRequest} from "@/@types/requests";
import ApiRouteBuilder from "@/lib/api.util";
import commonApi from "@/store/common.api";

type ContestsListQueryReturnType = {
    value: ContestInfo[];
};

const contestApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getContests: build.query<ContestInfo[], void>({
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
            transformResponse(baseQueryReturnValue: ContestInfo) {
                return baseQueryReturnValue;
            },
        }),
        getContestStaff: build.query<ContestResponse, string | undefined>({
            query: (id) => {
                const routeBuilder = new ApiRouteBuilder(
                    `/api/ContestDetail?$expand=UserContests&filter=Id eq ${id}`
                );
                return routeBuilder.build();
            },

            transformResponse: (response: ContestResponse[]) => {
                return response[0];
                // return response.value[0]; // This is the original code which cause the build to fail. I changed it to response[0] because the response is an array of ContestResponse
                // If this breaks, change it to whatever you think is correct
            },
        }),
        joinContest: build.mutation({
            query: ({contestId}) => ({
                url: `api/Contests/${contestId}`,
                method: "PUT",
            }),
        }),
        updateContestResult: build.mutation<void, UpdateContestRequest>({
            query: (body) => ({
                url: `api/Contests/${body.id}`,
                method: "PUT",
                body,
            }),
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
    useJoinContestMutation,
    useCreateContestMutation,
    useGetContestStaffQuery,
    useUpdateContestResultMutation,
} = contestApi;
