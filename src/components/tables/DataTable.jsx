import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { saveAs } from "file-saver";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { Label } from "../ui/label";

export function DataTable({ columns, data, onViewDetails }) {
    const [globalFilter, setGlobalFilter] = useState("");
    const [filters, setFilters] = useState({ name: "" });
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    // const [selectedItem, setSelectedItem] = useState(null);

    // Optimize filtering to prevent infinite re-renders
    const filteredData = useMemo(() => {
        return data.filter((item) => (filters.name ? item.name.toLowerCase().includes(filters.name.toLowerCase()) : true));
    }, [data, filters]);

    const table = useReactTable({
        data: filteredData,
        columns: columns(onViewDetails),
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
                        <tr key={row.id} className="border cursor-pointer hover:bg-gray-100">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="border p-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext()) ?? (
                                        <span className="text-gray-400 bg-amber-100">aaaa</span> // Fallback if null or undefined
                                    )}
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
        </div>
    );
}

DataTable.propTypes = {
    columns: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleHistory: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired,
};

export default DataTable;
