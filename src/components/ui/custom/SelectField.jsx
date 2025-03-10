import { library } from "@fortawesome/fontawesome-svg-core";
import { faS } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
library.add(faS);

const SelectField = ({ icon, options, onChange, isRequired, value }) => {
    return (
        <>
            <div className="flex items-center border rounded-lg p-2 gap-2">
                <FontAwesomeIcon icon={icon} />
                <select className="w-full border-none focus:outline-0" onChange={onChange} required={isRequired} value={value}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

SelectField.propTypes = {
    icon: PropTypes.any.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    isRequired: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
};

export default SelectField;
