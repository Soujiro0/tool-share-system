import { library } from "@fortawesome/fontawesome-svg-core";
import { faS } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
library.add(faS);

export const InputField = ({ label, id, type, icon, setValue }) => {
    return (
        <div className="mb-4">
            <label className="block text-left text-gray-700 mb-2" htmlFor={id}>
                {label}
            </label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FontAwesomeIcon icon={icon}/>
                </span>
                <input
                    className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id={id}
                    placeholder={label}
                    type={type}
                    onChange={(e) => {setValue(e.target.value)}}
                />
            </div>
        </div>
    );
};
export default InputField;

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.any,
    type: PropTypes.string.isRequired,
    icon: PropTypes.any,
    setValue: PropTypes.any,
}
