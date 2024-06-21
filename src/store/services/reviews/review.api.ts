import {ClubReviews, ReviewRequest} from "@/@types/api";
import ApiRouteBuilder from "@/lib/api.util";
import commonApi from "@/store/common.api";

const reviewApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        createClubReview: build.mutation<ReviewRequest, ReviewRequest>({
            query(body) {
                return {
                    url: "/api/Review/create-review",
                    method: "POST",
                    body: body,
                };
            },
        }),
        getClubReviews: build.query<ClubReviews[], string | undefined>({
            query: (id) => {
                const routeBuilder = new ApiRouteBuilder(`/api/Reviews(${id})`);
                return routeBuilder.build();
            },
            transformResponse(baseQueryReturnValue: ClubReviews[]) {
                return baseQueryReturnValue;
            },
        }),
    }),
    overrideExisting: true,
});

export const {useCreateClubReviewMutation, useGetClubReviewsQuery} = reviewApi;
