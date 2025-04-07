import ApiService from "@/api/ApiService";
import SelectItemsDialog from "@/components/dialogs/SelectItemsDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ShadCN ScrollArea
import { Toaster } from "@/components/ui/sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Import ShadCN Table components
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react"; // Import Trash icon from lucide-react
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EditRequestDialog = ({ request, onClose, setData, refresh }) => {
    const [remarks, setRemarks] = useState(request.remarks);
    const [items, setItems] = useState(request.requested_items);
    const [isSelectItemsDialogOpen, setSelectItemsDialogOpen] = useState(false); // State for opening the dialog

    const handleSubmit = async () => {
        const payload = {
            remarks,
            items: items.map((i) => ({ item_id: i.item_id, quantity: i.quantity })),
        };
        console.log(payload);
        
        try {
            // Send the update request
            const data = await ApiService.RequestBorrowService.updateRequestFaculty(request.request_id, payload);
            console.log("Request updated successfully:", data);
    
            // Success message
            toast.success("Request updated successfully", {
                description: "Your request has been updated.",
            });
    
            // Update the data in state after successful API call
        } catch (error) {
            console.log("Error updating request:", error);
            
            // Error message
            toast.error("Error updating request");
        } finally {
            // Close the dialog after the state is updated
            onClose();
            // setData((prev) =>
            //     prev.map((r) =>
            //         r.request_id === request.request_id
            //             ? { ...r, remarks: payload.remarks, requested_items: payload.items }
            //             : r
            //     )
            // );
            refresh();
            setData((prev) =>
                prev.map((r) =>
                    r.request_id === request.request_id ? { ...r, ...payload } : r
                )
            );
        }
    };
    
    

    const handleSelectItems = (selectedItems) => {
        // Update the items in the state with selected items and their quantities
        setItems(selectedItems);
        setSelectItemsDialogOpen(false); // Close the dialog after selection
    };

    const handleRemoveItem = (itemId) => {
        // Remove item by filtering out the selected item
        setItems(items.filter((item) => item.item_id !== itemId));
    };

    useEffect(() => {
        console.log("Selected items:", items);
    });

    return (
        <>
            <Toaster richColors position="top-center" expand={true} />
            <Dialog open onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Request</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                        <h3 className="font-medium">Purpose</h3>
                        <Textarea
                                className="resize-none"
                                placeholder="Write your purpose of request"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                name="purpose"
                            />

                        {/* Show selected items in a table */}
                        <div>
                            <h3 className="font-medium">Selected Items</h3>
                            <ScrollArea className="max-h-96 pr-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Item Name</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead className="text-right">Quantity</TableHead>
                                            <TableHead className="text-center">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {items.length > 0 ? (
                                            items.map((item) => (
                                                <TableRow key={item.item_id}>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>{item.category_name}</TableCell>
                                                    <TableCell className="text-right">{item.quantity}</TableCell>
                                                    <TableCell className="text-center">
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleRemoveItem(item.item_id)} // Remove item on click
                                                        >
                                                            <Trash className="w-4 h-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center text-sm text-muted-foreground">
                                                    No items selected.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </div>

                        <Button
                            className="mt-4"
                            onClick={() => setSelectItemsDialogOpen(true)} // Open the select items dialog
                        >
                            Edit Items
                        </Button>
                    </div>

                    <Button className="mt-4" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </DialogContent>
            </Dialog>

            {/* Select Items Dialog */}
            <SelectItemsDialog
                open={isSelectItemsDialogOpen}
                onClose={() => setSelectItemsDialogOpen(false)}
                selectedItems={items}
                onSelect={handleSelectItems}
            />
        </>
    );
};

EditRequestDialog.propTypes = {
    request: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
};

export default EditRequestDialog;
