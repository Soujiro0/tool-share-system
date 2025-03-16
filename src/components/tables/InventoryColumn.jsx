import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export const columns = (handleEdit, handleDelete) => [
    { accessorKey: "item_id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "property_no", header: "Property No" },
    { accessorKey: "category_name", header: "Category" },
    { accessorKey: "quantity", header: "Available Qty" },
    { accessorKey: "unit", header: "Unit" },
    { accessorKey: "brand", header: "Brand" },
    { accessorKey: "model", header: "Model" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "item_condition", header: "Condition" },
    { accessorKey: "acquisition_date", header: "Acquired" },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <div className="flex justify-center gap-2">
                <Button onClick={() => handleEdit(row.original)}>
                    <Pencil size={16} />
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(row.original)}>
                    <Trash2 size={16} />
                </Button>
            </div>
        ),
    },
];

export default columns;
