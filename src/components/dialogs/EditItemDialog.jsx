import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const EditItemDialog = ({ isOpen, onClose, item, onSave }) => {
    const [editedItem, setEditedItem] = useState({
        name: '',
        category_id: '',
        unit: '',
        acquisition_date: ''
    });

    // Ensure item is initialized properly
    useEffect(() => {
        if (item) {
            setEditedItem({
                name: item.name || '',
                category_id: item.category_id || '',
                unit: item.unit || '',
                acquisition_date: item.acquisition_date || ''
            });
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSave(item.item_id, editedItem);
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
                        <Input 
                            name="name"
                            value={editedItem.name}
                            onChange={handleChange} 
                            placeholder="Enter item name"
                        />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-2">
                        <Label>Category</Label>
                        <Input 
                            name="category_id" 
                            value={editedItem.category_id} 
                            onChange={handleChange} 
                            placeholder="Enter category ID"
                        />
                    </div>

                    {/* Unit */}
                    <div className="flex flex-col gap-2">
                        <Label>Unit</Label>
                        <Input 
                            name="unit" 
                            value={editedItem.unit} 
                            onChange={handleChange} 
                            placeholder="e.g., pcs, sets"
                        />
                    </div>

                    {/* Acquisition Date */}
                    <div className="flex flex-col gap-2">
                        <Label>Acquisition Date</Label>
                        <Input 
                            type="date" 
                            name="acquisition_date" 
                            value={editedItem.acquisition_date || ''} 
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

EditItemDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    item: PropTypes.object,
    onSave: PropTypes.func.isRequired,
};

export default EditItemDialog;