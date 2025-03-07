import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

export const ActivityLogTable = ({ logs, showOptions = false, toggleSelection, selectedLogs, onSelectAll, onDeleteSelected, onRefresh }) => {
    
    const iconsByActionType = {
        CREATE: "plus",
        UPDATE: "edit",
        DELETE: "trash-alt",
        APPROVED: "check",
        REJECTED: "reject",
        REQUEST: "hand",
        CANCELLED: "",
        BORROWED: "",
        RETURNED: "",
        LOGIN: "right-to-bracket"
    };

    // const colorByUserType = {
    //     1: "blue",
    //     2: "light",
    //     3: "red",
    // };

    const roles = [
        {
            role_id: 1,
            role_name: "Super Admin"
        },
        {
            role_id: 2,
            role_name: "Admin"
        },
        {
            role_id: 3,
            role_name: "Faculty"
        },
    ];

    return (
        <>
            <div className="bg-white rounded-md shadow-md">
                {showOptions && (
                    <>
                        {/* Bulk Actions */}
                        <div className="flex items-center gap-5 mb-2">
                            <label htmlFor="select-all" className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="select-all"
                                    className="h-5 w-5"
                                    onChange={(e) => onSelectAll(e.target.checked)}
                                    checked={selectedLogs.length === logs.length && logs.length > 0}
                                />
                                <p>Select All</p>
                            </label>
                            <button className="bg-blue-50 px-6 py-1 rounded-2xl" onClick={onRefresh}>
                                <FontAwesomeIcon icon="sync-alt" />
                            </button>
                            <button className="bg-red-200 px-6 py-1 rounded-2xl" onClick={onDeleteSelected}>
                                <FontAwesomeIcon icon="trash-alt" />
                            </button>
                        </div>
                    </>
                )}

                {/* Table */}
                <div className="overflow-auto rounded-md">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-200 text-left">
                            <tr>
                                {showOptions && (
                                    <th className="p-2"></th>
                                )}
                                <th className="p-2">Log Id</th>
                                <th className="p-2">Action</th>
                                <th className="p-2">Action Taken</th>
                                <th className="p-2">User</th>
                                <th className="p-2">Role</th>
                                <th className="p-2">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="text-left">
                            {logs.length > 0 ? (
                                logs.map((log) => {
                                    const iconName = iconsByActionType[log.action_type] || "question-circle";
                                    // const colorName = colorByUserType[log.role_id] || "gray";
                                    const colorName = "gray";

                                    return (
                                        <tr key={log.log_id} className="border-b hover:bg-gray-100">
                                            {showOptions && (
                                                <td className="p-2 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedLogs.includes(log.log_id)}
                                                        onChange={() => toggleSelection(log.log_id)}
                                                        className="h-5 w-5"
                                                    />
                                                </td>
                                            )}
                                            <td className="p-2">{log.log_id}</td>
                                            <td className="p-2 justify-start flex items-center gap-2">
                                                <p>{log.action_type}</p>
                                                <FontAwesomeIcon icon={["fas", iconName]} className={`text-${colorName}-600`} />
                                            </td>
                                            <td className="p-2">
                                                <p>{log.action_description}</p>
                                            </td>
                                            <td className="p-2">{log.user_name}</td>
                                            <td className={`p-2 text-${colorName}-600 font-bold`}>
                                                {roles.find(role => role.role_id === log.role_id)?.role_name || "Unknown"}
                                            </td>
                                            <td className="p-2 text-gray-500">{log.action_timestamp}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={showOptions ? 7 : 6} className="text-center text-gray-500 p-4">
                                        No logs found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

ActivityLogTable.propTypes;

export default ActivityLogTable;
