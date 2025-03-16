import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const EditItemDialog = ({ isOpen, onClose, item, onSave }) => {
    const [editedItem, setEditedItem] = useState(null);

    // Ensure item is initialized properly
    useEffect(() => {
        if (item) {
            setEditedItem({ ...item });
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setEditedItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSave(editedItem);
        onClose();
    };

    if (!editedItem) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Item</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4">
                    {/* Item Name */}
                    <div className="flex flex-col gap-2">
                        <Label>Item Name</Label>
                        <Input name="name" value={editedItem.name} onChange={handleChange} placeholder="Item Name" />
                    </div>

                    {/* Property Number */}
                    <div className="flex flex-col gap-2">
                        <Label>Property No.</Label>
                        <Input name="property_no" value={editedItem.property_no || ""} onChange={handleChange} placeholder="(Optional)" />
                    </div>

                    {/* Category ID */}
                    <div className="flex flex-col gap-2">
                        <Label>Category</Label>
                        <Input name="category_id" value={editedItem.category_id} onChange={handleChange} placeholder="Category ID" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Specification</Label>
                        <Textarea className="resize-none" name="specification" value={editedItem.specification} onChange={handleChange} placeholder="Item Specification"/>
                    </div>

                    <div className="flex gap-4">
                        {/* Quantity */}
                        <div className="flex flex-col gap-2">
                            <Label>Quantity</Label>
                            <Input type="number" name="quantity" value={editedItem.quantity} onChange={handleChange} min="1" />
                        </div>

                        {/* Unit */}
                        <div className="flex flex-col gap-2">
                            <Label>Unit</Label>
                            <Input name="unit" value={editedItem.unit} onChange={handleChange} placeholder="e.g., pcs, sets" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {/* Brand */}
                        <div className="flex flex-col gap-2">
                            <Label>Brand</Label>
                            <Input type="text" name="brand" value={editedItem.brand} onChange={handleChange} placeholder="(Optional)" />
                        </div>

                        {/* Model */}
                        <div className="flex flex-col gap-2">
                            <Label>Model</Label>
                            <Input name="model" value={editedItem.model} onChange={handleChange} placeholder="(Optional))" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {/* Status */}
                        <div className="flex flex-col gap-2">
                            <Label>Status</Label>
                            <Select value={editedItem.status} onValueChange={(value) => handleSelectChange("status", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="AVAILABLE">Available</SelectItem>
                                    <SelectItem value="BORROWED">Borrowed</SelectItem>
                                    <SelectItem value="DAMAGED">Damaged</SelectItem>
                                    <SelectItem value="NO STOCK">No Stock</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Item Condition */}
                        <div className="flex flex-col gap-2">
                            <Label>Condition</Label>
                            <Select value={editedItem.item_condition} onValueChange={(value) => handleSelectChange("item_condition", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="GOOD">Good</SelectItem>
                                    <SelectItem value="FAIR">Fair</SelectItem>
                                    <SelectItem value="NEEDS REPAIR">Needs Repair</SelectItem>
                                    <SelectItem value="DAMAGED">Damaged</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Acquisition Date */}
                    <div className="flex flex-col gap-2">
                        <Label>Acquisition Date</Label>
                        <Input type="date" name="acquisition_date" value={editedItem.acquisition_date || ""} onChange={handleChange} />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

EditItemDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    item: PropTypes.object,
    onSave: PropTypes.func.isRequired,
};

export default EditItemDialog;
