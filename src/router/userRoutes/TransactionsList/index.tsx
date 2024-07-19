import {useGetMyTransactionsQuery} from "@/store/services/transactions/transaction.api";
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
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {useCallback, useMemo, useState} from "react";
import {TransactionResponseType} from "@/@types/api";
import formatVietnameseDong from "@/lib/currency.util";
import ContentSpinner from "@/components/ContentSpinner";

const TransactionsList = () => {
    const {data: myTransactions, isLoading} = useGetMyTransactionsQuery();

    const columns: ColumnDef<TransactionResponseType>[] = [
        {
            accessorKey: "transactionDate",
            header: "Ngày giao dịch",
            cell: ({row}) => (
                <div>{formatUtcDate(row.getValue("created"))}</div>
            ),
        },
        {
            accessorKey: "amount",
            header: "Số tiền",
            cell: ({row}) => (
                <div
                    className={`font-medium ${((row.getValue("amount") as number) ?? 0) > 0 ? "text-green-400" : "text-red-400"}`}
                >
                    {((row.getValue("amount") as number) ?? 0) > 0 ? "+" : ""}
                    {formatVietnameseDong(row.getValue("amount"), "vnd")} VND
                </div>
            ),
        },
        {
            accessorKey: "transactionStatus",
            header: "Trạng thái",
            cell: ({row}) => (
                <div
                    className={`${row.getValue("transactionStatus") === "SUCCESS" ? "text-green-500" : ""}`}
                >
                    {transformTransactionStatus(
                        row.getValue("transactionStatus")
                    )}
                </div>
            ),
        },
    ];

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data: myTransactions || [],
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

    const transformTransactionStatus = useCallback((status: string) => {
        switch (status) {
            case "SUCCESS":
                return "Thành công";
            case "FAILED":
                return "Thất bại";
            default:
                return status;
        }
    }, []);

    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <ContentSpinner />
            </div>
        );
    }

    return (
        <div className="w-3/4 mx-auto my-12">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Tìm theo giá..."
                    value={
                        (table
                            .getColumn("amount")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("amount")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
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
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Không có dữ liệu.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
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
};

export default TransactionsList;
