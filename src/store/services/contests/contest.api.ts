import {
    ContestInfo,
    ContestResponse,
    CreateContestResponse,
} from "@/@types/api";
import {CreateContestType, UpdateContestRequest} from "@/@types/requests";
import ApiRouteBuilder from "@/lib/api.util";
import commonApi from "@/store/common.api";

const contestApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getContests: build.query<ContestInfo[], void>({
            query: () => "/contests",
            // transformResponse(
            //     baseQueryReturnValue: ContestsListQueryReturnType
            // ) {
            //     console.log("AAAA" + baseQueryReturnValue);
            //     return baseQueryReturnValue;
            // },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({id}) => ({
                              type: "Contests" as never,
                              id,
                          })),
                          {type: "Contests" as never, id: "LIST"},
                      ]
                    : [{type: "Contests" as never, id: "LIST"}],
        }),
        getContestsDetail: build.query<ContestInfo, string>({
            query: (id) => {
                const routeBuilder = new ApiRouteBuilder(
                    `/api/Contests(${id})?$expand=userContests,Reservation($expand=ReservationDetailsDtos($expand=Court($expand=Club)))`
                );
                return routeBuilder.build();
            },
            transformResponse(baseQueryReturnValue: ContestInfo) {
                return baseQueryReturnValue;
            },
            providesTags: (result, _, id) =>
                result
                    ? [{type: "Contests" as never, id}]
                    : [{type: "Contests" as never, id: "DETAIL"}],
        }),
        getContestStaff: build.query<ContestResponse, string>({
            query: (id) => {
                const routeBuilder = new ApiRouteBuilder(
                    `/api/ContestDetail?$expand=UserContests&filter=Id eq ${id}`
                );
                return routeBuilder.build();
            },
            transformResponse: (response: {value: ContestResponse[]}) => {
                return response.value[0];
            },
            providesTags: (result, _, id) =>
                result
                    ? [{type: "ContestDetail" as never, id}]
                    : [{type: "ContestDetail" as never, id: "DETAIL"}],
        }),
        joinContest: build.mutation({
            query: ({contestId}) => ({
                url: `api/Contests/${contestId}`,
                method: "PUT",
            }),
            invalidatesTags: (_, __, req) => [
                {type: "Contests" as never},
                {type: "MyContests" as never},
                {type: "Contests" as never, id: "LIST"},
                {type: "Contests" as never, id: "DETAIL"},
                {type: "ContestDetail" as never, id: req.contestId},
            ],
        }),
        updateContestResult: build.mutation<void, UpdateContestRequest>({
            query: (body) => ({
                url: `api/Contests/${body.id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (_, __, req) => [
                {type: "Contests" as never},
                {type: "MyContests" as never},
                {type: "Contests" as never, id: "LIST"},
                {type: "Contests" as never, id: "DETAIL"},
                {type: "ContestDetail" as never, id: req.id},
            ],
        }),
        createContest: build.mutation<CreateContestResponse, CreateContestType>(
            {
                query: (contest) => ({
                    url: "/api/Contests",
                    method: "POST",
                    body: contest,
                }),
                invalidatesTags: [
                    {type: "Contests" as never},
                    {type: "MyContests" as never},
                    {type: "Contests" as never, id: "LIST"},
                    {type: "Contests" as never, id: "DETAIL"},
                ],
            }
        ),
        getUserContests: build.query<ContestInfo[], void>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder(
                    "api/Contests/get-my-contests"
                );
                return routeBuilder.build();
            },
            providesTags: [{type: "MyContests" as never}],
        }),
        getContestsStaff: build.query<ContestInfo[], void>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder("club-contest");
                return routeBuilder.build();
            },
            providesTags: [{type: "MyContests" as never}],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetContestsQuery,
    useGetContestsDetailQuery,
    useGetUserContestsQuery,
    useJoinContestMutation,
    useCreateContestMutation,
    useGetContestStaffQuery,
    useUpdateContestResultMutation,
    useGetContestsStaffQuery,
} = contestApi;
