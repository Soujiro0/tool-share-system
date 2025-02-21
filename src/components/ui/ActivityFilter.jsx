import { faTasks, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SelectField from "./SelectField";

export const ActivityFilter = ({ onFilterByUserType, onFilterByActionType, onFilterByStartDate, onFilterByEndDate }) => {
    const [, setUserType] = useState("");
    const [, setActionType] = useState("");
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
                        <input type="date" id="start-date" name="start-name" className="p-2 border rounded-md" value={startDate} onChange={handleStartDateChange} />
                    </label>
                    <label htmlFor="end-date">
                        <p>End Date:</p>
                        <input type="date" id="end-date" name="end-date" className="p-2 border rounded-md" value={endDate} onChange={handleEndDateChange} />
                    </label>
                </div>
                <label htmlFor="user-category">
                    <p>User Category:</p>
                    <SelectField
                        icon={faUser}
                        options={[
                            {
                                name: "All",
                                value: "",
                            },
                            {
                                name: "Super Admin",
                                value: "super_admin",
                            },
                            {
                                name: "Admin",
                                value: "admin",
                            },
                            {
                                name: "Faculty",
                                value: "faculty",
                            },
                        ]}
                        onChange={handleUserTypeChange}
                    />
                </label>
                <label htmlFor="action-type">
                    <p>Action Type:</p>
                    <SelectField
                        icon={faTasks}
                        options={[
                            {
                                name: "All",
                                value: "",
                            },
                            {
                                name: "Create",
                                value: "Create",
                            },
                            {
                                name: "Update",
                                value: "Update",
                            },
                            {
                                name: "Delete",
                                value: "Delete",
                            },
                        ]}
                        onChange={handleActionTypeChange}
                    />
                </label>
            </div>
        </>
    );
};

ActivityFilter.propTypes;

export default ActivityFilter;
