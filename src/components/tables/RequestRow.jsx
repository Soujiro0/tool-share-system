import ApiService from "@/api/ApiService";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { AuthContext }  from "@/context/AuthContext";
import { useContext, useState } from "react";
import AssignUnitsDialog from "../dialogs/AssignUnitsDialog";
import ReturnCheckDialog from "../dialogs/ReturnCheckDialog";

const RequestRow = ({ request, refresh }) => {
        const { auth } = useContext(AuthContext);
        const userId = auth.user?.user_id;
    const [openAssign, setOpenAssign] = useState(false);
    const [openReturn, setOpenReturn] = useState(false);

    const handleStatusChange = async (status) => {
        const payload = {
            status: status,
            handled_by: userId,
        }
        // Call your API here
        console.log(`Change status to ${status} for request ${request.request_id}`);

        console.log("Approve payload:", payload);
        try {
            const data = await ApiService.RequestBorrowService.approveRequestByAdmin(request.request_id, payload);
            console.log("Request approved successfully:", data);
        } catch (error) {
            console.error("Error approving request:", error);
        } finally {
            refresh();
        }
    };

    return (
        <>
            <TableRow className="text-center">
                <TableCell className="p-2">{request.request_id}</TableCell>
                <TableCell className="p-2">{request.requested_by}</TableCell>
                <TableCell className="p-2">{request.status}</TableCell>
                <TableCell className="p-2 text-left">
                    {request.requested_items.map((item) => (
                        <div key={item.item_id}>
                            {item.name}
                        </div>
                    ))}
                </TableCell>
                <TableCell className="p-2 text-center">
                    {request.requested_items.map((item) => (
                        <div key={item.item_id}>
                            x {item.quantity}
                        </div>
                    ))}
                </TableCell>
                <TableCell className="p-2 space-x-2">
                    {request.status === "PENDING" && (
                        <>
                            <Button onClick={() => setOpenAssign(true)}>APPROVE</Button>
                            <Button variant="destructive" onClick={() => handleStatusChange("REJECTED")}>
                                REJECT
                            </Button>
                        </>
                    )}
                    {request.status === "APPROVED" && <Button onClick={() => handleStatusChange("CLAIMED")}>CLAIMED</Button>}
                    {request.status === "CLAIMED" && <Button onClick={() => setOpenReturn(true)}>RETURN CHECK</Button>}
                    {request.status === "RETURN_READY" && <Button onClick={() => handleStatusChange("RETURNED")}>RETURNED</Button>}
                </TableCell>
            </TableRow>

            <AssignUnitsDialog open={openAssign} onClose={() => setOpenAssign(false)} request={request} refresh={refresh} />
            <ReturnCheckDialog open={openReturn} onClose={() => setOpenReturn(false)} request={request} />
        </>
    );
};

RequestRow.propTypes;

export default RequestRow;
