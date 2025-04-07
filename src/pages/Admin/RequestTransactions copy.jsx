import ApiService from "@/api/ApiService";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const statuses = ["PENDING", "BORROWED", "RETURNED", "REJECTED"];

const RequestTransaction = () => {
    const { auth } = useContext(AuthContext);
    const user = auth.user?.user_id;

    const [requests, setRequests] = useState([]);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [returnDialog, setReturnDialog] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [returnCondition, setReturnCondition] = useState("GOOD");
    const [returnRemarks, setReturnRemarks] = useState("");

    const filteredRequests = requests.filter(
        (req) =>
            (req.remarks?.toLowerCase() || "").includes(search.toLowerCase()) &&
            (filterStatus && filterStatus !== "ALL" ? req.status === filterStatus : true)
    );

    const totalPages = Math.ceil(filteredRequests.length / entriesPerPage);
    const displayedRequests = filteredRequests.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

    const fetchRequest = async () => {
        try {
            const data = await ApiService.RequestBorrowService.getAllRequests();
            setRequests(data.request);
        } catch (error) {
            console.error("Error fetching Requests", error);
            throw error;
        }
    };

    const handleEdit = async (id, payload) => {
        console.log(payload);
        try {
            await ApiService.RequestBorrowService.updateRequest(id, payload);
        } catch (error) {
            console.error("Error Updating Status", error);
            throw error;
        } finally {
            fetchRequest();
        }

        toast.success("UPDATED status successfully", {
            description: `Request ID: ${id} status UPDATED to ${payload.newStatus}.`,
        });
    };

    useEffect(() => {
        fetchRequest();
    }, []);

    const handleAction = (id, newStatus) => {
        const request = requests.find((req) => req.request_id === id);

        if (!request) {
            console.error("Request not found");
            return;
        }

        const payload = {
            user_id: request.user_id,
            status: newStatus,
            handled_by: user,
        };

        handleEdit(id, payload);

        setRequests(requests.map((req) => (req.request_id === id ? { ...req, status: newStatus } : req)));
    };

    const handleReturn = () => {
        handleAction(selectedRequest.request_id, "RETURNED");
        setReturnDialog(false);
    };

    const openReturnDialog = (request) => {
        setSelectedRequest(request);
        setReturnDialog(true);
    };

    return (
        <>
            <Toaster richColors position="top-center" expand={true} />
            <Header headerTitle="Request Transactions" />
            <Card className="mt-5">
                <CardContent className="p-4">
                    <div className="flex justify-between mb-4 gap-2">
                        <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />

                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Status</SelectItem>
                                {statuses.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={entriesPerPage.toString()} onValueChange={(val) => setEntriesPerPage(Number(val))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Entries per page" />
                            </SelectTrigger>
                            <SelectContent>
                                {[5, 10, 15, 20].map((num) => (
                                    <SelectItem key={num} value={num.toString()}>
                                        {num} per page
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Request ID</TableHead>
                                <TableHead>User ID</TableHead>
                                <TableHead>Borrower&apos;s Name</TableHead>
                                <TableHead>Request Date</TableHead>
                                <TableHead>Processed Date</TableHead>
                                <TableHead>Returned Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Handled By</TableHead>
                                <TableHead>Remarks</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {displayedRequests.length > 0 ? (
                                displayedRequests.map((req) => (
                                    <TableRow key={req.request_id}>
                                        <TableCell>{req.request_id}</TableCell>
                                        <TableCell>{req.user_id}</TableCell>
                                        <TableCell>{req.borrower_name}</TableCell>
                                        <TableCell>{req.request_date}</TableCell>
                                        <TableCell>{req.processed_date}</TableCell>
                                        <TableCell>{req.return_date}</TableCell>
                                        <TableCell>{req.status}</TableCell>
                                        <TableCell>{req.handled_by_name}</TableCell>
                                        <TableCell>{req.remarks}</TableCell>
                                        <TableCell>
                                            {req.status === "PENDING" ? (
                                                <>
                                                    <Button onClick={() => handleAction(req.request_id, "APPROVED")} className="mr-2">
                                                        APPROVE
                                                    </Button>
                                                    <Button variant="destructive" onClick={() => handleAction(req.request_id, "REJECTED")}>
                                                        REJECT
                                                    </Button>
                                                </>
                                            ) : req.status === "APPROVED" ? (
                                                <>
                                                    <Button onClick={() => handleAction(req.request_id, "BORROWED")} className="mr-2">
                                                        BORROWED
                                                    </Button>
                                                    <Button disabled>RETURNED</Button>
                                                </>
                                            ) : req.status === "BORROWED" ? (
                                                <>
                                                    <Button disabled>BORROWED</Button>
                                                    <Button className="ml-2" onClick={() => openReturnDialog(req)}>
                                                        RETURNED
                                                    </Button>
                                                </>
                                            ) : req.status === "RETURNED" ? (
                                                <span>Returned</span>
                                            ) : (
                                                <span>Rejected</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={10} className="text-center">
                                        No borrow requests found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <Pagination total={totalPages} page={currentPage} onPageChange={setCurrentPage} />
                </CardContent>
            </Card>
            {/* Return Dialog */}
            <Dialog open={returnDialog} onOpenChange={setReturnDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Return Item</DialogTitle>
                    </DialogHeader>
                    <Select value={returnCondition} onValueChange={setReturnCondition}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Condition" />
                        </SelectTrigger>
                        <SelectContent>
                            {["EXCELLENT", "GOOD", "FAIR", "POOR"].map((cond) => (
                                <SelectItem key={cond} value={cond}>
                                    {cond}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Input placeholder="Remarks (Optional)" value={returnRemarks} onChange={(e) => setReturnRemarks(e.target.value)} />
                    <DialogFooter>
                        <Button onClick={handleReturn}>Confirm Return</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default RequestTransaction;
