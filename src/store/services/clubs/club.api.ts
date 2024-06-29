import {
    BookedSlotType,
    ClubDropdownType,
    ClubListManagement,
    ClubManagement,
    ClubType,
    CourtScheduleType,
} from "@/@types/api";
import ApiRouteBuilder from "@/lib/api.util";
import commonApi from "@/store/common.api";

type ClubReturnType = {
    value: ClubType[];
};

const clubApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getClubs: build.query<ClubType[], string | undefined>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder(
                    "/api/clubs?$filter=clubStatusEnum eq 'CreateRequestAccepted' or clubStatusEnum eq 'Open'&$expand=clubImages($select=id,imageUrl)"
                );
                return routeBuilder.build();
            },
            transformResponse(baseQueryReturnValue: ClubReturnType) {
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
                const routeBuilder = new ApiRouteBuilder(
                    `/api/clubs(${id})?$select=clubName,minDuration,openTime,closeTime&$expand=courts($select=id,name,price,courtStatus),openDateInWeeks($select=date)`
                );
                // routeBuilder
                //     .select([
                //         "clubName",
                //         "minDuration",
                //         "openTime",
                //         "closeTime",
                //     ])
                //     .expand("courts", ["id", "name", "price"]);
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
        getMyClubs: build.query<ClubDropdownType[], void>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder("/api/clubs/my-clubs");
                routeBuilder.select(["id", "clubName"]);
                return routeBuilder.build();
            },
        }),
        getClubList: build.query<ClubManagement[], void>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder(
                    "/api/clubs/my-clubs?$expand=courts,reviews&$select=clubName,clubAddress,openTime,closeTime,Id"
                );

                return routeBuilder.build();
            },
            transformResponse: (
                baseQueryReturnValue: ClubListManagement[]
            ): ClubManagement[] => {
                return baseQueryReturnValue.map((club) => ({
                    clubName: club.ClubName,
                    clubAddress: club.ClubAddress,
                    openHours: `${club.OpenTime} - ${club.CloseTime}`,
                    rating:
                        club.Reviews.reduce(
                            (acc, review) => acc + review.rating,
                            0
                        ) / club.Reviews.length || 0,
                    totalCourt: club.Courts.length,
                    totalReview: club.Reviews.length,
                    Id: club.Id,
                }));
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
    useGetClubListQuery,
} = clubApi;
