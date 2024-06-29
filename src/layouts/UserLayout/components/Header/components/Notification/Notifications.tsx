import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useState} from "react";
import {IoNotificationsOutline} from "react-icons/io5";
import NotificationItem from "./NotificationItem";
import {
    useGetNotificationsQuery,
    useUpdateNotificationMutation,
} from "@/store/services/notifications/notification.api";

const NotificationsDropdown: React.FC = () => {
    const {data: notifications, refetch} = useGetNotificationsQuery();
    const [updateNotification] = useUpdateNotificationMutation();
    const [unreadCount, setUnreadCount] = useState<number>(9);
    const handleNotificationClick = () => {
        setUnreadCount(0);
    };
    console.log(handleNotificationClick);
    const markAsRead = async () => {
        await updateNotification();
        refetch();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger onClick={markAsRead}>
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
            <DropdownMenuContent className="max-h-64 overflow-y-scroll">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications?.length === 0 ? (
                    <DropdownMenuItem>No new notifications</DropdownMenuItem>
                ) : (
                    notifications?.map((notification, index) => (
                        <NotificationItem key={index} {...notification} />
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default NotificationsDropdown;
