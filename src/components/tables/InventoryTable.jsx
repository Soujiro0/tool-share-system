import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fas);

export const InventoryTable = ({ items, categories, onEditItem, onDeleteItem }) => {
    return (
        <div className="w-full rounded-md overflow-hidden">
            <div className="max-h-dvh overflow-auto">
                <table className="w-full text-left">
                    <thead className="sticky top-0">
                        <tr className="border-b">
                            <th className="py-2 px-4">Item ID</th>
                            <th className="py-2 px-4">Item Name</th>
                            <th className="py-2 px-4">Item Brand</th>
                            <th className="py-2 px-4">Model</th>
                            <th className="py-2 px-4">Is Bulk</th>
                            <th className="py-2 px-4">Quantity</th>
                            <th className="py-2 px-4">Category</th>
                            <th className="py-2 px-4">Date Added</th>
                            <th className="py-2 px-4">Last Updated</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {items && items.length > 0 ? (
                            items.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4">{item.item_id}</td>
                                    <td className="py-2 px-4">{item.item_name}</td>
                                    <td className="py-2 px-4">{item.item_brand}</td>
                                    <td className="py-2 px-4">{item.model}</td>
                                    <td className="py-2 px-4">{item.is_bulk ? "Yes" : "No"}</td>
                                    <td className="py-2 px-4">{item.total_quantity}</td>
                                    <td className="py-2 px-4">{categories.find(cat => cat.category_id === item.category_id)?.category_name || "Unknown"}</td>
                                    <td className="py-2 px-4">{item.date_created}</td>
                                    <td className="py-2 px-4">{item.last_updated}</td>
                                    <td className="py-2 px-4">
                                        <button onClick={() => onEditItem(item)} className="text-blue-600 mr-2">
                                            <FontAwesomeIcon icon="pen-to-square" />
                                        </button>
                                        <button onClick={() => onDeleteItem(item)} className="text-red-600">
                                            <FontAwesomeIcon icon="trash" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-2 px-4 text-center">
                                    No items Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

InventoryTable.propTypes;

export default InventoryTable;
