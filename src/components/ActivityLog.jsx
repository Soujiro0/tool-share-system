import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
library.add(fas);

export const ActivityLog = ({ logs }) => {
    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Activity Log</h2>
            <div className="space-y-4">
                {
                logs.map((log, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <button className={`text-${log.color}-600`}>
                            <FontAwesomeIcon icon={log.icon}/>
                        </button>
                        <div>
                            <p>{log.message}</p>
                            <p className="text-gray-500 text-sm">{log.timestamp}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ActivityLog;

ActivityLog.propTypes = {
    logs: PropTypes.array.isRequired,
};
