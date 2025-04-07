import { Button } from "@/components/ui/button";

export const columns = ( onViewDetails ) => [
    { accessorKey: "item_id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "category_name", header: "Category" },
    { accessorKey: "quantity", header: "Available Qty" },
    { accessorKey: "unit", header: "Unit" },
    {
        accessorKey: "acquisition_date",
        header: "Acquired",
        cell: ({ getValue }) => {
            const value = getValue();
            return value ? value : <span className="text-gray-400 italic">N/A</span>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <>
                <div className="flex justify-center gap-2">
                <Button onClick={() => onViewDetails(row.original)}>View Details</Button>
                </div>
            </>
        ),
    },
];

export default columns;
