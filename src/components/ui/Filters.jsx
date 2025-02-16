import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Filters = ({ categories }) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3 w-full">
                <input type="text" placeholder="Search items..." className="border border-gray-300 rounded-md p-2 w-full max-w-xs" />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <div className="flex space-x-2">
                <div className="border border-gray-300 rounded-md flex p-1 pr-2">
                    <select onChange={() => {}} className="p-2" required>
                        <option value="">Select a Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="border border-gray-300 rounded-md flex p-1 pr-2">
                    <select className="p-2">
                        <option>Sort By</option>
                    </select>
                </div>
                <div className="border border-gray-300 rounded-md flex p-1 pr-2">
                    <select className="p-2">
                        <option>Order By:</option>
                        <option>Ascending</option>
                        <option>Descending</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

Filters.propTypes;

export default Filters;
