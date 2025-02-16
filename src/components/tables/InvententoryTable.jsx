import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fas);

export const InventoryTable = ({ items, onEdit, onDelete }) => {
    return (
        <div className="w-full rounded-md overflow-hidden">
            <div className="max-h-dvh overflow-auto">
                <table className="w-full text-left">
                    <thead className="sticky top-0 bg-white">
                        <tr className="border-b">
                            <th className="py-2 px-4">Item Name</th>
                            <th className="py-2 px-4">Category</th>
                            <th className="py-2 px-4">Quantity</th>
                            <th className="py-2 px-4">Date Added</th>
                            <th className="py-2 px-4">Last Updated</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4">{item.name}</td>
                                <td className="py-2 px-4">{item.category}</td>
                                <td className="py-2 px-4">{item.total_quantity}</td>
                                <td className="py-2 px-4">{item.created_at}</td>
                                <td className="py-2 px-4">{item.updated_at}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => {
                                            onEdit(item);
                                            console.log("item: ", item);
                                        }}
                                        className="text-blue-600 mr-2"
                                    >
                                        <FontAwesomeIcon icon="pen-to-square" />
                                    </button>
                                    <button onClick={() => onDelete(item)} className="text-red-600">
                                        <FontAwesomeIcon icon="trash" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

InventoryTable.propTypes;

export default InventoryTable;
