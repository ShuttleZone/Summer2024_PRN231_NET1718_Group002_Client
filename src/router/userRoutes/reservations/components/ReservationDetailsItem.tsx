import React from "react";

interface ReservationDetailsItemProps {
    courtName: string;
    price: number;
    datetime: string;
    status: string;
}

const ReservationDetailsItem: React.FC<ReservationDetailsItemProps> = ({
    courtName,
    price,
    datetime,
    status,
}) => {
    return (
        <tr>
            <td className="px-4 py-2 border-b">{courtName}</td>
            <td className="px-4 py-2 border-b">{datetime}</td>
            <td className="px-4 py-2 border-b">${price}</td>
            <td
                className={`px-4 py-2 border-b ${true ? " text-purple-500" : " text-green-500"}`}
            >
                {status}
            </td>
            <td className="px-4 py-2 border-b">
                <button className="text-red-500">View Details</button>
            </td>
            <td className="px-4 py-2 border-b">
                <button className="text-blue-500">Chat</button>
            </td>
        </tr>
    );
};

export default ReservationDetailsItem;
