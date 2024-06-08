import {
    BookedSlotType,
    ClubDropdownType,
    ClubType,
    CourtScheduleType,
} from "@/@types/api";
import ApiRouteBuilder from "@/lib/api.util";
import commonApi from "@/store/common.api";

type ClubsListQueryReturnType = {
    value: ClubType[];
};

const clubApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getClubs: build.query<ClubType[], string | undefined>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder("/api/clubs");
                routeBuilder.expand("clubImages", ["id", "imageUrl"]);
                return routeBuilder.build();
            },
            transformResponse(baseQueryReturnValue: ClubsListQueryReturnType) {
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
                const routeBuilder = new ApiRouteBuilder(`/api/clubs(${id})`);
                routeBuilder
                    .select([
                        "clubName",
                        "minDuration",
                        "openTime",
                        "closeTime",
                    ])
                    .expand("courts", ["id", "name", "price"]);
                return routeBuilder.build();
            },
        }),
        getClubReservationDetail: build.query<
            BookedSlotType[],
            string | undefined
        >({
            query: (id) => {
                const routeBuilder = new ApiRouteBuilder(
                    `/Clubs(${id})/reservations-details`
                );
                routeBuilder.select([
                    "courtName",
                    "startTime",
                    "endTime",
                    "Date",
                ]);
                return routeBuilder.build();
            },
        }),
        createClub: build.mutation<ClubType, FormData>({
            query: (court) => ({
                url: "/api/clubs",
                method: "POST",
                body: court,
            }),
        }),
        getMyClubs: build.query<ClubDropdownType[], string | undefined>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder("/api/clubs/my-clubs");
                routeBuilder.select(["id", "clubName"]);
                return routeBuilder.build();
            },
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetClubsQuery,
    useGetClubDetailQuery,
    useGetCourtScheduleQuery,
    useGetClubReservationDetailQuery,
    useCreateClubMutation,
    useGetMyClubsQuery,
} = clubApi;
