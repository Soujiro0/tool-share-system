import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import PropTypes from "prop-types";
import { useState } from "react";

const defaultUnit = {
    brand: "",
    model: "",
    specification: "",
    item_condition: "GOOD",
    quantity: 1,
};

const AddItemDialog = ({ isOpen, onClose, onSave }) => {
    const [hasMultipleUnits, setHasMultipleUnits] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        category_id: "",
        unit: "",
        acquisition_date: "",
        units: [{ ...defaultUnit }],
    });

    const handleBaseChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUnitChange = (index, field, value) => {
        const updatedUnits = [...formData.units];
        updatedUnits[index][field] = value;
        setFormData({ ...formData, units: updatedUnits });
    };

    const addUnit = () => {
        setFormData({ ...formData, units: [...formData.units, { ...defaultUnit }] });
    };

    const removeUnit = (index) => {
        const updatedUnits = formData.units.filter((_, i) => i !== index);
        setFormData({ ...formData, units: updatedUnits });
    };

    const handleSave = () => {
        onSave(formData);
        setFormData({
            name: "",
            category_id: "",
            unit: "",
            acquisition_date: "",
            units: [{ ...defaultUnit }],
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add New Item</DialogTitle>
                </DialogHeader>

                <div className="grid gap-2">
                    <div className="flex flex-col gap-2">
                        <Label>Item Name</Label>
                        <Input name="name" value={formData.name} onChange={handleBaseChange} required />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Category ID</Label>
                        <Input name="category_id" value={formData.category_id} onChange={handleBaseChange} required />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Unit</Label>
                        <Input name="unit" value={formData.unit} onChange={handleBaseChange} placeholder="e.g., pcs, sets" required />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Acquisition Date</Label>
                        <Input type="date" name="acquisition_date" value={formData.acquisition_date} onChange={handleBaseChange} />
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="hasMultiple"
                            checked={hasMultipleUnits}
                            onCheckedChange={(checked) => {
                                setHasMultipleUnits(checked);
                                if (!checked) {
                                    setFormData({ ...formData, units: [{ ...defaultUnit }] });
                                }
                            }}
                        />
                        <Label htmlFor="hasMultiple">Has multiple unit variants?</Label>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Label>Units</Label>
                        <ScrollArea className="h-72">
                            {" "}
                            {/* Set the height to make it scrollable */}
                            {formData.units.map((unit, index) => (
                                <div key={index} className="border p-4 rounded-md space-y-3 bg-muted/20">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <Label>Brand</Label>
                                            <Input value={unit.brand} onChange={(e) => handleUnitChange(index, "brand", e.target.value)} />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label>Model</Label>
                                            <Input value={unit.model} onChange={(e) => handleUnitChange(index, "model", e.target.value)} />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label>Specification</Label>
                                            <Textarea
                                                className="resize-none"
                                                value={unit.specification}
                                                onChange={(e) => handleUnitChange(index, "specification", e.target.value)}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label>Condition</Label>
                                            <Select
                                                value={unit.item_condition}
                                                onValueChange={(val) => handleUnitChange(index, "item_condition", val)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Condition" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="EXCELLENT">Excellent</SelectItem>
                                                    <SelectItem value="GOOD">Good</SelectItem>
                                                    <SelectItem value="POOR">Poor</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label>Quantity</Label>
                                            <Input
                                                type="number"
                                                value={unit.quantity}
                                                onChange={(e) => handleUnitChange(index, "quantity", e.target.value)}
                                                min="1"
                                            />
                                        </div>
                                    </div>
                                    {hasMultipleUnits && formData.units.length > 1 && (
                                        <div className="text-right">
                                            <Button variant="destructive" size="sm" onClick={() => removeUnit(index)}>
                                                Remove Unit
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </ScrollArea>
                    </div>

                    {hasMultipleUnits && (
                        <Button variant="outline" onClick={addUnit}>
                            + Add Another Unit
                        </Button>
                    )}

                    <Button className="w-full mt-4" onClick={handleSave}>
                        Save Item
                    </Button>
                </div>
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
