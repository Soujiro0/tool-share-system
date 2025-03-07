import PropTypes from "prop-types";
import { useContext } from "react";
import ApiService from "../../api/ApiService";
import { AuthContext } from "../../context/AuthContext";

export const BorrowRequestTable = ({ requests, onUpdate }) => {
    const { auth } = useContext(AuthContext);
    const { token } = auth;

    const handleUpdateStatus = async (requestId, status) => {
        try {
            await ApiService.BorrowRequestService.updateBorrowRequestStatus(token, requestId, status);
            onUpdate();
            // Create transaction if approved
            if (status === "APPROVED") {
                await ApiService.TransactionService.createTransaction(token, requestId);
            }
        } catch (error) {
            console.error("Error updating borrow request status:", error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="py-2 px-4">Request ID</th>
                        <th className="py-2 px-4">Borrower Name</th>
                        <th className="py-2 px-4">Items Borrowed</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.length > 0 ? (
                        requests.map((req, index) => {
                            let items = [];

                            try {
                                items = JSON.parse(req.items_borrowed);
                                if (!Array.isArray(items)) items = [];
                            } catch (error) {
                                console.error("Error parsing items_borrowed:", error);
                            }

                            return (
                                <tr key={index} className="border-t text-sm">
                                    <td className="py-2 px-4">{req.request_id}</td>
                                    <td className="py-2 px-4">
                                        <div>
                                            <p>{req.borrower_name}</p>
                                            <p className="text-xs text-gray-500">ID: {req.faculty_user_id || "N/A"}</p>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        {items.length > 0 ? (
                                            <ul>
                                                {items.map((entry, i) => {
                                                    // Check if entry is an array or single value
                                                    if (Array.isArray(entry)) {
                                                        return (
                                                            <li key={i}>
                                                                <strong>Item ID:</strong> {entry[0]} | <strong>Qty:</strong> {entry[1]}
                                                            </li>
                                                        );
                                                    } else {
                                                        return (
                                                            <li key={i} className="text-gray-500 italic">
                                                                Invalid Item Format
                                                            </li>
                                                        );
                                                    }
                                                })}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500 italic">No items borrowed</p>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${
                                                req.request_status === "PENDING_FACULTY_APPROVAL"
                                                    ? "bg-yellow-100 text-yellow-600"
                                                    : req.request_status === "APPROVED"
                                                    ? "bg-green-100 text-green-600"
                                                    : req.request_status === "REJECTED_BY_FACULTY"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                                            {req.request_status.replace(/_/g, " ")}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex gap-2">
                                            <button
                                                className="bg-green-500 text-white px-3 py-1 rounded-full"
                                                onClick={() => handleUpdateStatus(req.request_id, "APPROVED")}
                                                disabled={req.request_status !== "PENDING_FACULTY_APPROVAL"}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded-full"
                                                onClick={() => handleUpdateStatus(req.request_id, "REJECTED_BY_FACULTY")}
                                                disabled={req.request_status !== "PENDING_FACULTY_APPROVAL"}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center text-gray-500 py-4">
                                No borrow requests found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

BorrowRequestTable.propTypes = {
    requests: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default BorrowRequestTable;