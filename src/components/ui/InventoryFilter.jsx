import { faFilter, faSort, faSortAmountDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Searchbar from "./Searchbar";
import SelectField from "./SelectField";

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
                <SelectField 
                    icon={faFilter} 
                    options={[
                        {
                            name: "Sort By",
                            value: "",
                        },
                        ...categories.map(category => ({
                            name: category.name,
                            value: category.name
                        }))
                        
                    ]} 
                    onChange={handleCategoryChange} 
                />
                <SelectField 
                    icon={faSort} 
                    // options={["Id", "Name", "Category", "Quantity", "Date Added", "Last Updated"]} 
                    options={[
                        {
                            name: "Sort by",
                            value: "id",
                        },
                        {
                            name: "Name",
                            value: "name",
                        },
                        {
                            name: "Category",
                            value: "category",
                        },
                        {
                            name: "Quantity",
                            value: "total_quantity",
                        },
                        {
                            name: "Date Added",
                            value: "created_at",
                        },
                        {
                            name: "Last Update",
                            value: "updated_at",
                        },
                    ]}
                    onChange={handleSortColumnChange} 
                />
                <SelectField 
                    icon={faSortAmountDown} 
                    options={[
                        {
                            name: "Ascending",
                            value: "asc",
                        },
                        {
                            name: "Descending",
                            value: "desc",
                        },
                    ]} 
                    onChange={handleSortOrderChange} 
                />
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
