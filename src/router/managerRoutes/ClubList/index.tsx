import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {ChevronDown} from "lucide-react";
import {FaStar, FaRegCommentDots} from "react-icons/fa";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {RiUserSettingsLine} from "react-icons/ri";
import {useGetClubListQuery} from "@/store/services/clubs/club.api";
import {useNavigate} from "react-router-dom";
import ActionButton from "./components/ActionButton";

export type Club = {
    Id: string;
    clubName: string;
    clubAddress: string;
    openHours: string;
    rating: number;
    totalCourt: number;
    totalReview: number;
    totalStaff: number;
};

function ClubList() {
    const navigate = useNavigate();

    const columns: ColumnDef<Club>[] = [
        {
            accessorKey: "clubName",
            header: "TTên câu lạc bộ",
            cell: ({row}) => (
                <div className="font-medium">{row.getValue("clubName")}</div>
            ),
        },
        {
            accessorKey: "clubAddress",
            header: "Địa chỉ",
        },
        {
            accessorKey: "openHours",
            header: "Giờ mở cửa",
        },
        {
            accessorKey: "rating",
            header: () => <div className="text-right">Đánh giá</div>,
            cell: ({row}) => (
                <div className="flex justify-end">
                    {row.getValue("rating")}
                    <FaStar className="mx-2 text-lg text-yellow-300" />
                </div>
            ),
        },
        {
            accessorKey: "totalCourt",
            header: "Tổng số sân",
        },
        {
            accessorKey: "totalReview",
            header: "Tổng số đánh giá",
            cell: ({row}) => {
                return (
                    <div className="flex">
                        {row.getValue("totalReview")}
                        <FaRegCommentDots
                            onClick={() => {
                                navigate(
                                    `/manager/club-reviews/${row.original.Id}`
                                );
                            }}
                            className="mx-2 text-lg text-slate-500 cursor-pointer"
                        />
                    </div>
                );
            },
        },
        {
            accessorKey: "totalStaff",
            header: "Tổng số nhân viên",
            cell: ({row}) => {
                return (
                    <div className="flex">
                        {row.getValue("totalStaff")}
                        <RiUserSettingsLine className="mx-2 text-lg text-slate-500 cursor-pointer" />
                    </div>
                );
            },
        },
    ];

    const {data: clubs, isLoading} = useGetClubListQuery();
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data: clubs || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    if (isLoading) return <div>is loading...</div>;

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Lộc câu lạc bộ..."
                    value={
                        (table
                            .getColumn("clubName")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("clubName")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Chọn cột hiển thị
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button
                    className="bg-white border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white ml-8"
                    onClick={() => navigate("/manager/clubs/new")}
                >
                    Thêm câu lạc bộ
                </Button>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                                <TableHead>Hành động</TableHead>
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="max-w-40"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <ActionButton
                                            clubId={row.original.Id}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Không có câu lạc bộ nào.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Đã chọn {table.getFilteredSelectedRowModel().rows.length}{" "}
                    trong số {table.getFilteredRowModel().rows.length} câu lạc
                    bộ
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Trước đó
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Tiếp theo
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ClubList;
