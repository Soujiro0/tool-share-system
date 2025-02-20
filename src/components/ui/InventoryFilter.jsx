import PropTypes from "prop-types";
import Searchbar from "./Searchbar";

export const Filters = ({ categories, onCategoryChange, onSearch, onSortColumnChange, onSortOrderChange }) => {
    const handleCategoryChange = (event) => {
        onCategoryChange(event.target.value);
    };

    const handleSortColumnChange = (event) => {
        onSortColumnChange(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        onSortOrderChange(event.target.value);
    };

    return (
        <div className="flex justify-between items-center mb-4">
            <Searchbar onSearch={onSearch} />
            <div className="flex space-x-2">
                <div className="border border-gray-300 rounded-md flex p-1 pr-2">
                    <select onChange={handleCategoryChange} className="p-2" required>
                        <option value="">Select a Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="border border-gray-300 rounded-md flex p-1 pr-2">
                    <select onChange={handleSortColumnChange} className="p-2">
                        <option value="id ">Sort By</option>
                        <option value="name">Name</option>
                        <option value="category">Category</option>
                        <option value="total_quantity">Quantity</option>
                        <option value="created_at">Date Added</option>
                        <option value="updated_at">Last Updated</option>
                    </select>
                </div>
                <div className="border border-gray-300 rounded-md flex p-1 pr-2">
                    <select onChange={handleSortOrderChange} className="p-2">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

Filters.propTypes = {
    categories: PropTypes.array.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onSortColumnChange: PropTypes.func.isRequired,
    onSortOrderChange: PropTypes.func.isRequired,
};

export default Filters;
