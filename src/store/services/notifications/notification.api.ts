import {Notification} from "@/@types/api";
import commonApi from "@/store/common.api";

const contestApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], void>({
            query: () => "/api/Notification?orderby=notificationDate desc",
            transformResponse: (response: {value: Notification[]}) =>
                response.value,
        }),

        updateNotification: build.mutation<void, void>({
            query: () => ({
                url: "read-noti",
                method: "PUT",
            }),
        }),
    }),
    overrideExisting: true,
});
export const {useGetNotificationsQuery, useUpdateNotificationMutation} =
    contestApi;
