import {ClubType, CourtScheduleType} from "@/@types/api";
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
        getCourtSchedule: build.query<CourtScheduleType, string | undefined>({
            query: (id) => {
                const routeBuilder = new ApiRouteBuilder("/api/clubs");
                routeBuilder
                    .filter("id", id || "")
                    .select([
                        "clubName",
                        "minDuration",
                        "openTime",
                        "closeTime",
                    ])
                    .expand("courts", ["id", "name"]);
                return routeBuilder.build();
            },
            transformResponse(baseQueryReturnValue) {
                return (baseQueryReturnValue as CourtScheduleType[])[0];
            },
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetClubsQuery,
    useGetClubDetailQuery,
    useGetCourtScheduleQuery,
} = clubApi;
