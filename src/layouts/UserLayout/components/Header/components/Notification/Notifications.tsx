import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useEffect, useState} from "react";
import {IoNotificationsOutline} from "react-icons/io5";
import NotificationItem from "./NotificationItem";
import * as signalR from "@microsoft/signalr";
import {BASE_URL} from "@/constants/api.constants";
import {
    useGetNotificationsQuery,
    useUpdateNotificationMutation,
} from "@/store/services/notifications/notification.api";
import {Notification} from "@/@types/api";
import {useAppSelector} from "@/store";

const NotificationsDropdown: React.FC = () => {
    //const {data: notifications, refetch} = useGetNotificationsQuery();
    const {data: notifications} = useGetNotificationsQuery();
    const [markedAsRead, setMarkedAsRead] = useState<boolean>(false);
    const [notificationsData, setNotificationsData] = useState<Notification[]>(
        []
    );
    const [updateNotification] = useUpdateNotificationMutation();

    const [unreadCount, setUnreadCount] = useState<number>(0);
    // const token = useSelector(selectToken);
    const token = useAppSelector((state) => state.auth.token);
    useEffect(() => {
        if (notifications) {
            setUnreadCount(
                notifications.filter((notification) => !notification.isRead)
                    .length
            );
            setNotificationsData(notifications);
        }
    }, [notifications]);
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${BASE_URL}/hubs/notification`, {
                accessTokenFactory: () => token || "",
            })
            .withAutomaticReconnect()
            .build();

        connection.on("ReceiveNotification", (message) => {
            console.log("Received notification: ", message);
            setNotificationsData((prevNotifications) => [
                message,
                ...prevNotifications,
            ]);
            setUnreadCount((prevCount) => prevCount + 1);
            setMarkedAsRead(false);
        });

        connection
            .start()
            .then(() => console.log("Connection started"))
            .catch((err) => console.error("Connection failed: ", err));

        return () => {
            connection.stop();
        };
    }, [token]);

    const markAsRead = async () => {
        if (markedAsRead) return;
        try {
            setUnreadCount(0);
            setMarkedAsRead(true);
            await updateNotification().unwrap();
            //refetch();
        } catch (error) {
            console.error("Failed to update notifications:", error);
        }
    };
    return (
        <DropdownMenu onOpenChange={markAsRead}>
            <DropdownMenuTrigger>
                <div className="relative">
                    <IoNotificationsOutline
                        size={24}
                        className="mr-4 cursor-pointer"
                    />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-0 mt-1 mr-1 h-5 w-5 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-64 overflow-y-auto">
                <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notificationsData?.length === 0 ? (
                    <DropdownMenuItem>Không có thông báo mới</DropdownMenuItem>
                ) : (
                    notificationsData?.map((notification, index) => (
                        <NotificationItem key={index} {...notification} />
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default NotificationsDropdown;
