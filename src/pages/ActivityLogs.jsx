import { useContext, useEffect, useState } from "react";
import ApiService from "../api/ApiService";
import Header from "../components/layout/Header";
import ActivityLog from "../components/tracking/ActivityLog";
import Modal from "../components/ui/Modal";
import Pagination from "../components/ui/Pagination";
import { AuthContext } from "../context/AuthContext";

export const ActivityLogs = () => {
    const { auth } = useContext(AuthContext);
    const token = auth.token;

    const [activityLogs, setActivityLogs] = useState([]);
    const [activityPage, setActivityPage] = useState(1);
    const [activityLimit] = useState(10);
    const [activityTotalPage, setActivityTotalPage] = useState(1);

    const [selectedLogs, setSelectedLogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userType, setUserType] = useState("");
    const [actionType, setActionType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const fetchActivityLogs = async () => {
        try {
            const data = await ApiService.ActivityLogService.getActivityLogs(token, activityLimit, activityPage, userType, actionType, startDate, endDate, searchQuery);
            setActivityTotalPage(Math.ceil(data.totalLogs / activityLimit));
            setActivityLogs(data.logs);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const handleDeleteSelected = async () => {
        const selectedItems = activityLogs.filter((log) => selectedLogs.includes(log.id));
        console.log("Selected items to delete:", selectedItems);

        try {
            await Promise.all(selectedItems.map((item) => ApiService.ActivityLogService.deleteActivityLog(token, item.id)));
            setSelectedLogs([]);
            fetchActivityLogs();
        } catch (error) {
            console.error("Error deleting selected items:", error);
        }
    };

    const toggleSelection = (id) => {
        setSelectedLogs((prev) => (prev.includes(id) ? prev.filter((logId) => logId !== id) : [...prev, id]));
    };

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            setSelectedLogs(activityLogs.map((log) => log.id));
        } else {
            setSelectedLogs([]);
        }
    };

    const openDeleteModal = () => {
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
    };

    const confirmDelete = () => {
        handleDeleteSelected();
        closeDeleteModal();
    };

    const handleFilterByUserType = (selectedUserType) => {
        setUserType(selectedUserType);
    };

    const handleFilterByActionType = (selectedActionType) => {
        setActionType(selectedActionType);
    };

    const refreshActivityLogs = () => {
        fetchActivityLogs();
    };

    useEffect(() => {
        fetchActivityLogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, activityPage, activityLimit, userType, actionType, startDate, endDate, searchQuery]);

    return (
        <>
            <div className="w-full mx-auto">
                <Header headerTitle="Activity Logs" />

                <div className="p-2 rounded-md bg-white my-4">
                    <ActivityLog
                        logs={activityLogs}
                        showOptions={true}
                        toggleSelection={toggleSelection}
                        selectedLogs={selectedLogs}
                        onSelectAll={handleSelectAll}
                        onDeleteSelected={openDeleteModal}
                        onFilterByUserType={handleFilterByUserType}
                        onFilterByActionType={handleFilterByActionType}
                        onFilterByStartDate={setStartDate}
                        onFilterByEndDate={setEndDate}
                        onSearch={setSearchQuery}
                        onRefresh={refreshActivityLogs}
                    />
                    <Pagination currentPage={activityPage} totalPages={activityTotalPage} onPageChange={setActivityPage} />
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeDeleteModal}>
                <p>Are you sure you want to delete the selected logs?</p>
                <div className="mt-4 w-full">
                    <button onClick={confirmDelete} className="bg-red-600 text-white px-4 py-2 rounded-md w-full">
                        Delete
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default ActivityLogs;
