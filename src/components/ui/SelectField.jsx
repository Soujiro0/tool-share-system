import { library } from "@fortawesome/fontawesome-svg-core";
import { faS } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
library.add(faS);

export const SelectField = ({ icon, options, onChange }) => {
    return (
        <div className="flex items-center border rounded-lg p-2 gap-2">
            <FontAwesomeIcon icon={icon} />
            <select
                className="w-fit border-none focus:ring-0"
                onChange={onChange}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};


SelectField.propTypes = {
    icon: PropTypes.any.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default SelectField;