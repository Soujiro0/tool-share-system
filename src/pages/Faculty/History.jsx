import { useContext, useEffect, useState } from "react";
import ApiService from "../../api/ApiService";
import Header from "../../components/layout/Header";
import BorrowRequestTable from "../../components/tables/BorrowRequestTable";
import { AuthContext } from "../../context/AuthContext";
import { InputField } from "../../components/ui/InputField";

export const History = () => {
    const { auth } = useContext(AuthContext);
    const { token } = auth;

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        fetchAllRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate]);

    const fetchAllRequests = async () => {
        try {
            setLoading(true);
            const data = await ApiService.BorrowRequestService.getBorrowRequests(token);
            let filteredRequests = data.requests;
            if (startDate) {
                filteredRequests = filteredRequests.filter((req) => new Date(req.date) >= new Date(startDate));
            }
            if (endDate) {
                filteredRequests = filteredRequests.filter((req) => new Date(req.date) <= new Date(endDate));
            }
            setRequests(filteredRequests);
        } catch (error) {
            console.error("Error fetching all requests:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <Header headerTitle={"History"} />
            <div className="py-5">
                <div className="flex space-x-4 mb-4">
                    <InputField
                        label="Start Date"
                        id="startDate"
                        type="date"
                        value={startDate}
                        setValue={setStartDate}
                        isRequired={false}
                    />
                    <InputField
                        label="End Date"
                        id="endDate"
                        type="date"
                        value={endDate}
                        setValue={setEndDate}
                        isRequired={false}
                    />
                </div>
                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <BorrowRequestTable requests={requests} />
                )}
            </div>
        </div>
    );
};

export default History;