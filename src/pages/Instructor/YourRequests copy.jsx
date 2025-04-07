import ApiService from "@/api/ApiService";
import DeleteRequestDialog from "@/components/dialogs/DeleteRequestDialog";
import EditRequestDialog from "@/components/dialogs/EditRequestDialog";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AuthContext } from "@/context/AuthContext";
import { Edit, RefreshCcw, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 5;

const YourRequests = () => {
    const { auth } = useContext(AuthContext);
    const userId = auth.user?.user_id;

    const [requests, setRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [editRequest, setEditRequest] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [addedItems, setAddedItems] = useState([]);
    const [deletedItems, setDeletedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredRequests = requests.filter(
        (req) =>
            (searchTerm === "" || req.borrowed_items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))) &&
            (statusFilter === "ALL" || statusFilter === "" || req.status === statusFilter) &&
            (dateFilter === "" || req.request_date.startsWith(dateFilter))
    );

    const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
    const paginatedRequests = filteredRequests.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const fetchRequests = async () => {
        try {
            const data = await ApiService.RequestBorrowService.getUserRequests(userId);
            setRequests(data.request);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    const handleEditRequest = async () => {
        if (deletedItems.length === 0 && addedItems.length === 0) return;

        try {
            for (const itemId of deletedItems) {
                await ApiService.BorrowItemService.deleteItemRequest(itemId);
            }

            for (const items of addedItems) {
                const itemRequest = {
                    request_id: editRequest.request_id,
                    ...items,
                };
                await ApiService.BorrowItemService.createItemRequest(itemRequest);
            }
        } catch (error) {
            console.error("Error updating request:", error);
        } finally {
            setDeletedItems([]);
            setAddedItems([]);
            fetchRequests();
            setEditRequest(null);
        }

        toast.success("UPDATED borrow request successfully", {
            description: `Request ${editRequest.request_id} has been updated.`,
        });
    };

    const handleDeleteRequest = async () => {
        if (!confirmDelete) return;

        try {
            await ApiService.RequestBorrowService.deleteRequest(confirmDelete);
        } catch (error) {
            console.error("Error deleting request:", error);
        } finally {
            setConfirmDelete(null);
            fetchRequests();
        }

        toast.success("DELETE borrow request successfully", {
            description: `Request ${confirmDelete} has been deleted.`,
        });
    };

    useEffect(() => {
        fetchRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Toaster richColors position="top-center" expand={true} />
            <Header headerTitle="Your Requests" />
            <Card className="max-w-6xl mx-auto mt-6 p-6 shadow-lg">
                <CardContent>
                    <div className="flex gap-4 mb-4">
                        <Input placeholder="Search by item name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Statuses</SelectItem>
                                {["PENDING", "APPROVED", "REJECTED", "BORROWED", "RETURNED"].map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input type="date" onChange={(e) => setDateFilter(e.target.value)} />
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchTerm("");
                                setStatusFilter("");
                                setDateFilter("");
                                fetchRequests();
                            }}
                        >
                            <RefreshCcw />
                            Refresh & Reset
                        </Button>
                    </div>

                    {/* Table */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Request Date</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedRequests.length > 0 ? (
                                paginatedRequests.map((req) => (
                                    <TableRow key={req.request_id}>
                                        <TableCell>{req.request_id}</TableCell>
                                        <TableCell>{req.status}</TableCell>
                                        <TableCell>{req.request_date}</TableCell>
                                        <TableCell>
                                            <ul className="list-disc pl-4">
                                                {req.borrowed_items.map((item, index) => (
                                                    <li key={index}>{item.name}</li>
                                                ))}
                                            </ul>
                                        </TableCell>

                                        <TableCell className="flex gap-2">
                                            {req.status === "PENDING" && (
                                                <Button size="sm" variant="outline" onClick={() => setEditRequest(req)}>
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            )}
                                            <Button size="sm" variant="destructive" onClick={() => setConfirmDelete(req.request_id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4">
                                        No requests found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-4">
                        <Button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1} variant="outline">
                            Previous
                        </Button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage === totalPages} variant="outline">
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Edit Dialog */}
            <EditRequestDialog
                editRequest={editRequest}
                setEditRequest={setEditRequest}
                handleEditSubmit={handleEditRequest}
                setAddedItems={setAddedItems}
                setDeletedItems={setDeletedItems}
            />

            {/* Delete Confirmation */}
            <DeleteRequestDialog confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} handleDelete={handleDeleteRequest} />
        </>
    );
};

export default YourRequests;
