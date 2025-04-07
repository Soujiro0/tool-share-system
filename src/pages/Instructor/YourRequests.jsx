import ApiService from "@/api/ApiService";
import Header from "@/components/layout/Header";
import RequestsTable from "@/components/tables/RequestTable";
import { Button } from "@/components/ui/button";
import FilterBar from "@/components/ui/custom/FilterBar";
// import Pagination from "@/components/ui/custom/Pagination";
import { Toaster } from "@/components/ui/sonner";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";

const YourRequests = () => {
    const { auth } = useContext(AuthContext);
    const userId = auth.user?.user_id;

    const [requests, setRequests] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filters, setFilters] = useState({ search: "", status: "", date: "" });
    // const [pagination, setPagination] = useState({ page: 1, perPage: 5 });

    const fetchRequests = async () => {
        try {
            const data = await ApiService.RequestBorrowService.getUserRequests(userId);
            console.log("Fetched requests:", data);
            setRequests(data.data);
            setFiltered(data.data);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    }

    useEffect(() => {
        if (!userId) return;
        fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Toaster richColors position="top-center" expand={true} />
            <Header headerTitle="Your Requests" />
            <div className="p-4 space-y-4">
                <div className="w-full flex justify-between items-center gap-2">
                    <FilterBar filters={filters} setFilters={setFilters} requests={requests} setFiltered={setFiltered} />
                    <Button onClick={() => {fetchRequests()}}>Refresh</Button>
                </div>
                <RequestsTable data={filtered} setData={setFiltered} refresh={fetchRequests}/>
                {/* <Pagination pagination={pagination} setPagination={setPagination} total={filtered.length} /> */}
            </div>
        </>
    );
};

export default YourRequests;
