import {Notification} from "@/@types/api";
import commonApi from "@/store/common.api";

const contestApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], void>({
            query: () => "/api/Notification?orderby=notificationDate desc",
            transformResponse: (response: {value: Notification[]}) =>
                response.value,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({id}) => ({
                              type: "Notifications" as never,
                              id,
                          })),
                          {type: "Notifications" as never, id: "LIST"},
                      ]
                    : [{type: "Notifications" as never, id: "LIST"}],
        }),
        updateNotification: build.mutation<void, void>({
            query: () => ({
                url: "read-noti",
                method: "PUT",
            }),
            invalidatesTags: [{type: "Notifications" as never}],
        }),
    }),
    overrideExisting: true,
});
export const {useGetNotificationsQuery, useUpdateNotificationMutation} =
    contestApi;
