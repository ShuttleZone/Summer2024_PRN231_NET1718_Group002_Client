import {CourtByClub, CourtType} from "@/@types/api";
import ApiRouteBuilder from "@/lib/api.util";
import commonApi from "@/store/common.api";

const clubApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        createCourt: build.mutation<CourtType, FormData>({
            query: (court) => ({
                url: "/api/courts",
                method: "POST",
                body: court,
            }),
        }),
        getCourtByClub: build.query<CourtByClub[], string | undefined>({
            query: (clubId) => {
                const routeBuilder = new ApiRouteBuilder("/api/Courts");
                routeBuilder.filter("clubId", `${clubId}`);
                return routeBuilder.build();
            },
            transformResponse(baseQueryReturnValue: any) {
                return baseQueryReturnValue.value;
            },
        }),
    }),
    overrideExisting: true,
});

export const {useCreateCourtMutation, useGetCourtByClubQuery} = clubApi;
