import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
library.add(fas); 

export const InventoryTable = ({ items, onEdit }) => {
    return (
        <table className="w-full text-left">
            <thead>
                <tr className="border-b">
                    <th className="py-2">Item Name</th>
                    <th className="py-2">Category</th>
                    <th className="py-2">Quantity</th>
                    <th className="py-2">Added At</th>
                    <th className="py-2">Last Updated</th>
                    <th className="py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                
                {items.map((item, index) => (
                    <tr key={index} className="border-b">
                        <td className="py-2">{item.name}</td>
                        <td className="py-2">{item.category}</td>
                        <td className="py-2">{item.total_quantity}</td>
                        <td className="py-2">{item.created_at}</td>
                        <td className="py-2">{item.updated_at}</td>
                        <td className="py-2">
                            <button onClick={onEdit} className="text-blue-600 mr-2">
                                <FontAwesomeIcon icon="pen-to-square" />
                            </button>
                            <button className="text-red-600">
                                <FontAwesomeIcon icon="trash" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default InventoryTable;

InventoryTable.propTypes = {
    items: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
}