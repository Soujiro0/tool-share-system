import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActivityFilter from "../ui/ActivityFilter";
import Searchbar from "../ui/Searchbar";
library.add(fas);

export const ActivityLog = ({ logs, showOptions = false, toggleSelection, selectedLogs, onSelectAll, onDeleteSelected, onFilterByUserType, onFilterByActionType, onFilterByStartDate, onFilterByEndDate, onSearch, onRefresh }) => {
    const iconsByActionType = {
        Create: "plus",
        Approve: "check",
        Update: "edit",
        Process: "sync-alt",
        Delete: "trash-alt",
    };

    const colorByUserType = {
        admin: "green",
        super_admin: "blue",
    };

    const handleSelectAllChange = (event) => {
        onSelectAll(event.target.checked);
    };

    return (
        <>
            {showOptions && (
                <>
                    <div className="mb-2 flex-col">
                        <div className="mb-2">
                            <Searchbar onSearch={onSearch} />
                        </div>
                        <ActivityFilter onFilterByUserType={onFilterByUserType} onFilterByActionType={onFilterByActionType} onFilterByStartDate={onFilterByStartDate} onFilterByEndDate={onFilterByEndDate} />
                    </div>
                    <div className="flex items-center gap-10">
                        <label htmlFor="select-all" className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="select-all"
                                id="select-all"
                                className="h-5 w-5"
                                onChange={handleSelectAllChange}
                                checked={selectedLogs.length === logs.length && logs.length > 0}
                            />
                            <p>Select All</p>
                        </label>
                        <div className="flex items-center gap-2">
                            <button className="bg-blue-50 px-6 py-1 rounded-2xl" onClick={onRefresh}>
                                <FontAwesomeIcon icon="refresh" />
                            </button>
                            <button className="bg-red-200 px-6 py-1 rounded-2xl" onClick={onDeleteSelected}>
                                <FontAwesomeIcon icon="trash-can" />
                            </button>
                        </div>
                    </div>
                </>
            )}
            <div className="p-2 bg-white rounded-md shadow-md">
                <div className="max-h-full overflow-auto space-y-4 p-2 rounded-md">
                    {logs.length > 0 ? (
                        logs.map((log) => {
                            const iconName = iconsByActionType[log.action_type] || "question-circle";
                            const colorName = colorByUserType[log.role] || "gray";

                            return (
                                <div key={log.id} className="flex items-center gap-5 border-b pb-2">
                                    {showOptions && (
                                        <input
                                            type="checkbox"
                                            checked={selectedLogs.includes(log.id)}
                                            onChange={() => toggleSelection(log.id)}
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                    )}
                                    <button className={`text-${colorName}-600`}>
                                        <FontAwesomeIcon icon={["fas", iconName]} />
                                    </button>
                                    <div className="flex flex-col gap-1">
                                        <p className={`text-${colorName}-600 font-bold`}>
                                            {`${log.user_name} (${log.role === "super_admin" ? "Super Admin" : "Admin"})`}
                                        </p>
                                        <div className="flex items-center gap-5">
                                            <p>{log.action}</p>
                                            <p className="text-gray-500 text-sm">{log.action_timestamp}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-500">No logs found</p>
                    )}
                </div>
            </div>
        </>
    );
};

ActivityLog.propTypes;

export default ActivityLog;
