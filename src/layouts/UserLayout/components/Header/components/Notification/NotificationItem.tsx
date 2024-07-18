import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import React from "react";

interface NotificationItemProps {
    id: string;
    description: string;
    notificationDate: string;
    isRead: boolean;
    userId: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
    description,
    notificationDate,
    isRead,
}) => {
    const getTimeAgo = (time: Date): string => {
        const currentTime = new Date();
        const timeDifference = Math.floor(
            (currentTime.getTime() - time.getTime()) / 60000
        ); // Convert to minutes

        if (timeDifference < 1) {
            return "mới đây";
        } else if (timeDifference < 60) {
            return `${timeDifference} phút trước`;
        } else if (timeDifference < 1440) {
            const hours = Math.floor(timeDifference / 60);
            return `${hours} ${hours === 1 ? "giờ" : "giờ"} trước`;
        } else if (timeDifference < 43200) {
            const days = Math.floor(timeDifference / 1440);
            return `${days} ${days === 1 ? "ngày" : "ngày"} trước`;
        } else {
            const months = Math.floor(timeDifference / 43200);
            return `${months} ${months === 1 ? "tháng" : "tháng"} trước`;
        }
    };

    return (
        <DropdownMenuItem className="flex flex-col items-start p-4 space-y-1 border-b border-gray-200 hover:bg-blue-300 rounded-lg  ">
            <div className="flex items-center space-x-2">
                {isRead ? null : (
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                )}
                <div className="text-sm font-medium text-gray-900">
                    {description}
                </div>
            </div>
            <div className="text-xs text-blue-500">
                {getTimeAgo(new Date(notificationDate))}
            </div>
        </DropdownMenuItem>
    );
};

export default NotificationItem;
