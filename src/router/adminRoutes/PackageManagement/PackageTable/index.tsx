import React, {useState} from "react";
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
    useCreatePackageMutation,
    useGetPackagesQuery,
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
    TooltipContent,
} from "@radix-ui/react-tooltip";
import {Label} from "@radix-ui/react-dropdown-menu";
import {CreatePackage} from "@/@types/api";
import {useToast} from "@/components/ui/use-toast";

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
                <div className="space-x-2">
                    <Button
                        className="font-medium"
                        onClick={() => handleEdit(row.getValue("id"))}
                    >
                        Edit
                    </Button>
                    <Button
                        className="font-medium"
                        onClick={() => handleDelete(row.getValue("id"))}
                    >
                        Delete
                    </Button>
                    <Button
                        className="font-medium"
                        onClick={() => handleDelete(row.getValue("id"))}
                    >
                        Set Active
                    </Button>
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
    const {toast} = useToast();
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState<CreatePackage>(initialState);
    const [createPackkage] = useCreatePackageMutation();
    const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        setOpen(false);
        const result = await createPackkage(formData);
        if (result.data != null) {
            toast({
                description:
                    "Gói đã được tạo ! Cập nhật trạng thái để công khai gói",
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
    const handleEdit = (id: string) => {
        console.log(`Edit package with id: ${id}`);
        // Add your edit logic here
    };

    const handleDelete = (id: string) => {
        console.log(`Delete package with id: ${id}`);
        // Add your delete logic here
    };

    return (
        <div className="w-full">
            <div>
                <h1 className="text-4xl font-bold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800 block">
                    All Packages
                </h1>
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                    Keep track and manage all the packages.
                </p>
            </div>
            <div className="flex items-center py-4">
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
                                    <Button className="ml-2">
                                        Create new Package
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Write a review for this club</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Create new package for Club Manager
                            </DialogTitle>
                            <DialogDescription>
                                Fill out the information in the below form.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleCreate}>
                            <div className="grid w-full gap-2 mt-2">
                                <Label className="text-sm font-medium">
                                    Tên
                                </Label>
                                <Input
                                    required
                                    placeholder="Package name"
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
                                    placeholder="Description for this package"
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
                                <Button type="submit">Tạo</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
                {/* <Button className="ml-2">Create new Package</Button> */}
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
