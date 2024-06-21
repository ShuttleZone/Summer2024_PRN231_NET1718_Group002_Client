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

import {FaStar} from "react-icons/fa6";
import {FaRegCommentDots} from "react-icons/fa";
import {useGetClubListQuery} from "@/store/services/clubs/club.api";
import {useNavigate} from "react-router-dom";
import ContentSpinner from "@/components/ContentSpinner";

function ClubList() {
    const {data: clubs, isLoading} = useGetClubListQuery();
    const navigate = useNavigate();
    if (isLoading) return <div>is loading...</div>;


    return (
        <div className="h-fit">
            <Table className="border-2 border-gray-400">
                <TableCaption>A list of your clubs.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">Club Name</TableHead>
                        <TableHead className="font-bold">
                            Club Address
                        </TableHead>
                        <TableHead className="font-bold">Open Hours</TableHead>
                        <TableHead className="font-bold">Rating</TableHead>
                        <TableHead className="font-bold">Total Court</TableHead>
                        <TableHead className="font-bold">
                            Total Review
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                <div className="flex justify-center items-center">
                                    <ContentSpinner />
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        clubs &&
                        clubs.map((club, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">
                                    {club.clubName}
                                </TableCell>
                                <TableCell>{club.clubAddress}</TableCell>
                                <TableCell>{club.openHours}</TableCell>
                                <TableCell className="flex">
                                    {club.rating}
                                    <FaStar className="mx-2 text-lg text-yellow-300" />
                                </TableCell>
                                <TableCell>{club.totalCourt}</TableCell>
                                <TableCell className="flex">
                                    {club.totalReview}
                                    <FaRegCommentDots
                                        onClick={() => {
                                            navigate(
                                                `/manager/club-reviews/${club.Id}`
                                            );
                                        }}
                                        className="mx-2 text-lg text-slate-500"
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5}>Total Clubs</TableCell>
                        <TableCell className="text-right">
                            <span className="bg-green-500 px-4 py-2 rounded-full">
                                {clubs && clubs.length}
                            </span>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
export default ClubList;
