import { library } from "@fortawesome/fontawesome-svg-core";
import { faS } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
library.add(faS);


export const SelectField = ({ icon, options }) => {
    return (
        <div className="flex items-center border rounded-lg p-2 gap-2">
            <FontAwesomeIcon icon={icon}/>
            <select className="w-full border-none focus:ring-0">
                {options.map((option, index) => (
                    <option key={index}>{option}</option>
                ))}
            </select>
        </div>
    );
};
export default SelectField;

SelectField.propTypes = {
    icon: PropTypes.any.isRequired,
    options: PropTypes.array.isRequired,
}