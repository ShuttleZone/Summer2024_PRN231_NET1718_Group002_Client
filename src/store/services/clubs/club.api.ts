import {
    BookedSlotType,
    ClubDropdownType,
    ClubListManagement,
    ClubListManagementReturnType,
    ClubManagement,
    ClubType,
    CourtScheduleType,
    StaffDto,
    WorkingClubResponseType,
} from "@/@types/api";
import ApiRouteBuilder from "@/lib/api.util";
import commonApi from "@/store/common.api";

type ClubReturnType = {
    value: ClubType[];
};

const clubApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getClubs: build.query<ClubType[], void>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder(
                    "/api/clubs?$filter=clubStatusEnum eq 'CreateRequestAccepted' or clubStatusEnum eq 'Open'&$expand=clubImages($select=id,imageUrl)"
                );
                return routeBuilder.build();
            },
            transformResponse(baseQueryReturnValue: ClubReturnType) {
                return baseQueryReturnValue.value;
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({id}) => ({
                              type: "Clubs" as never,
                              id,
                          })),
                          {type: "Clubs" as never, id: "LIST"},
                      ]
                    : [{type: "Clubs" as never, id: "LIST"}],
        }),
        getClubDetail: build.query<ClubType, string>({
            query: (id) => {
                const routeBuilder = new ApiRouteBuilder(`/api/clubs(${id})`);
                return routeBuilder.build();
            },
            providesTags: (result, _, id) =>
                result
                    ? [{type: "Clubs" as never, id}]
                    : [{type: "Clubs" as never, id: "DETAIL"}],
        }),
        getCourtSchedule: build.query<CourtScheduleType, string>({
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
        getClubReservationDetail: build.query<BookedSlotType[], string>({
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
            invalidatesTags: [
                {type: "Clubs" as never, id: "LIST"},
                {type: "Clubs" as never, id: "EXTENDED"},
                {type: "MyClubs" as never, id: "LIST"},
                {type: "MyClubs" as never, id: "EXTENDED"},
                {type: "MyWorkingClub" as never},
            ],
        }),
        getMyClubs: build.query<ClubDropdownType[], void>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder("/api/clubs/my-clubs");
                routeBuilder.select(["id", "clubName"]);
                return routeBuilder.build();
            },
            providesTags: [{type: "MyClubs" as never, id: "LIST"}],
        }),
        getClubList: build.query<ClubManagement[], void>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder(
                    "/api/clubs/my-clubs?$expand=courts,reviews,staffs&$select=clubName,clubAddress,openTime,closeTime,Id"
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
                    ownerName: club.OwnerName,
                    totalStaff: club.Staffs.length,
                }));
            },
            providesTags: [{type: "MyClubs" as never, id: "EXTENDED"}],
        }),
        getClubManagement: build.query<ClubManagement[], void>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder(
                    "/api/clubs?$expand=courts,reviews&$select=clubName,clubAddress,openTime,closeTime,Id,ownerName"
                );

                return routeBuilder.build();
            },
            transformResponse: (
                baseQueryReturnValue: ClubListManagementReturnType
            ): ClubManagement[] => {
                return baseQueryReturnValue.value.map((club) => ({
                    clubName: club.clubName,
                    clubAddress: club.clubAddress,
                    openHours: `${club.openTime.substring(0, 5)} - ${club.closeTime.substring(0, 5)}`,
                    rating:
                        club.reviews.reduce(
                            (acc, review) => acc + review.rating,
                            0
                        ) / club.reviews.length || 0,
                    totalCourt: club.courts.length,
                    totalReview: club.reviews.length,
                    Id: club.id,
                    ownerName: club.ownerName,
                    totalStaff: club.staffs.length,
                }));
            },
            providesTags: [{type: "Clubs" as never, id: "EXTENDED"}],
        }),
        getClubStaffs: build.query<StaffDto[], void>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder("/api/clubs/staffs");
                return routeBuilder.build();
            },
        }),
        getMyWorkingClub: build.query<WorkingClubResponseType, void>({
            query: () => {
                const routeBuilder = new ApiRouteBuilder(
                    "/api/clubs/staff/club"
                );
                routeBuilder.select([
                    "id",
                    "clubName",
                    "clubAddress",
                    "clubPhone",
                ]);
                return routeBuilder.build();
            },
            providesTags: [{type: "MyWorkingClub" as never}],
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
    useGetClubManagementQuery,
    useGetClubStaffsQuery,
    useGetMyWorkingClubQuery,
} = clubApi;
