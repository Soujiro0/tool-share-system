import ApiService from "@/api/ApiService";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

const ReturnCheckDialog = ({ open, onClose, request }) => {
    const [units, setUnits] = useState([]);
    const [returnedData, setReturnedData] = useState({});

    // Simulate fetch function
    const fetchAssignedUnits = async () => {
        try {
            const data = await ApiService.BorrowItemService.getAssignUnitsByRequestId(request.request_id);
            setUnits(data.data); 
        } catch (error) {
            console.error("Error fetching assigned units:", error);
        }
    };

    useEffect(() => {
        if (open) {
            fetchAssignedUnits();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const toggleCheckbox = (unit_id) => {
        setReturnedData((prev) => ({
            ...prev,
            [unit_id]: {
                ...prev[unit_id],
                returned: !prev[unit_id]?.returned,
            },
        }));
    };

    const updateDamageStatus = (unit_id, value) => {
        setReturnedData((prev) => ({
            ...prev,
            [unit_id]: {
                ...prev[unit_id],
                damage_status: value,
            },
        }));
    };

    const updateDamageNotes = (unit_id, value) => {
        setReturnedData((prev) => ({
            ...prev,
            [unit_id]: {
                ...prev[unit_id],
                damage_notes: value,
            },
        }));
    };

    const handleReturn = async () => {
        const returned_units = Object.entries(returnedData)
            // eslint-disable-next-line no-unused-vars
            .filter(([_, data]) => data.returned)
            .map(([unit_id, data]) => ({
                unit_id: parseInt(unit_id),
                damage_status: data.damage_status || "UNDAMAGED",
                damage_notes: data.damage_notes || "",
            }));

        const payload = {
            request_id: request.request_id,
            returned_units,
        };

        console.log("Return checking payload:", payload);

        try {
            const data = await ApiService.BorrowItemService.returnUnits(request.request_id, payload);
            console.log("Return check response:", data);
        } catch (error) {
            console.error("Error returning units:", error);
        } finally {
            console.log("");
        }
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent width="max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Return Check for {request.requested_by}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                <ScrollArea className="h-[700px] pr-2 space-y-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px] text-center">Return</TableHead>
                                <TableHead className="w-[100px] text-center">Unit ID</TableHead>
                                <TableHead>Property No.</TableHead>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Brand</TableHead>
                                <TableHead>Model</TableHead>
                                <TableHead>Specification</TableHead>
                                <TableHead>Damage Status</TableHead>
                                <TableHead>Damage Notes</TableHead>
                                <TableHead>Return Data</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {units.map((unit) => (
                                <TableRow key={unit.unit_id}>
                                    
                                    <TableCell className="text-center">
                                        <Checkbox
                                            checked={returnedData[unit.unit_id]?.returned || false}
                                            onCheckedChange={() => toggleCheckbox(unit.unit_id)}
                                        />
                                    </TableCell>
                                    <TableCell>{unit.unit_id}</TableCell>
                                    <TableCell>{unit.property_no}</TableCell>
                                    <TableCell>{unit.item_name}</TableCell>
                                    <TableCell>{unit.brand}</TableCell>
                                    <TableCell>{unit.model}</TableCell>
                                    <TableCell>{unit.specification}</TableCell>
                                    <TableCell>
                                        <Select
                                            onValueChange={(value) =>
                                                updateDamageStatus(unit.unit_id, value)
                                            }
                                            value={returnedData[unit.unit_id]?.damage_status || "UNDAMAGED"}
                                        >
                                            <SelectTrigger className="w-[140px]">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="UNDAMAGED">Undamaged</SelectItem>
                                                <SelectItem value="DAMAGED">Damaged</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Textarea
                                            value={returnedData[unit.unit_id]?.damage_notes || ""}
                                            onChange={(e) =>
                                                updateDamageNotes(unit.unit_id, e.target.value)
                                            }
                                            placeholder="Add notes (optional)"
                                            className="min-w-[180px] resize-none"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {unit.return_date ?? "Not Returned"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </ScrollArea>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                    <Button
                        onClick={handleReturn}
                        disabled={
                            !Object.values(returnedData).some((entry) => entry.returned)
                        }
                    >
                        Submit
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

ReturnCheckDialog.propTypes;

export default ReturnCheckDialog;
