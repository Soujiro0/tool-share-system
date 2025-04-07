import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PropTypes from "prop-types";
import { useState } from "react";
import DeleteRequestDialog from "../dialogs/DeleteRequestDialog";
import EditRequestDialog from "../dialogs/EditRequestDialog";

const RequestsTable = ({ data, setData, refresh }) => {
    const [editData, setEditData] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    if (!Array.isArray(data)) {
        return <div>Error: Data is not an array.</div>;
    }

    return (
        <>
            <Card>
                <CardContent className="p-4 overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Request ID</TableHead>
                                <TableHead className="w-[150px]">Date</TableHead>
                                <TableHead>Remarks</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead className="w-[160px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((req) => (
                                <TableRow key={req.request_id}>
                                    <TableCell>{req.request_id}</TableCell>
                                    <TableCell>{new Date(req.request_date).toLocaleDateString()}</TableCell>
                                    <TableCell>{req.remarks}</TableCell>
                                    <TableCell>{req.status}</TableCell>
                                    <TableCell>
                                        <ul className="list-disc pl-4">
                                            {req.requested_items.map((item) => (
                                                <li key={item.item_id}>
                                                    {item.name} × {item.quantity}
                                                </li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button size="sm" onClick={() => setEditData(req)}>
                                                Edit
                                            </Button>
                                            <Button size="sm" variant="destructive" onClick={() => setDeleteId(req.request_id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {editData && <EditRequestDialog request={editData} onClose={() => setEditData(null)} setData={setData} refresh={refresh} />}
                    {deleteId && <DeleteRequestDialog id={deleteId} onClose={() => setDeleteId(null)} setData={setData} />}
                </CardContent>
            </Card>
        </>
    );
};

RequestsTable.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            request_id: PropTypes.string.isRequired,
            request_date: PropTypes.string.isRequired,
            remarks: PropTypes.string,
            status: PropTypes.string.isRequired,
            requested_items: PropTypes.arrayOf(
                PropTypes.shape({
                    item_id: PropTypes.string.isRequired,
                    item_name: PropTypes.string.isRequired,
                    quantity: PropTypes.number.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    setData: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
};

export default RequestsTable;
