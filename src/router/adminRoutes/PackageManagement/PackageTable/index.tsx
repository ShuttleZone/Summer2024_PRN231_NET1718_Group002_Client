import React, {useEffect, useState} from "react";
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
import {
    useChangePackageStatusMutation,
    useCreatePackageMutation,
    useDeletePackageMutation,
    useGetPackagesQuery,
    useUpdatePackageMutation,
} from "@/store/services/packs/package.api";
import {
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Table,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {Textarea} from "@/components/ui/textarea";
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {Label} from "@radix-ui/react-dropdown-menu";
import {CreatePackage, UpdatePackage} from "@/@types/api";
import {useToast} from "@/components/ui/use-toast";
import {Toaster} from "@/components/ui/toaster";

function PackageTable() {
    // Define columns with sorting enabled
    const columns: ColumnDef<PackageInformation>[] = [
        {
            accessorKey: "name",
            header: "Package Name",
            cell: ({row}) => (
                <div className="font-medium">{row.getValue("name")}</div>
            ),
            enableSorting: true,
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({row}) => (
                <div className="font-medium">{row.getValue("description")}</div>
            ),
            enableSorting: true,
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({row}) => (
                <div className="font-medium">{row.getValue("price")}</div>
            ),
            enableSorting: true,
        },
        {
            accessorKey: "packageStatus",
            header: "Status",
            cell: ({row}) => (
                <div className="font-medium">
                    {row.getValue("packageStatus")}
                </div>
            ),
            enableSorting: true,
        },
        {
            accessorKey: "packageType",
            header: "Package Type",
            cell: ({row}) => (
                <div className="font-medium">{row.getValue("packageType")}</div>
            ),
            enableSorting: true,
        },
        {
            accessorKey: "id",
            header: "Action",
            cell: ({row}) => (
                <div className="space-x-1 whitespace-nowrap">
                    <Dialog>
                        <DialogTrigger key={row.getValue("id")}>
                            <Button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                                Chỉnh sửa
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Cập nhật thông tin gói cước
                                </DialogTitle>
                                <DialogDescription>
                                    Chỉnh sửa thông tin chi tiết của gói cước
                                    dưới đây
                                </DialogDescription>
                            </DialogHeader>

                            <form
                                onSubmit={() => handleEdit(row.getValue("id"))}
                            >
                                <div className="grid w-full gap-2 mt-2">
                                    <Label className="text-sm font-medium">
                                        Tên
                                    </Label>
                                    <Input
                                        required
                                        placeholder="Tên gói"
                                        value={row.getValue("name")}
                                        onChange={(event) =>
                                            setUpdateData((prev) => ({
                                                ...prev,
                                                name: event.target.value,
                                            }))
                                        }
                                    />
                                    <Label className="text-sm font-medium">
                                        Mô tả chi tiết
                                    </Label>
                                    <Textarea
                                        required
                                        placeholder="Mô tả chi tiết"
                                        value={row.getValue("description")}
                                        onChange={(event) =>
                                            setUpdateData((prev) => ({
                                                ...prev,
                                                description: event.target.value,
                                            }))
                                        }
                                    />
                                    <Label className="text-sm font-medium">
                                        Chọn loại gói
                                    </Label>
                                    <select
                                        value={row.getValue("packageType")}
                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(event) =>
                                            setUpdateData((prev) => ({
                                                ...prev,
                                                packageType:
                                                    event.target.selectedIndex,
                                            }))
                                        }
                                    >
                                        <option selected value="0">
                                            Gói tháng
                                        </option>
                                        <option value="1">Gói năm</option>
                                        <option value="2">Gói vô hạn</option>
                                    </select>

                                    <Label className="text-sm font-medium">
                                        Giá
                                    </Label>
                                    <div className="flex rounded-md pl-2 shadow-sm ring-1 ring-inset ring-gray-300  w-full">
                                        <Input
                                            required
                                            type="number"
                                            step={5000}
                                            className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="100.000"
                                            onChange={(event) =>
                                                setUpdateData((prev) => ({
                                                    ...prev,
                                                    price: event.target
                                                        .valueAsNumber,
                                                }))
                                            }
                                            value={row.getValue("price")}
                                        />
                                        <span className="flex select-all items-center pr-3 text-gray-500 sm:text-sm">
                                            VNĐ
                                        </span>
                                    </div>
                                    <Button
                                        className=" mt-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        type="submit"
                                        onClick={() =>
                                            handleEdit(row.getValue("id"))
                                        }
                                    >
                                        Lưu chỉnh sửa
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <button
                        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => handleDelete(row.getValue("id"))}
                    >
                        Xoá
                    </button>
                    {row.getValue("packageStatus") == "INVALID" ? (
                        <Button
                            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => handleActive(row.getValue("id"))}
                        >
                            Kích hoạt
                        </Button>
                    ) : (
                        <Button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Huỷ kích hoạt
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    // Fetch package data
    const {data: packages, isError, isLoading, refetch} = useGetPackagesQuery();

    const initialState: CreatePackage = {
        name: "",
        description: "",
        packageType: 0,
        price: 0,
    };

    const initialStateUpdate: UpdatePackage = {
        id: "",
        name: "",
        description: "",
        price: 0,
        packageType: 0,
    };

    const {toast} = useToast();
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState<CreatePackage>(initialState);
    const [createPackkage] = useCreatePackageMutation();
    const [deletePackage] = useDeletePackageMutation();
    const [changeStatus] = useChangePackageStatusMutation();
    const [updatePackage] = useUpdatePackageMutation();
    const [updateData, setUpdateData] =
        useState<UpdatePackage>(initialStateUpdate);

    const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        setOpen(false);
        const result = await createPackkage(formData);
        if (result.data != null) {
            toast({
                description:
                    "Gói đã được tạo ! Kích hoạt gói để gói được sử dụng",
            });
            setFormData(initialState);
            refetch();
        } else {
            toast({
                variant: "destructive",
                title: "Lỗi server !",
                description: "Đã có lỗi trong quá trình tạo gói",
            });
        }
    };
    // Handle state for sorting and filtering
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    // Initialize table
    const table = useReactTable({
        data: packages || [],
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

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error in loading data</div>;
    }
    // Handle actions
    const handleEdit = async (id: string) => {
        setOpen(false);

        if (id) {
            // await updateData();
            console.log(updateData);
        }
        console.log(`Edit package with id: ${id}`);
        // Add your edit logic here
    };

    const handleActive = async (id: string) => {
        const result = await changeStatus({id: id});
        console.log(result);
        if (result.data != null) {
            toast({
                variant: "default",
                description: "Trạng thái của gói cước đã được cập nhật !",
            });
            refetch();
        } else {
            toast({
                variant: "destructive",
                description:
                    "Đã có lỗi trong quá trình đổi trạng thái của gói cước !",
            });
            refetch();
        }
    };

    const handleDelete = async (id: string) => {
        const result = await deletePackage({packageId: id});
        if (result.data == true) {
            toast({
                description: "Gói đã được xoá !",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Lỗi server !",
                description: "Gói đang được sử dụng ",
            });
        }

        refetch();
    };

    return (
        <div className="w-full">
            <div>
                <h1 className="text-4xl font-bold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800 block">
                    Quản lý các gói cước
                </h1>
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                    Kiểm soát và chỉnh sửa thông tin các gói cước
                </p>
            </div>
            <div className="flex items-center py-4">
                <Toaster />

                <Input
                    placeholder="Filter packages..."
                    value={
                        (table.getColumn("name")?.getFilterValue() as string) ??
                        ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("name")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
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
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button className="ml-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
                                        Tạo gói mới
                                    </Button>
                                </TooltipTrigger>
                            </Tooltip>
                        </TooltipProvider>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Tạo gói mới dành cho chủ câu lạc bộ
                            </DialogTitle>
                            <DialogDescription>
                                Điền thông tin chi tiết của gói dưới đây
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleCreate}>
                            <div className="grid w-full gap-2 mt-2">
                                <Label className="text-sm font-medium">
                                    Tên
                                </Label>
                                <Input
                                    required
                                    placeholder="Tên gói"
                                    onChange={(event) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            name: event.target.value,
                                        }))
                                    }
                                    value={formData.name}
                                />
                                <Label className="text-sm font-medium">
                                    Mô tả chi tiết
                                </Label>
                                <Textarea
                                    required
                                    placeholder="Mô tả chi tiết"
                                    onChange={(event) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            description: event.target.value,
                                        }))
                                    }
                                    value={formData.description}
                                />
                                <Label className="text-sm font-medium">
                                    Chọn loại gói
                                </Label>
                                <select
                                    onChange={(event) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            packageType:
                                                event.target.selectedIndex,
                                        }))
                                    }
                                    value={formData.packageType}
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option selected value="0">
                                        Gói tháng
                                    </option>
                                    <option value="1">Gói năm</option>
                                    <option value="2">Gói vô hạn</option>
                                </select>

                                <Label className="text-sm font-medium">
                                    Giá
                                </Label>
                                <div className="flex rounded-md pl-2 shadow-sm ring-1 ring-inset ring-gray-300  w-full">
                                    <Input
                                        required
                                        type="number"
                                        step={5000}
                                        className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="100.000"
                                        onChange={(event) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                price: event.target
                                                    .valueAsNumber,
                                            }))
                                        }
                                        value={formData.price}
                                    />
                                    <span className="flex select-all items-center pr-3 text-gray-500 sm:text-sm">
                                        VNĐ
                                    </span>
                                </div>
                                <Button
                                    className=" text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    type="submit"
                                >
                                    Tạo
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
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
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

export interface PackageInformation {
    id: string;
    name: string;
    description: string;
    price: number;
    packageStatus: string;
    packageType: string;
}

export default PackageTable;
