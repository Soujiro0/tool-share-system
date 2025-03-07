import { useContext, useEffect, useState } from "react";
import ApiService from "../../api/ApiService";
import Header from "../../components/layout/Header";
import BorrowRequestTable from "../../components/tables/BorrowRequestTable";
import { AuthContext } from "../../context/AuthContext";

export const ApprovalList = () => {
    const { auth } = useContext(AuthContext);
    const { token } = auth;

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPendingRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchPendingRequests = async () => {
        try {
            setLoading(true);
            const data = await ApiService.BorrowRequestService.getBorrowRequests(token);
            const pendingRequests = data.requests.filter((req) => req.request_status === "PENDING_FACULTY_APPROVAL");
            setRequests(pendingRequests);
        } catch (error) {
            console.error("Error fetching pending requests:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <Header headerTitle={"Approval List"} />
            <div className="py-5">
                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <BorrowRequestTable requests={requests} onUpdate={fetchPendingRequests} />
                )}
            </div>
        </div>
    );
};

export default ApprovalList;