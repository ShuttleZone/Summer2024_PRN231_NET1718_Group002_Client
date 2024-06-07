import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Reservation {
    id: string;
    status: string;
    paymentMethod: string;
    totalPrice: number;
    createDate: string;
    clubName: string;
    clubAddress: string;
    userName: string;
}

const reservations: Reservation[] = [
    {
        id: "1",
        status: "Confirmed",
        paymentMethod: "Credit Card",
        totalPrice: 100,
        createDate: "2024-06-07T08:00:00Z",
        clubName: "Club A",
        clubAddress: "123 Main St, City, Country",
        userName: "John Doe",
    },
    {
        id: "2",
        status: "Pending",
        paymentMethod: "PayPal",
        totalPrice: 75,
        createDate: "2024-06-06T10:00:00Z",
        clubName: "Club B",
        clubAddress: "456 Elm St, City, Country",
        userName: "Jane Smith",
    },
    {
        id: "3",
        status: "Cancelled",
        paymentMethod: "Cash",
        totalPrice: 50,
        createDate: "2024-06-05T12:00:00Z",
        clubName: "Club C",
        clubAddress: "789 Oak St, City, Country",
        userName: "Alice Johnson",
    },
];

function ReservationList() {
    return (
        <div className="border-2 border-green-500">
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Reservation</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">
                            Total Price
                        </TableHead>
                        <TableHead className="text-right">
                            Created Date
                        </TableHead>
                        <TableHead className="text-right">Club Name</TableHead>
                        <TableHead className="text-right">
                            Club Address
                        </TableHead>
                        <TableHead className="text-right">User Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                            <TableCell className="font-medium">
                                {reservation.id}
                            </TableCell>
                            <TableCell>{reservation.status}</TableCell>
                            <TableCell>{reservation.paymentMethod}</TableCell>
                            <TableCell className="text-right">
                                {reservation.totalPrice}
                            </TableCell>
                            <TableCell className="text-right">
                                {reservation.createDate}
                            </TableCell>
                            <TableCell className="text-right">
                                {reservation.clubName}
                            </TableCell>
                            <TableCell className="text-right">
                                {reservation.clubAddress}
                            </TableCell>
                            <TableCell className="text-right">
                                {reservation.userName}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">1</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
export default ReservationList;
