import { faFilter, faSort, faSortAmountDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Searchbar from "../ui/Searchbar";
import SelectField from "../ui/SelectField";

export const InventoryFilter = ({ categories, onSearch, onCategoryChange, onSortByColumnChange, onSortOrderChange }) => {
    const sortByOptions = [
        {
            name: "Id",
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
    ];

    const orderOptions = [
        {
            name: "Ascending",
            value: "asc",
        },
        {
            name: "Descending",
            value: "desc",
        },
    ];

    const handleCategoryChange = (event) => {
        onCategoryChange(event.target.value);
    };

    const handleSortByColumnChange = (event) => {
        onSortByColumnChange(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        onSortOrderChange(event.target.value);
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <Searchbar placeholder={"Search Items..."} onSearch={onSearch} />
                <div className="flex justify-end gap-5 w-full">
                    <label htmlFor="category">
                        <h5>Filter by Category:</h5>
                        <SelectField
                            id="category"
                            icon={faFilter}
                            options={[
                                {
                                    name: "All",
                                    value: "",
                                },
                                ...categories.map((category) => ({
                                    name: category.name,
                                    value: category.name,
                                })),
                            ]}
                            onChange={handleCategoryChange}
                        />
                    </label>
                    <label htmlFor="column">
                        <h5>Sort By:</h5>
                        <SelectField id="column" icon={faSort} options={sortByOptions} onChange={handleSortByColumnChange} />
                    </label>
                    <label htmlFor="order">
                        <h5>Order By:</h5>
                        <SelectField id="order" icon={faSortAmountDown} options={orderOptions} onChange={handleSortOrderChange} />
                    </label>
                </div>
            </div>
        </>
    );
};

InventoryFilter.propTypes = {
    categories: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
    onSortByColumnChange: PropTypes.func.isRequired,
    onSortOrderChange: PropTypes.func.isRequired,
};

export default InventoryFilter;
