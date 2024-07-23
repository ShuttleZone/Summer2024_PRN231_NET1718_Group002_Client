import {ContestInfo, ReservationContest} from "@/@types/api";
import {useNavigate} from "react-router-dom";

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
import {ChevronDown, ChevronUp, ChevronDown as SortIcon} from "lucide-react";
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
import {hideSpinner, showSpinner} from "@/store/slices/spinner.slice";
import {useGetContestsQuery} from "@/store/services/contests/contest.api";
import {useAppDispatch} from "@/store";

function ContestDataTable() {
    const dispatch = useAppDispatch();
    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    };
    const navigate = useNavigate();
    const columns: ColumnDef<ContestInfo>[] = [
        {
            accessorKey: "userContests",
            header: "Thông tin người thách đấu",
            cell: ({row}) => {
                const userContests = row.getValue(
                    "userContests"
                ) as UserContest[];
                return (
                    <div className="ps-3">
                        <div className="text-md font-semibold ">
                            {userContests &&
                                userContests.map((userContest) => {
                                    if (userContest.isCreatedPerson == true) {
                                        return (
                                            <div
                                                key={userContest.participantsId}
                                            >
                                                {userContest.fullname}
                                            </div>
                                        );
                                    }
                                })}
                        </div>
                        <div className="font-sm text-gray-500">
                            {userContests &&
                                userContests.map((userContest) => {
                                    if (userContest.isCreatedPerson == true) {
                                        return (
                                            <div
                                                key={userContest.participantsId}
                                            >
                                                {userContest.email}
                                            </div>
                                        );
                                    }
                                })}
                        </div>
                    </div>
                );
            },
            enableSorting: true,
        },
        {
            accessorKey: "reservation",
            header: "Tên câu lạc bộ",
            cell: ({row}) => {
                const reservation = row.getValue(
                    "reservation"
                ) as ReservationContest;
                return (
                    <div className="font-medium">
                        {
                            reservation.reservationDetailsDtos[0].court.club
                                .clubName
                        }
                    </div>
                );
            },
            enableSorting: true,
        },
        {
            accessorKey: "contestDate",
            header: "Thời gian bắt đầu",
            cell: ({row}) => (
                <div className="font-medium">
                    {formatDateTime(row.getValue("contestDate"))}
                </div>
            ),
            enableSorting: true,
        },
        {
            accessorKey: "contestStatus",
            header: "Trạng thái",
            cell: ({row}) => (
                <div className="font-medium">
                    {row.getValue("contestStatus") == "Open"
                        ? "Đang mở"
                        : row.getValue("contestStatus") == "InProgress"
                          ? "Đang diễn ra"
                          : "Đã diễn ra"}
                </div>
            ),
            enableSorting: true,
        },
        {
            accessorKey: "maxPlayer",
            header: "Số người chơi",
            cell: ({row}) => (
                <div className="font-medium">{row.getValue("maxPlayer")}</div>
            ),
            enableSorting: true,
        },
        {
            accessorKey: "policy",
            header: "Thể lệ",
            cell: ({row}) => (
                <div className="font-medium">{row.getValue("policy")}</div>
            ),
            enableSorting: true,
        },
        {
            accessorKey: "id",
            header: "Hành động",
            cell: ({row}) => (
                <Button
                    className="font-medium"
                    id={row.getValue("id")}
                    onClick={() => {
                        navigate(`/contests/details/${row.original.id}`);
                    }}
                >
                    Xem chi tiết
                </Button>
            ),
        },
    ];

    const {data: contests, isError, isLoading} = useGetContestsQuery();

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data: contests || [],
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

    isLoading ? dispatch(showSpinner()) : dispatch(hideSpinner());
    if (isError) {
        return <div>Error in getting data</div>;
    }

    return (
        <div className="w-full">
            <div>
                <caption className="text-4xl font-bold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800 block">
                    Thông tin các cuộc thi
                </caption>
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                    Danh sách các cuộc thi đang diễn ra và sắp diễn ra
                </p>
            </div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Lọc các cuộc thi đấu..."
                    value={
                        (table
                            .getColumn("policy")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("policy")
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
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="cursor-pointer select-none"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{
                                            asc: (
                                                <ChevronUp className="ml-2 h-4 w-4 inline" />
                                            ),
                                            desc: (
                                                <ChevronDown className="ml-2 h-4 w-4 inline" />
                                            ),
                                        }[
                                            header.column.getIsSorted() as string
                                        ] ?? (
                                            <SortIcon className="ml-2 h-4 w-4 inline" />
                                        )}
                                    </TableHead>
                                ))}
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
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Không có cuộc thi nào
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Đã chọn {table.getFilteredSelectedRowModel().rows.length}{" "}
                    trong số {table.getFilteredRowModel().rows.length} cuộc thi
                    đấu
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

export interface UserContest {
    contestId: string;
    participantsId: string;
    isCreatedPerson: boolean;
    isWinner: boolean;
    point: number;
    id: string;
    fullname: string;
    gender: number;
    email: string;
    phoneNumber: string;
}

export default ContestDataTable;
