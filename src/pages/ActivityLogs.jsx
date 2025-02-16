import { useContext, useEffect, useState } from "react";
import ApiService from "../api/ApiService";
import ActivityLog from "../components/tracking/ActivityLog";
import Pagination from "../components/ui/Pagination";
import { AuthContext } from "../context/AuthContext";

export const ActivityLogs = () => {
    const { auth } = useContext(AuthContext);
    const token = auth.token;

    const [activityLogs, setActivityLogs] = useState([]);
    const [activityPage, setActivityPage] = useState(1);
    const [activityLimit] = useState(20);
    const [activityTotalPage, setActivityTotalPage] = useState(1);

    const [selectedLogs, setSelectedLogs] = useState([]);

    // const filteredLogs = activityLogs.filter((log) => (filterDate ? log.action_timestamp.startsWith(filterDate) : true));

    const [filterDate, setFilterDate] = useState("");

    const toggleSelection = (id) => {
        setSelectedLogs((prev) => (prev.includes(id) ? prev.filter((logId) => logId !== id) : [...prev, id]));
    };

    const deleteLogs = () => {
        setActivityLogs((prevLogs) => prevLogs.filter((log) => !selectedLogs.includes(log.id)));
        setSelectedLogs([]);
    };

    const fetchActivityLogs = async () => {
        try {
            const data = await ApiService.ActivityLogService.getActivityLogs(token, activityLimit, activityPage);
            setActivityTotalPage(Math.ceil(data.totalLogs / activityLimit));
            setActivityLogs(data.logs);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    useEffect(() => {
        fetchActivityLogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, activityPage, activityLimit]);

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Activity Logs</h1>
            <div className="mb-4 flex gap-4">
                <input type="date" className="border p-2 rounded-md" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
                <button className="bg-red-600 text-white px-4 py-2 rounded-md" onClick={deleteLogs} disabled={selectedLogs.length === 0}>
                    Delete Selected
                </button>
            </div>
            <div className="border border-gray-300 p-4 rounded-md bg-white">
                <ActivityLog logs={activityLogs} showCheckboxes={true} toggleSelection={toggleSelection} selectedLogs={selectedLogs}/>
                <Pagination currentPage={activityPage} totalPages={activityTotalPage} onPageChange={setActivityPage} />
            </div>
        </div>
    );
};

export default ActivityLogs;
