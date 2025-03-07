import { useContext, useEffect, useState } from "react";
import ApiService from "../../api/ApiService";
import Header from "../../components/layout/Header";
import BorrowRequestTable from "../../components/tables/BorrowRequestTable";
import Searchbar from "../../components/ui/Searchbar";
import { AuthContext } from "../../context/AuthContext";

export const FacultyDashboard = () => {
    const { auth } = useContext(AuthContext);
    const { token } = auth;

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBorrowRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchBorrowRequests = async () => {
        try {
            setLoading(true);
            const data = await ApiService.BorrowRequestService.getBorrowRequests(token);
            setRequests(data.requests);
        } catch (error) {
            console.error("Error fetching borrow requests:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            {/* Main Content */}
            <div className="flex-1">
                <Header headerTitle={"Dashboard"} />
                <div className="py-5">
                    <Searchbar placeholder={"Search Request..."} onSearch={() => {}} />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-gray-200 p-2 rounded-2xl">
                    <div className="bg-white p-4 rounded-lg shadow text-center">
                        <h3 className="text-lg font-semibold">Pending</h3>
                        <p className="text-2xl font-bold mt-2">
                            {requests.filter((req) => req.request_status === "PENDING_FACULTY_APPROVAL").length}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow text-center">
                        <h3 className="text-lg font-semibold">Approved</h3>
                        <p className="text-2xl font-bold mt-2">{requests.filter((req) => req.request_status === "APPROVED").length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow text-center">
                        <h3 className="text-lg font-semibold">Rejected</h3>
                        <p className="text-2xl font-bold mt-2">{requests.filter((req) => req.request_status === "REJECTED_BY_FACULTY").length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow text-center">
                        <h3 className="text-lg font-semibold">Cancelled</h3>
                        <p className="text-2xl font-bold mt-2">{requests.filter((req) => req.request_status === "CANCELLED").length}</p>
                    </div>
                </div>

                {/* Recent Requests Table */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Recent Requests</h3>
                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <BorrowRequestTable requests={requests} onUpdate={fetchBorrowRequests} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default FacultyDashboard;
