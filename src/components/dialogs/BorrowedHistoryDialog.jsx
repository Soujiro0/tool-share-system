import ApiService from "@/api/ApiService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

const BorrowedHistoryDialog = ({ isOpen, onClose, selectedItem }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchHistory = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log(selectedItem)
            console.log(selectedItem.item_id)
            const data = await ApiService.BorrowItemService.getItemHistory(selectedItem.item_id);
            setHistory(data.borrow_history);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                ) : history.length > 0 ? (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Borrower</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Condition Out</TableHead>
                                    <TableHead>Condition In</TableHead>
                                    <TableHead>Damage Notes</TableHead>
                                    <TableHead>Borrowed Date</TableHead>
                                    <TableHead>Returned Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {history.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.borrower_name}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.item_condition_out}</TableCell>
                                        <TableCell>{item.item_condition_in || "Not Returned"}</TableCell>
                                        <TableCell>{item.damage_notes || "None"}</TableCell>
                                        <TableCell>{item.date_created}</TableCell>
                                        <TableCell>{item.returned_date || "Not Returned"}</TableCell>
                                    </TableRow>
                                ))}
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