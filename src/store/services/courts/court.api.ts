import {CourtByClub, CourtType} from "@/@types/api";
import ApiRouteBuilder from "@/lib/api.util";
import commonApi from "@/store/common.api";

interface CourtByClubResponse {
    value: CourtByClub[];
}

const clubApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        createCourt: build.mutation<CourtType, FormData>({
            query: (court) => ({
                url: "/api/courts",
                method: "POST",
                body: court,
            }),
            invalidatesTags: [{type: "Courts" as never}],
        }),
        getCourtByClub: build.query<CourtByClub[], string>({
            query: (clubId) => {
                const routeBuilder = new ApiRouteBuilder("/api/Courts");
                routeBuilder.filter("clubId", `${clubId}`);
                return routeBuilder.build();
            },
            transformResponse(baseQueryReturnValue: CourtByClubResponse) {
                return baseQueryReturnValue.value;
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({id}) => ({
                              type: "Courts" as never,
                              id,
                          })),
                          {type: "Courts" as never, id: "LIST"},
                      ]
                    : [{type: "Courts" as never, id: "LIST"}],
        }),
        changeStatusCourt: build.mutation<Record<string, never>, {id: string}>({
            query: (data) => {
                return {
                    url: `/api/Courts/disableCourt/${data.id}`,
                    method: "PUT",
                };
            },
            invalidatesTags: (req) => [{type: "Courts" as never, id: req?.id}],
        }),
        maintainCourt: build.mutation<Record<string, never>, {id: string}>({
            query: (data) => {
                return {
                    url: `/api/Courts/maintain/${data.id}`,
                    method: "PUT",
                };
            },
            invalidatesTags: (req) => [{type: "Courts" as never, id: req?.id}],
        }),
    }),
    overrideExisting: true,
});

export const {
    useCreateCourtMutation,
    useGetCourtByClubQuery,
    useChangeStatusCourtMutation,
    useMaintainCourtMutation,
} = clubApi;
