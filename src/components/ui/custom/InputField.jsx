import { library } from "@fortawesome/fontawesome-svg-core";
import { faS } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faS);

const InputField = ({ label, id, type, icon, value, setValue, isRequired }) => {
    return (
        <>
            <div className="mb-4">
                <label className="block text-left text-gray-700 mb-2" htmlFor={id}>
                    {label}
                </label>
                <div className="flex items-center border rounded-lg py-2 px-3 gap-3">
                    <FontAwesomeIcon icon={icon} />
                    <input
                        className="w-full focus:outline-0"
                        id={id}
                        placeholder={label}
                        type={type}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        value={value}
                        required={isRequired}
                    />
                </div>
            </div>
        </>
    );
};

InputField.propTypes;

export default InputField;
