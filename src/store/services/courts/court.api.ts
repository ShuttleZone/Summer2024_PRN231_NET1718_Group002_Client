import {CourtType} from "@/@types/api";
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
    }),
    overrideExisting: true,
});

export const {useCreateCourtMutation} = clubApi;
