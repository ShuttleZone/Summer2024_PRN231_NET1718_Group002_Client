import {Button} from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {useNavigate} from "react-router-dom";
import {
    useGetClubStaffsQuery,
    useGetMyClubsQuery,
} from "@/store/services/clubs/club.api";
import ActionButton from "./components/ActionButton";
import {RiUserSettingsLine} from "react-icons/ri";
import {useState, useEffect} from "react";

function StaffList() {
    const navigate = useNavigate();
    const {data: staffs, isLoading} = useGetClubStaffsQuery();
    const {data: clubs} = useGetMyClubsQuery();

    const [filteredStaff, setFilteredStaff] = useState(staffs);

    useEffect(() => {
        setFilteredStaff(staffs);
    }, [staffs]);

    if (isLoading) return <div>Loading...</div>;

    const handleClubFilterChange = (clubId: string) => {
        if (clubId) {
            setFilteredStaff(
                staffs?.filter((staff) => staff.clubId === clubId)
            );
        } else {
            setFilteredStaff(staffs);
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between py-4">
                <h1 className="flex flex-row items-center gap-3 text-lg">
                    Total {staffs?.length} <RiUserSettingsLine />
                </h1>

                <Button
                    className="bg-white border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white ml-8"
                    onClick={() => navigate("/manager/staffs/new")}
                >
                    Create new Staff
                </Button>
                <Select onValueChange={handleClubFilterChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a club" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Club Name</SelectLabel>
                            {clubs?.map((club) => (
                                <SelectItem key={club.Id} value={club.Id}>
                                    {club.ClubName}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>User Name</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Profile Image</TableHead>
                            <TableHead>Club Name</TableHead>
                            <TableHead>Club Address</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStaff?.length ? (
                            filteredStaff.map((staff) => (
                                <TableRow key={staff.id}>
                                    <TableCell className="font-medium">
                                        {staff.id}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {staff.userName}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {staff.gender === 0 ? "Male" : "Female"}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {staff.profileImage ? (
                                            <img
                                                src={staff.profileImage}
                                                alt="Profile"
                                                className="w-10 h-10 rounded-full"
                                            />
                                        ) : (
                                            <img
                                                src="/public/user.jpg"
                                                alt="Profile"
                                                className="w-8 h-8 rounded-full border-2 border-black"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {staff.clubName}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {staff.clubAddress}
                                    </TableCell>
                                    <TableCell>
                                        <ActionButton />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default StaffList;
