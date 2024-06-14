import {ReviewRequest} from "@/@types/api";
import commonApi from "@/store/common.api";

const reviewApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        createClubReview: build.mutation<ReviewRequest, "">({
            query() {
                return {
                    url: `/api/Review/create-review`,
                    method: "POST",
                };
            },
        }),
    }),
    overrideExisting: true,
});

export const {useCreateClubReviewMutation} = reviewApi;
