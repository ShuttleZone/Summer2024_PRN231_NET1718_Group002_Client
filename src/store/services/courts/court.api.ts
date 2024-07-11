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
        }),
        changeStatusCourt: build.mutation<Record<string, never>, {id: string}>({
            query: (data) => {
                return {
                    url: `/api/Courts/disableCourt/${data.id}`,
                    method: "PUT",
                };
            },
        }),
    }),
    overrideExisting: true,
});

export const {
    useCreateCourtMutation,
    useGetCourtByClubQuery,
    useChangeStatusCourtMutation,
} = clubApi;
