import { useState } from "react";

export const ActivityFilter = ({ onFilterByUserType, onFilterByActionType, onFilterByStartDate, onFilterByEndDate }) => {
    const [userType, setUserType] = useState("");
    const [actionType, setActionType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleUserTypeChange = (event) => {
        const selectedUserType = event.target.value;
        setUserType(selectedUserType);
        onFilterByUserType(selectedUserType);
    };

    const handleActionTypeChange = (event) => {
        const selectedActionType = event.target.value;
        setActionType(selectedActionType);
        onFilterByActionType(selectedActionType);
    };

    const handleStartDateChange = (event) => {
        const selectedStartDate = event.target.value;
        setStartDate(selectedStartDate);
        onFilterByStartDate(selectedStartDate);
    };

    const handleEndDateChange = (event) => {
        const selectedEndDate = event.target.value;
        setEndDate(selectedEndDate);
        onFilterByEndDate(selectedEndDate);
    };

    return (
        <>
            <div className="mb-4 flex gap-4 w-full">
                <div className="flex items-center gap-5">
                    <label htmlFor="start-date">
                        <p>Start Date:</p>
                        <input type="date" id="start-date" name="start-name" className="p-2 border border-gray-300 rounded-md" value={startDate} onChange={handleStartDateChange} />
                    </label>
                    <label htmlFor="end-date">
                        <p>End Date:</p>
                        <input type="date" id="end-date" name="end-date" className="p-2 border border-gray-300 rounded-md" value={endDate} onChange={handleEndDateChange} />
                    </label>
                </div>
                <label htmlFor="user-category">
                    <p>User Category:</p>
                    <div className="p-2 border border-gray-300 rounded-md flex">
                        <select name="user-category" id="user-category" className="flex pr-2 w-full" value={userType} onChange={handleUserTypeChange}>
                            <option value="">All</option>
                            <option value="super_admin">Super Admin</option>
                            <option value="admin">Admin</option>
                            <option value="faculty">Faculty</option>
                        </select>
                    </div>
                </label>
                <label htmlFor="action-type">
                    <p>Action Type:</p>
                    <div className="p-2 border border-gray-300 rounded-md flex">
                        <select name="action-type" id="action-type" className="flex pr-2 w-full" value={actionType} onChange={handleActionTypeChange}>
                            <option value="">All</option>
                            <option value="create">Create</option>
                            <option value="update">Update</option>
                            <option value="delete">Delete</option>
                            <option value="approve">Approve</option>
                            <option value="reject">Reject</option>
                            <option value="return">Return</option>
                        </select>
                    </div>
                </label>
            </div>
        </>
    );
};

ActivityFilter.propTypes;

export default ActivityFilter;
