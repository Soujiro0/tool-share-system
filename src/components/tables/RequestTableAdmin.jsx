import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RequestRow from "./RequestRow";

const RequestTableAdmin = ({ data, refresh }) => {
    return (
        <div className="overflow-x-auto border shadow">
            <Table>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="text-center">Request ID</TableHead>
                        <TableHead className="text-center">Requested By</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">Items</TableHead>
                        <TableHead className="text-center">Request Quantity</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((req) => (
                        <RequestRow key={req.request_id} request={req} className="text-center" refresh={refresh} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

RequestTableAdmin.propTypes;

export default RequestTableAdmin;
