import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // You can create a custom Table or use an existing one
import PropTypes from "prop-types";
import { useState } from "react";
import BorrowedHistoryDialog from "./BorrowedHistoryDialog";

export const ItemDetailDialog = ({ isOpen, onClose, item, onEdit, onDelete, onUpdateUnit, onDeleteUnit }) => {
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false)
    
    if (!item) return null;

    const handleEdit = () => {
        console.log("Edit clicked for item:", item.item_id);
        onEdit(item);
    };

    const handleDelete = () => {
        console.log("Delete clicked for item:", item.item_id);
        onDelete(item);
    };

    const handleRowClick = (unit) => {
        setSelectedUnit(unit);
        setIsHistoryOpen(true);
    };

    return (
        <>
               <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent width="max-w-fit md:max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Item Details</DialogTitle>
                </DialogHeader>

                {/* Metadata */}
                <div className="mb-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <div className="flex space-x-4">
                            <Button variant="outline" onClick={handleEdit}>
                                Edit
                            </Button>
                            <Button variant="outline" onClick={handleDelete} className="text-red-500">
                                Delete
                            </Button>
                        </div>
                    </div>
                    <p className="text-sm text">
                        <strong>Category:</strong> {item.category_name}
                    </p>
                    <p className="text-sm text">
                        <strong>Acquired on:</strong> {item.acquisition_date || "N/A"}
                    </p>
                </div>

                {/* Units Table */}
                <div className="overflow-auto">
                    <h1 className="mb-5 font-bold">Units</h1>
                    <ScrollArea className="h-96">
                    <Table className="min-w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Property No.</TableHead>
                                <TableHead>Brand</TableHead>
                                <TableHead>Model</TableHead>
                                <TableHead>Specification</TableHead>
                                <TableHead>Condition</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {item.units.map((unit) => (
                                <TableRow key={unit.unit_id} className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleRowClick(unit)}>
                                    <TableCell>{unit.property_no}</TableCell>
                                    <TableCell>{unit.brand}</TableCell>
                                    <TableCell>{unit.model}</TableCell>
                                    <TableCell>{unit.specification || <span className="text-gray-400">N/A</span>}</TableCell>
                                    <TableCell>{unit.item_condition}</TableCell>
                                    <TableCell>{unit.status}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                console.log(`Edit Unit: ${unit.unit_id}`);
                                                onUpdateUnit(unit);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                console.log(`Delete Unit: ${unit.unit_id}`);
                                                onDeleteUnit(unit);
                                            }}
                                            className="text-red-500 ml-2"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>

        
<BorrowedHistoryDialog
isOpen={isHistoryOpen}
onClose={() => setIsHistoryOpen(false)}
selectedItem={{ ...item, unit_id: selectedUnit?.unit_id }}
/>
        </>
    );
};

ItemDetailDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDeleteUnit: PropTypes.func.isRequired,
    onUpdateUnit: PropTypes.func.isRequired,
};

export default ItemDetailDialog;
