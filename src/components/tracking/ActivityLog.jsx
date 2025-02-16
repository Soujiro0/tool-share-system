import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fas);

export const ActivityLog = ({ logs, showCheckboxes = false, toggleSelection, selectedLogs }) => {
    // Map action_type to a Font Awesome icon name
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

    return (
        <div className="p-2 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Activity Log</h2>

            {/* Scrollable Container */}
            <div className="max-h-full overflow-auto space-y-4 p-2 border border-gray-200 rounded-md">
                {logs.map((log) => {
                    const iconName = iconsByActionType[log.action_type] || "question-circle";
                    const colorName = colorByUserType[log.role] || "gray";

                    return (
                        <div key={log.id} className="flex items-center gap-5 border-b pb-2">
                            {showCheckboxes && (
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
                })}
            </div>
        </div>
    );
};

ActivityLog.propTypes;

export default ActivityLog;
