import ApiService from "@/api/ApiService";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

const BorrowedHistoryDialog = ({ isOpen, onClose, selectedItem }) => {
    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchHistory = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await ApiService.BorrowItemService.getItemHistory(
                selectedItem.unit_id // Add unit_id to the API call
            );
            setHistory(response.data);
        } catch (err) {
            console.error("Error fetching item history:", err);
            setError("Failed to load history");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isOpen) return;
        fetchHistory();
    }, [selectedItem, isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent width="max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Borrowed History</DialogTitle>
                </DialogHeader>
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : history ? (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Borrower</TableHead>
                                    <TableHead>Request Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Qty</TableHead>
                                    <TableHead>Condition Out</TableHead>
                                    <TableHead>Condition In</TableHead>
                                    <TableHead>Damage Notes</TableHead>
                                    <TableHead>Returned Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{history.requested_by}</TableCell>
                                    <TableCell>{history.request_date}</TableCell>
                                    <TableCell>{history.request_status}</TableCell>
                                    <TableCell>1</TableCell> {/* Assuming 1 item per request unless specified */}
                                    <TableCell>{history.item_condition_out}</TableCell>
                                    <TableCell>{history.item_condition_in || "Not Returned"}</TableCell>
                                    <TableCell>{history.damage_notes || "None"}</TableCell>
                                    <TableCell>{history.returned_date || "Not Returned"}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <p className="text-center">No borrowing history available.</p>
                )}
            </DialogContent>
        </Dialog>
    );
};

BorrowedHistoryDialog.propTypes;

export default BorrowedHistoryDialog;
