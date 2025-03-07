import { library } from "@fortawesome/fontawesome-svg-core";
import { faS } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Searchbar } from "../ui/Searchbar"; // Import the Searchbar component
library.add(faS);

const ItemSelectionForm = ({ items, onClose, onSubmit }) => {
    const [selectedItems, setSelectedItems] = useState({});
    const [search, setSearch] = useState("");

    const handleToggleItem = (itemCode) => {
        setSelectedItems((prev) => ({
            ...prev,
            [itemCode]: prev[itemCode] ? prev[itemCode] + 1 : 1,
        }));
    };

    const handleQuantityChange = (itemCode, delta) => {
        setSelectedItems((prev) => {
            const newQuantity = (prev[itemCode] || 0) + delta;
            if (newQuantity < 1) {
                // eslint-disable-next-line no-unused-vars
                const { [itemCode]: _, ...rest } = prev; // Rename 'prev' to '_'
                return rest;
            }
            return { ...prev, [itemCode]: newQuantity };
        });
    };
    

    const handleClear = () => setSelectedItems({});

    const filteredItems = items.filter((item) => item.item_name.toLowerCase().includes(search.toLowerCase()));

    return (
        <Modal isOpen={true} onClose={onClose}>
            <div className="bg-white rounded-lg">
                <div className="flex justify-between items-center border-b">
                    <h2 className="text-lg font-semibold">Select Items</h2>
                    <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                        <FontAwesomeIcon icon={"close"} />
                    </button>
                </div>
                <div className="py-2">
                    <div className="relative mb-4 p-2 shadow-md">
                        <Searchbar
                            placeholder="Search items..."
                            onSearch={setSearch}
                        />
                    </div>
                    <div className="space-y-4 max-h-64 overflow-y-auto p-2">
                        {filteredItems.map((item) => (
                            <div key={item.item_id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                    checked={!!selectedItems[item.item_id]}
                                    onChange={() => handleToggleItem(item.item_id)}
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.item_name}</h3>
                                    <p className="text-sm text-gray-600">Item ID: {item.item_id}</p>
                                    <p className="text-sm text-gray-600">Item Name: {item.item_name}</p>
                                    <p className="text-sm text-gray-600">Available Quantity: {item.total_quantity} units</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded"
                                        onClick={() => handleQuantityChange(item.item_id, -1)}
                                        disabled={!selectedItems[item.item_id]}
                                    >
                                        -
                                    </button>
                                    <span>{selectedItems[item.item_id] || 0}</span>
                                    <button
                                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded"
                                        onClick={() => handleQuantityChange(item.item_id, 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between items-center p-4 border-t">
                    <span className="text-sm text-gray-600">Selected items: {Object.keys(selectedItems).length}</span>
                    <button className="text-sm text-blue-500 hover:underline" onClick={handleClear}>
                        Clear all
                    </button>
                </div>
                <div className="">
                    <button className="w-full py-2 bg-blue-500 text-white rounded-lg" onClick={() => onSubmit(selectedItems)}>
                        Add to Borrowers Slip
                    </button>
                </div>
            </div>
        </Modal>
    );
};

ItemSelectionForm.propTypes = {
    items: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default ItemSelectionForm;
