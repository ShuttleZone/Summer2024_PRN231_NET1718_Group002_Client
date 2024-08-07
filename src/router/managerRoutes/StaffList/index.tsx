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
import {
    useGetClubStaffsQuery,
    useGetMyClubsQuery,
} from "@/store/services/clubs/club.api";
import ActionButton from "./components/ActionButton";
import {RiUserSettingsLine} from "react-icons/ri";
import {useState, useEffect} from "react";
import CreateStaffDialog from "./components/CreateStaffDialog";
import {Link} from "react-router-dom";
import DefaultAvatar from "/user.jpg";

function StaffList() {
    const {data: staffs, isLoading, refetch} = useGetClubStaffsQuery();
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

    if (!clubs || clubs.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center gap-8">
                <h1 className="text-center text-2xl font-bold text-red-500">
                    Bạn chưa có câu lạc bộ nào!
                </h1>
                <p>
                    Hãy
                    <Link to="/manager/clubs/new" className="text-blue-500">
                        {" "}
                        tạo câu lạc bộ{" "}
                    </Link>
                    đầu tiên của bạn để thêm nhân viên vào câu lạc bộ
                </p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex justify-between py-4">
                <h1 className="flex flex-row items-center gap-3 text-lg">
                    Tổng số {staffs?.length} <RiUserSettingsLine />
                </h1>

                <Select onValueChange={handleClubFilterChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Chọn câu lạc bộ" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Tên câu lạc bộ</SelectLabel>
                            {clubs?.map((club) => (
                                <SelectItem key={club.Id} value={club.Id}>
                                    {club.ClubName}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <CreateStaffDialog afterSubmit={refetch} />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Tên người dùng</TableHead>
                            <TableHead>Giới tính</TableHead>
                            <TableHead>Ảnh đại diện</TableHead>
                            <TableHead>Tên câu lạc bộ</TableHead>
                            <TableHead>Địa chỉ câu lạc bộ</TableHead>
                            <TableHead>Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    {staffs?.length == 0 || clubs?.length == 0 ? (
                        <TableBody>Chua co nhan vien nao</TableBody>
                    ) : (
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
                                            {staff.gender === 0
                                                ? "Male"
                                                : "Female"}
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
                                                    src={DefaultAvatar}
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
                                        Không có nhân viên nào
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    )}
                </Table>
            </div>
        </div>
    );
}

export default StaffList;
