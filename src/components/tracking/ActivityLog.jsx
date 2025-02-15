import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fas);

export const ActivityLog = ({ logs }) => {
    // Map action_type to a Font Awesome icon name
    const iconsByActionType = {
        Create: "plus",
        Approve: "check",
        Update: "edit",
        Process: "sync-alt",
        Delete: "trash-alt",
    };

    const colorByUserType = {
        super_admin: "blue",
        admin: "green",
    };

    return (
        <div className="p-2">
            <h2 className="text-lg font-bold mb-4">Activity Log</h2>
            <div className="space-y-4">
                {logs.map((log) => {

                    const iconName = iconsByActionType[log.action_type] || "question-circle";
                    const colorName = colorByUserType[log.user_type] || "gray";

                    return (
                        <div key={log.id} className="flex items-center gap-5">
                            <button className={`text-${colorName}-600`}>
                                <FontAwesomeIcon icon={["fas", iconName]} />
                            </button>
                            <div>
                                <p className="font-semibold">{log.user_type}</p>
                                <p>{log.action}</p>
                                <p className="text-gray-500 text-sm">{log.action_timestamp}</p>
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
