import ApiService from "@/api/ApiService";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AuthContext } from "@/context/AuthContext";
import { Label } from "@radix-ui/react-label";
import { useContext, useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";

const AssignUnitsDialog = ({ open, onClose, request, refresh }) => {
    const { auth } = useContext(AuthContext);
    const userId = auth.user?.user_id;

    const [itemsWithUnits, setItemsWithUnits] = useState([]);
    const [selectedUnits, setSelectedUnits] = useState({});

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        if (open && request?.requested_items?.length > 0) {
            fetchAllItemsWithUnits();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const fetchAllItemsWithUnits = async () => {
        try {
            const results = await Promise.all(request.requested_items.map((item) => ApiService.ItemService.getItemById(item.item_id)));

            setItemsWithUnits(
                results.map((res, index) => ({
                    ...res.item,
                    requested_quantity: request.requested_items[index].quantity,
                }))
            );
        } catch (error) {
            console.error("Failed to fetch items:", error);
        }
    };

    const handleCheckboxChange = (itemId, unitId) => {
        setSelectedUnits((prev) => {
            const prevUnits = prev[itemId] || [];
            const isSelected = prevUnits.includes(unitId);

            let updated = isSelected ? prevUnits.filter((id) => id !== unitId) : [...prevUnits, unitId];

            // Enforce quantity restriction
            const item = itemsWithUnits.find((item) => item.item_id === itemId);
            if (updated.length > item.requested_quantity) return prev;

            return { ...prev, [itemId]: updated };
        });
    };

    const handleAssign = async () => {
        await handleApprove(request.request_id);
    
        // Wait for 1 second (1000 ms)
        await sleep(1000);
    
        const payload = {
            request_id: request.request_id,
            assigned_units: Object.values(selectedUnits)
                .flat()
                .map((unit_id) => ({
                    unit_id,
                    item_condition_out: "GOOD",
                })),
        };
    
        console.log("Assign units payload:", payload);
        try {
            const data = await ApiService.BorrowItemService.assignUnitToRequest(payload);
            console.log("Units assigned successfully:", data);
        } catch (error) {
            console.error("Error assigning units:", error);
        } finally {
            refresh();
        }
        onClose();
    };
    

    const handleApprove = async (requestId) => {
        const payload = {
            status: "APPROVED",
            handled_by: userId,
        }

        console.log("Approve payload:", payload);
        try {
            const data = await ApiService.RequestBorrowService.approveRequestByAdmin(requestId, payload);
            console.log("Request approved successfully:", data);
        } catch (error) {
            console.error("Error approving request:", error);
        } finally {
            refresh();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent width="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Assign Units for {request.requested_by}</DialogTitle>
                </DialogHeader>

                <ScrollArea className="h-[700px] pr-2 space-y-6">
                    {itemsWithUnits.map((item) => (
                        <div key={item.item_id}>
                            <h3 className="text-lg font-semibold mb-2">
                                {item.name} (Max: {item.requested_quantity})
                            </h3>
                            <div className="overflow-x-auto border rounded-lg mb-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Select</TableHead>
                                            <TableHead>Property No</TableHead>
                                            <TableHead>Brand</TableHead>
                                            <TableHead>Model</TableHead>
                                            <TableHead>Condition</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {item.units.map((unit) => (
                                            <TableRow key={unit.unit_id}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedUnits[item.item_id]?.includes(unit.unit_id) || false}
                                                        onCheckedChange={() => handleCheckboxChange(item.item_id, unit.unit_id)}
                                                        disabled={
                                                            !selectedUnits[item.item_id]?.includes(unit.unit_id) &&
                                                            selectedUnits[item.item_id]?.length >= item.requested_quantity
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell>{unit.property_no}</TableCell>
                                                <TableCell>{unit.brand}</TableCell>
                                                <TableCell>{unit.model}</TableCell>
                                                <TableCell>{unit.item_condition}</TableCell>
                                                <TableCell>{unit.status}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    ))}
                    <div className="space-y-2 flex flex-col">
                        <Label className="">Admin Note:</Label>
                        <Textarea className="resize-none h-[200px]" placeholder="Write A note" value={""} onChange={() => {}} name="note" />
                    </div>
                </ScrollArea>

                <div className="flex justify-end pt-4">
                    <Button onClick={handleAssign}>Submit</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

AssignUnitsDialog.propTypes;

export default AssignUnitsDialog;
