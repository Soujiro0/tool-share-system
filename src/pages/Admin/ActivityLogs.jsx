import { useContext, useEffect, useState } from "react";
import ApiService from "../../api/ApiService";
import ActivityFilter from "../../components/filters/ActivityFilter";
import Header from "../../components/layout/Header";
import ActivityLogTable from "../../components/tables/ActivityLogTable";
import Pagination from "../../components/ui/Pagination";
import Searchbar from "../../components/ui/Searchbar";
import { AuthContext } from "../../context/AuthContext";

export const ActivityLogs = () => {
    const { auth } = useContext(AuthContext);
    const { token } = auth;

    const [logs, setLogs] = useState([]);
    const [selectedLogs, setSelectedLogs] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [logTotalPages, setLogTotalPages] = useState(1);

    const [filters, setFilters] = useState({
        userType: "",
        actionType: "",
        startDate: "",
        endDate: "",
        searchQuery: "",
    });

    const handleSearch = (searchQuery) => {
        resetPage();
        setFilters((prevFilters) => ({ ...prevFilters, searchQuery }));
    };

    const handleUserTypeFilterChange = (userType) => {
        resetPage();
        setFilters((prevFilters) => ({ ...prevFilters, userType }));
    };

    const handleActionTypeFilterChange = (actionType) => {
        resetPage();
        setFilters((prevFilters) => ({ ...prevFilters, actionType }));
    };

    const handleStartDateChange = (startDate) => {
        resetPage();
        setFilters((prevFilters) => ({ ...prevFilters, startDate }));
    };

    const handleEndDateChange = (endDate) => {
        resetPage();
        setFilters((prevFilters) => ({ ...prevFilters, endDate }));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const resetPage = () => {
        setCurrentPage(1);
    };

    const fetchLogs = async () => {
        try {
            const data = await ApiService.ActivityLogService.getActivityLogs(
                token,
                10,
                currentPage,
                filters.userType,
                filters.actionType,
                filters.startDate,
                filters.endDate,
                filters.searchQuery
            );
            console.log(data.totalLogs)
            setLogTotalPages(Math.ceil(data.totalLogs / 10));
            setLogs(data.logs);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const handleSelectAll = (isSelected) => {
        if (isSelected) {
            setSelectedLogs(logs.map(log => log.log_id));
        } else {
            setSelectedLogs([]);
        }
    };

    const handleToggleSelection = (logId) => {
        setSelectedLogs((prevSelectedLogs) =>
            prevSelectedLogs.includes(logId)
                ? prevSelectedLogs.filter(id => id !== logId)
                : [...prevSelectedLogs, logId]
        );
    };

    const handleDeleteSelected = async () => {
        try {
            for (const logId of selectedLogs) {
                await ApiService.ActivityLogService.deleteActivityLog(token, logId);
            }
            setSelectedLogs([]);
            fetchLogs();
        } catch (error) {
            console.error("Error deleting logs:", error);
        }
    };

    useEffect(() => {
        fetchLogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, currentPage, filters]);

    return (
        <>
            <Header headerTitle={"Activity Logs"} />
            <div className="flex items-center my-5">
                <Searchbar onSearch={handleSearch} placeholder={"Search Logs..."} />
                <ActivityFilter
                    onFilterByUserType={handleUserTypeFilterChange}
                    onFilterByActionType={handleActionTypeFilterChange}
                    onFilterByStartDate={handleStartDateChange}
                    onFilterByEndDate={handleEndDateChange}
                />
            </div>
            <div>
                <ActivityLogTable
                    logs={logs}
                    showOptions={true}
                    toggleSelection={handleToggleSelection}
                    selectedLogs={selectedLogs}
                    onSelectAll={handleSelectAll}
                    onDeleteSelected={handleDeleteSelected}
                    onFilterByUserType={() => {}}
                    onFilterByActionType={() => {}}
                    onFilterByStartDate={() => {}}
                    onFilterByEndDate={() => {}}
                    onSearch={() => {}}
                    onRefresh={() => {}}
                />
                <Pagination currentPage={currentPage} totalPages={logTotalPages} onPageChange={handlePageChange} />
            </div>
        </>
    );
};

export default ActivityLogs;
