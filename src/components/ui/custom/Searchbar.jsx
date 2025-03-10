import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';

const Searchbar = ({ placeholder, onSearch }) => {

    const handleSearchChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <>
            <div className="flex items-center gap-3 w-full">
                <input type="text" placeholder={placeholder} className="border border-gray-300 rounded-md p-2 w-full" onChange={handleSearchChange} />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
        </>
    );
};

Searchbar.propTypes = {
    placeholder: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
};

export default Searchbar;