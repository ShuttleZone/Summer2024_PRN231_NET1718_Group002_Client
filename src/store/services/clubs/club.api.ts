import commonApi from "@/store/common.api";

const clubApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getClubs: build.query({
            query: () => "/api/clubs",
        }),
    }),
    overrideExisting: true,
});

export const {useGetClubsQuery} = clubApi;
