import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import PropTypes from "prop-types";
import { useState } from "react";

const AddItemDialog = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: "",
        property_no: null,
        category_id: "",
        quantity: 1,
        unit: "",
        brand: null,
        model: null,
        status: "AVAILABLE",
        item_condition: "GOOD",
        acquisition_date: undefined,
        specification: undefined
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Item</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4">
                    {/* Item Name */}
                    <div className="flex flex-col gap-2">
                        <Label>Item Name</Label>
                        <Input name="name" value={formData.name} onChange={handleChange} placeholder="Item Name" required />
                    </div>

                    {/* Property Number */}
                    <div className="flex flex-col gap-2">
                        <Label>Property No.</Label>
                        <Input name="property_no" value={formData.property_no} onChange={handleChange} placeholder="(Optional)" />
                    </div>

                    {/* Category ID */}
                    <div className="flex flex-col gap-2">
                        <Label>Category</Label>
                        <Input name="category_id" value={formData.category_id} onChange={handleChange} placeholder="Category ID" required />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Specification</Label>
                        <Textarea className="resize-none" name="specification" value={formData.specification} onChange={handleChange} placeholder="Item Specification"/>
                    </div>

                    <div className="flex gap-4">
                        {/* Quantity */}
                        <div className="flex flex-col gap-2">
                            <Label>Quantity</Label>
                            <Input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="1" required />
                        </div>

                        {/* Unit */}
                        <div className="flex flex-col gap-2">
                            <Label>Unit</Label>
                            <Input name="unit" value={formData.unit} onChange={handleChange} placeholder="e.g., pcs, sets" required />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {/* Brand */}
                        <div className="flex flex-col gap-2">
                            <Label>Brand</Label>
                            <Input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="(Optional)" />
                        </div>

                        {/* Model */}
                        <div className="flex flex-col gap-2">
                            <Label>Model</Label>
                            <Input name="model" value={formData.model} onChange={handleChange} placeholder="(Optional)" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {/* Status */}
                        <div className="flex flex-col gap-2">
                            <Label>Status</Label>
                            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
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
                            <Select value={formData.item_condition} onValueChange={(value) => setFormData({ ...formData, item_condition: value })}>
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
                        <Input type="date" name="acquisition_date" value={formData.acquisition_date} onChange={handleChange} />
                    </div>
                </div>

                {/* Save Button */}
                <Button className="w-full mt-4" onClick={handleSave}>
                    Add Item
                </Button>
            </DialogContent>
        </Dialog>
    );
};

AddItemDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default AddItemDialog;
