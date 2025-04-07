import ApiService from "@/api/ApiService";
import SelectItemsDialog from "@/components/dialogs/SelectItemsDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "@/context/AuthContext";
import { Plus } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { toast } from "sonner";
import Header from "../../components/layout/Header";

const RequestBorrow = () => {

    const { auth } = useContext(AuthContext)
    const userId = auth.user?.user_id;

    const [items, setItems] = useState([]);
    const formRef = useRef(null); // Reference for resetting the form

    const handleAddItems = (selectedItems) => {
        console.log(selectedItems)
        setItems((prevItems) => {
            const updatedItems = [...prevItems];

            selectedItems.forEach((newItem) => {
                const existingItemIndex = updatedItems.findIndex((item) => item.item_id === newItem.item_id);

                if (existingItemIndex !== -1) {
                    // Update quantity if item already exists
                    updatedItems[existingItemIndex].quantityToBorrow += newItem.quantityToBorrow;
                } else {
                    // Add new item with unique ID
                    updatedItems.push({ ...newItem, id: crypto.randomUUID() });
                }
            });

            return updatedItems;
        });
    };

    const handleRemoveRow = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const handleReset = () => {
        setItems([]); // Clear the selected items
        formRef.current?.reset(); // Reset form fields
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const remarks = e.target.purpose.value.trim();

        if (!items.length) {
            alert("Please select at least one item to borrow.");
            return;
        }

        // Construct the borrowing slip payload
        const borrowSlipData = {
            user_id: userId,
            remarks,
        };

        try {
            // Step 1: Send Borrowing Slip Request
            const requestData = await ApiService.RequestBorrowService.createRequest(borrowSlipData);
            console.log(requestData)

            if (!requestData || !requestData.request_id) {
                throw new Error("Invalid response from server. Missing request_id.");
            }

            const requestId = requestData.request_id;
            console.log(requestId)

            // Step 2: Send Borrowed Items (Wait for all items to be processed)
            for (const item of items) {
                const requestItemData = {
                    request_id: requestId,
                    item_id: item.item_id,
                    quantity: item.quantityToBorrow,
                    item_condition_out: item.item_condition || "Good",
                };
            
                console.log("Sending item request:", requestItemData);
            
                await ApiService.BorrowItemService.createItemRequest(requestItemData);
            }

            toast.success("CREATED borrow request successfully", {
                description: `Your Request ID: ${requestId}`,
            });
            handleReset(); // Clear form after successful submission
        } catch (error) {
            console.error("Error submitting request:", error);
            alert("Failed to submit borrow request.");
        }
    };

    return (
        <>
            <Toaster richColors position="top-center" expand={true}/>
            <Header headerTitle="Request Borrow" />
            <Card className="max-w-4xl mx-auto mt-6 p-6 shadow-lg">
                <CardContent>
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Purpose:</Label>
                                <Textarea placeholder="Write your purpose of request" className="resize-none" name="purpose" />
                            </div>
                        </div>

                        {/* Borrower’s Slip Table */}
                        <div className="mt-4">
                            <Label className="my-2">Tools & Equipment:</Label>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Property No.</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Condition</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items.length > 0 ? (
                                        items.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.property_no || "—"}</TableCell>
                                                <TableCell>{item.category_id}</TableCell>
                                                <TableCell>{`${item.quantityToBorrow} ${item.unit}`}</TableCell>
                                                <TableCell>{item.item_condition}</TableCell>
                                                <TableCell>
                                                    <Button variant="destructive" size="sm" onClick={() => handleRemoveRow(item.id)}>
                                                        Remove
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center text-gray-500">
                                                No items added.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Select Items Dialog */}
                        <div className="mt-4">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        Select Items
                                        <Plus className="ml-2" />
                                    </Button>
                                </DialogTrigger>
                                <SelectItemsDialog onAddItems={handleAddItems} />
                            </Dialog>
                        </div>

                        {/* Submit & Reset Buttons */}
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={handleReset}>
                                Reset
                            </Button>
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
};

export default RequestBorrow;
