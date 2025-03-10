import SelectItemsDialog from "@/components/dialogs/SelectItemsDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const EditRequestDialog = ({ editRequest, setEditRequest, handleEditSubmit, setAddedItems, setDeletedItems }) => {
    const [localNewlyAddedItems, setLocalNewlyAddedItems] = useState([]);
    const [localDeletedItems, setLocalDeletedItems] = useState([]);

    const handleAddItems = (selectedItems) => {
        setEditRequest((prevRequest) => {
            if (!prevRequest) return prevRequest;
    
            // Clone existing borrowed_items
            const updatedItems = [...prevRequest.borrowed_items];
    
            selectedItems.forEach((newItem) => {
                const existingItemIndex = updatedItems.findIndex((item) => item.item_id === newItem.item_id);
    
                if (existingItemIndex !== -1) {
                    // Update quantity if item already exists
                    updatedItems[existingItemIndex].quantityToBorrow += newItem.quantityToBorrow;
                } else {
                    // Add new item and store item_id
                    updatedItems.push({ ...newItem, request_item_id: crypto.randomUUID() });
                    setLocalNewlyAddedItems((prev) => [...prev, { 
                        item_id: newItem.item_id, 
                        quantity: newItem.quantityToBorrow, 
                        item_condition_out: newItem.item_condition 
                    }]);
                }
            });
    
            return {
                ...prevRequest,
                borrowed_items: updatedItems,
            };
        });
    };
    

    const handleDeleteItem = (requestItemId) => {
        if (!localDeletedItems.includes(requestItemId)) {
            setLocalDeletedItems((prev) => [...prev, requestItemId]);
        }
    };

    // Handles form submission, sends deleted items back to parent
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Log all newly added item IDs before submission
        console.log("Newly added item IDs:", localNewlyAddedItems);
    
        handleEditSubmit();
        setEditRequest(null);
    };

    useEffect(() => {
        setDeletedItems([...localDeletedItems]); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localDeletedItems]);

    useEffect(() => {
        setAddedItems([...localNewlyAddedItems]);  
    }, [localNewlyAddedItems, setAddedItems]);
    

    if (!editRequest) return null;

    return (
        <Dialog open={true} onOpenChange={() => setEditRequest(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Request</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    {/* Request ID (Read-Only) */}
                    <div className="flex flex-col gap-2">
                        <Label>Request ID:</Label>
                        <Input value={editRequest.request_id} disabled className="bg-gray-100" />
                    </div>

                    {/* Request Date (Read-Only) */}
                    <div className="flex flex-col gap-2">
                        <Label>Request Date:</Label>
                        <Input value={editRequest.request_date} disabled className="bg-gray-100" />
                    </div>

                    {/* Borrowed Items List with Delete Buttons */}
                    <div className="flex flex-col gap-2">
                        <Label>Borrowed Items:</Label>
                        <Card className="border p-2 rounded-md">
                            <CardContent className="p-0">
                                {editRequest.borrowed_items.length > 0 ? (
                                    editRequest.borrowed_items.map((item) => (
                                        <div key={item.request_item_id} className="flex justify-between items-center p-2 border-b">
                                            <span className={localDeletedItems.includes(item.request_item_id) ? "line-through text-gray-400" : ""}>
                                                {item.name}
                                            </span>
                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="destructive"
                                                onClick={() => handleDeleteItem(item.request_item_id)}
                                                disabled={localDeletedItems.includes(item.request_item_id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 p-2">No items in request.</p>
                                )}
                            </CardContent>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        Select Items
                                        <Plus className="ml-2" />
                                    </Button>
                                </DialogTrigger>
                                <SelectItemsDialog onAddItems={(handleAddItems)} />
                            </Dialog>
                        </Card>
                    </div>

                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

EditRequestDialog.propTypes = {
    editRequest: PropTypes.object,
    setEditRequest: PropTypes.func.isRequired,
    handleEditSubmit: PropTypes.func.isRequired,
    setAddedItems: PropTypes.array.isRequired,
    deletedItems: PropTypes.array.isRequired,
    setDeletedItems: PropTypes.func.isRequired,
};

export default EditRequestDialog;
