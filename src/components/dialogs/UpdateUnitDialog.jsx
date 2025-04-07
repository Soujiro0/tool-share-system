import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const UpdateUnitDialog = ({ isOpen, onClose, unit, onSave }) => {
    const [editedUnit, setEditedUnit] = useState({
        item_condition: '',
        status: '',
        brand: '',
        model: '',
        specification: '',
        date_acquired: ''
    });

    // Ensure unit is initialized properly
    useEffect(() => {
        if (unit) {
            setEditedUnit({
                item_condition: unit.item_condition || '',
                status: unit.status || '',
                brand: unit.brand || '',
                model: unit.model || '',
                specification: unit.specification || '',
                date_acquired: unit.date_acquired || ''
            });
        }
    }, [unit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUnit((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setEditedUnit((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSave(unit.unit_id, editedUnit);
        onClose();
    };

    if (!editedUnit) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Unit</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4">
                    {/* Item Condition */}
                    <div className="flex flex-col gap-2">
                        <Label>Condition</Label>
                        <Select value={editedUnit.item_condition} onValueChange={(value) => handleSelectChange("item_condition", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="EXCELLENT">Excellent</SelectItem>
                                <SelectItem value="GOOD">Good</SelectItem>
                                <SelectItem value="POOR">Poor</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-2">
                        <Label>Status</Label>
                        <Select value={editedUnit.status} onValueChange={(value) => handleSelectChange("status", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="AVAILABLE">Available</SelectItem>
                                <SelectItem value="IN_USE">In Use</SelectItem>
                                <SelectItem value="UNDER_MAINTENANCE">Under Maintenance</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Brand */}
                    <div className="flex flex-col gap-2">
                        <Label>Brand</Label>
                        <Input 
                            name="brand"
                            value={editedUnit.brand}
                            onChange={handleChange}
                            placeholder="Enter brand name"
                        />
                    </div>

                    {/* Model */}
                    <div className="flex flex-col gap-2">
                        <Label>Model</Label>
                        <Input 
                            name="model"
                            value={editedUnit.model}
                            onChange={handleChange}
                            placeholder="Enter model number"
                        />
                    </div>

                    {/* Specification */}
                    <div className="flex flex-col gap-2">
                        <Label>Specification</Label>
                        <Textarea
                            name="specification"
                            value={editedUnit.specification}
                            onChange={handleChange}
                            placeholder="Enter unit specifications"
                            className="resize-none"
                        />
                    </div>

                    {/* Acquisition Date */}
                    <div className="flex flex-col gap-2">
                        <Label>Acquisition Date</Label>
                        <Input 
                            type="date"
                            name="date_acquired"
                            value={editedUnit.date_acquired || ''}
                            onChange={handleChange}
                        />
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

UpdateUnitDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    unit: PropTypes.object,
    onSave: PropTypes.func.isRequired,
};

export default UpdateUnitDialog;