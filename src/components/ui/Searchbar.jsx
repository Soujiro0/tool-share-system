import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';

export const Searchbar = ({ onSearch }) => {
    const handleSearchChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <>
            <div className="flex items-center gap-3 w-full">
                <input type="text" placeholder="Search items..." className="border border-gray-300 rounded-md p-2 w-full max-w-xs" onChange={handleSearchChange} />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
        </>
    );
};

Searchbar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default Searchbar;