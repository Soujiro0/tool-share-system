import { useEffect, useState } from "react";

const ItemForm = ({ categories, initialData = null, onSubmit }) => {
    const [data, setData] = useState({ name: "", total_quantity: 0, category: "" });

    useEffect(() => {
        if (initialData) setData(initialData);
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data);
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Item" : "Add New Item"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className="border border-gray-300 rounded-md p-2 w-full mb-2"
                    required
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={data.total_quantity}
                    onChange={(e) => setData({ ...data, total_quantity: parseInt(e.target.value, 10) || 0 })}
                    className="border border-gray-300 rounded-md p-2 w-full mb-2"
                    required
                />
                <select
                    value={data.category}
                    onChange={(e) => setData({ ...data, category: e.target.value })}
                    className="border border-gray-300 rounded-md p-2 w-full mb-2"
                    required
                >
                    <option value="" disabled>
                        Select a Category
                    </option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="text-white px-4 py-2 rounded-md w-full mt-5"
                    style={{ backgroundColor: initialData ? "green" : "blue" }}
                >
                    {initialData ? "Update Item" : "Add Item"}
                </button>
            </form>
        </div>
    );
};

ItemForm.propTypes;

export default ItemForm;
