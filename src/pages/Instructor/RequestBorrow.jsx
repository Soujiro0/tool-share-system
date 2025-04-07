import ApiService from "@/api/ApiService";
import SelectItemsDialog from "@/components/dialogs/SelectItemsDialog";
import SelectedItemsTable from "@/components/tables/SelectedItemsTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "@/context/AuthContext";
import { Label } from "@radix-ui/react-label";
import { useContext, useState } from "react";
import { toast } from "sonner";
import Header from "../../components/layout/Header";

const RequestBorrow = () => {
    const { auth } = useContext(AuthContext);
    const userId = auth.user?.user_id;

    const [remarks, setRemarks] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleRemoveItem = (itemId) => {
        setSelectedItems((prev) => prev.filter((item) => item.item_id !== itemId));
    };

    const handleSubmitRequest = async () => {
        if (selectedItems.length === 0) {
            toast.error("Please select at least one item to borrow.");
            return;
        }
        const payload = {
            user_id: userId,
            remarks,
            items: selectedItems.map((item) => ({
                item_id: item.item_id,
                quantity: item.quantity,
            })),
        };

        console.log("Submitting payload:", payload);
        // Send payload to backend here
        try {
            const data = await ApiService.RequestBorrowService.createRequest(payload);
            console.log("Request created successfully:", data);
            toast.success("Request created successfully", {
                description: "Your request has been submitted for approval.",
            });
        } catch (error) {
            console.log("Error creating request:", error);
            toast.error("Error creating request");
        } finally {
            setRemarks("");
            setSelectedItems([]);
            setDialogOpen(false);
        }
    };

    return (
        <>
            <Toaster richColors position="top-center" expand={true} />
            <Header headerTitle="Request Borrow" />
            <Card className="max-w-4xl mx-auto mt-6 p-6 shadow-lg">
                <CardContent className="flex flex-col space-y-4 gap-5">
                    <div className="space-y-4">
                        <div className="space-y-2 flex flex-col">
                            <Label className="">Purpose:</Label>
                            <Textarea
                                className="resize-none"
                                placeholder="Write your purpose of request"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                name="purpose"
                            />
                        </div>
                    </div>

                    <SelectItemsDialog
                        open={dialogOpen}
                        onClose={() => setDialogOpen(false)}
                        selectedItems={selectedItems}
                        onSelect={setSelectedItems}
                    />

                    <SelectedItemsTable items={selectedItems} onUpdate={setSelectedItems} onRemove={handleRemoveItem} />
                    <Button onClick={() => setDialogOpen(true)}>Add Items</Button>

                    <Button className="w-full" onClick={handleSubmitRequest}>
                        Confirm Request
                    </Button>
                </CardContent>
            </Card>
        </>
    );
};

export default RequestBorrow;
