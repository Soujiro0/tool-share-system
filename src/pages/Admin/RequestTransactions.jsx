import ApiService from "@/api/ApiService";
import Header from "@/components/layout/Header";
import RequestTableAdmin from "@/components/tables/RequestTableAdmin";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Toaster } from "sonner";

const RequestTransaction = () => {
    const { auth } = useContext(AuthContext);
    const user = auth.user?.user_id;
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const data = await ApiService.RequestBorrowService.getAllRequests();
            setRequests(data.data);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    }

    useEffect(() => {
        fetchRequests();
        console.log(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Toaster richColors position="top-center" expand={true} />
            <Header headerTitle="Request Transactions" />
            <div className="p-4">
                <RequestTableAdmin data={requests} refresh={fetchRequests}/>
            </div>
        </>
    );
};

export default RequestTransaction;