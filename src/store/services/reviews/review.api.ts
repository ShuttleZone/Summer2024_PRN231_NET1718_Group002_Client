import {ClubReviews, ReplyReview, ReviewRequest} from "@/@types/api";
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
            invalidatesTags: (request) => [
                {type: "ClubReviews" as never, id: request?.clubId},
            ],
        }),
        getClubReviews: build.query<ClubReviews[], string | undefined>({
            query: (id) => {
                const routeBuilder = new ApiRouteBuilder(`/api/Reviews(${id})`);
                return routeBuilder.build();
            },
            transformResponse(baseQueryReturnValue: ClubReviews[]) {
                return baseQueryReturnValue;
            },
            providesTags: (result, _, id) =>
                result
                    ? [
                          ...result.map((_) => ({
                              type: "ClubReviews" as never,
                              id: id,
                          })),
                          {type: "ClubReviews" as never, id: "LIST"},
                      ]
                    : [{type: "ClubReviews" as never, id: "LIST"}],
        }),
        replyClubReview: build.mutation<ReplyReview, ReplyReview>({
            query(body) {
                return {
                    url: "/api/Review/reply-review",
                    method: "PUT",
                    body: body,
                };
            },
        }),
    }),
    overrideExisting: true,
});

export const {
    useCreateClubReviewMutation,
    useGetClubReviewsQuery,
    useReplyClubReviewMutation,
} = reviewApi;
