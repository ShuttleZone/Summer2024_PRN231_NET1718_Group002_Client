import {CourtBookedSlotType} from "@/@types/api";
import ApiRouteBuilder from "@/lib/api.util";
import commonApi from "@/store/common.api";

const CourtApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getBookedSlot: build.query<CourtBookedSlotType, string | undefined>({
            query: (id) => {
                const routeBuilder = new ApiRouteBuilder(
                    `/api/courts?filter=clubId eq ${id}`
                )
                    .expand("reservationDetails", [
                        "courtName",
                        "startTime",
                        "endTime",
                        "date",
                    ])
                    .select("reservationDetails");
                return routeBuilder.build();
            },
        }),
    }),
    overrideExisting: true,
});

export const {useGetBookedSlotQuery} = CourtApi;
