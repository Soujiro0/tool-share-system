import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { saveAs } from "file-saver";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { Label } from "../ui/label";

export function DataTable({ columns, data, handleEdit, handleDelete, handleHistory }) {
    const [globalFilter, setGlobalFilter] = useState("");
    const [filters, setFilters] = useState({ status: "", item_condition: "", name: "" });
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    // const [selectedItem, setSelectedItem] = useState(null);

    // Optimize filtering to prevent infinite re-renders
    const filteredData = useMemo(() => {
        return data.filter((item) =>
            (filters.status && filters.status !== "ALL" ? item.status === filters.status : true) &&
            (filters.item_condition && filters.item_condition !== "ALL" ? item.item_condition === filters.item_condition : true) &&
            (filters.name ? item.name.toLowerCase().includes(filters.name.toLowerCase()) : true)
        );
    }, [data, filters]);
    

    const table = useReactTable({
        data: filteredData,
        columns: columns(handleEdit, handleDelete),
        state: { globalFilter, sorting, pagination },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        manualPagination: false,
    });

    // Export Data
    const exportData = (format) => {
        const rows = table.getFilteredRowModel().rows.map((row) => row.original);
        let fileData;

        if (format === "csv") {
            fileData =
                "data:text/csv;charset=utf-8," + Object.keys(rows[0]).join(",") + "\n" + rows.map((row) => Object.values(row).join(",")).join("\n");
        } else if (format === "json") {
            fileData = JSON.stringify(rows, null, 2);
        } else {
            fileData = rows.map((row) => Object.values(row).join(" ")).join("\n");
        }

        const blob = new Blob([fileData], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `inventory.${format}`);
    };

    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex + 1;

    return (
        <div className="p-4">
            {/* Search & Export */}
            <div className="flex justify-between mb-4">
                <div className="flex gap-2 w-full">
                    <Input placeholder="Global Search..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
                    <Button onClick={() => exportData("csv")}>Export CSV</Button>
                    {/* <Button onClick={() => exportData("json")}>Export JSON</Button> */}
                    <Button onClick={() => exportData("txt")}>Export TXT</Button>
                </div>
            </div>

            {/* Filters (ShadCN Selects) */}
            <div className="flex gap-4 mb-4">
                <Input
                    placeholder="Filter by Name..."
                    value={filters.name}
                    onChange={(e) => setFilters((prev) => ({ ...prev, name: e.target.value }))}
                />

                {/* ShadCN Select for Status */}
                <Select onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))} value={filters.status}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Status</SelectItem>
                        <SelectItem value="AVAILABLE">Available</SelectItem>
                        <SelectItem value="NO STOCK">No Stock</SelectItem>
                    </SelectContent>
                </Select>

                {/* ShadCN Select for Item Condition */}
                <Select onValueChange={(value) => setFilters((prev) => ({ ...prev, item_condition: value }))} value={filters.item_condition}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter by Condition" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Conditions</SelectItem>
                        <SelectItem value="GOOD">Good</SelectItem>
                        <SelectItem value="DAMAGED">Damaged</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Number of Entries (ShadCN Select) */}
            <div className="mb-4 gap-2 flex items-center">
                <Label>Show</Label>
                <Select
                    onValueChange={(value) => setPagination((prev) => ({ ...prev, pageSize: Number(value) }))}
                    value={pagination.pageSize.toString()}
                >
                    <SelectTrigger className="w-[100px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {[5, 10, 20, 50].map((size) => (
                            <SelectItem key={size} value={size.toString()}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Label>Entries</Label>
            </div>

            {/* Table */}
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="border p-2 cursor-pointer" onClick={header.column.getToggleSortingHandler()}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() === "asc" ? " ▲" : header.column.getIsSorted() === "desc" ? " ▼" : ""}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr 
                            key={row.id} 
                            className="border cursor-pointer hover:bg-gray-100"
                            onClick={() => handleHistory(row.original)}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="border p-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ShadCN Pagination */}
            <div className="mt-4 flex justify-center">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink isActive={currentPage === page} onClick={() => table.setPageIndex(page - 1)}>
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            {/* Dialog for Item Details
            <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Item Details</DialogTitle>
                        <DialogDescription>
                            {selectedItem ? (
                                <div className="space-y-2">
                                    <p><strong>Name:</strong> {selectedItem.name}</p>
                                    <p><strong>Category:</strong> {selectedItem.category_name}</p>
                                    <p><strong>Quantity:</strong> {selectedItem.quantity}</p>
                                    <p><strong>Condition:</strong> {selectedItem.item_condition}</p>
                                    <p><strong>Status:</strong> {selectedItem.status}</p>
                                    <p><strong>Acquired:</strong> {selectedItem.acquisition_date}</p>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog> */}
        </div>
    );
}

DataTable.propTypes = {
    columns: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleHistory: PropTypes.func.isRequired
};

export default DataTable;
