import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";

const ItemForm = ({ categories, initialData = null, onSubmit }) => {
    const [data, setData] = useState({
        name: "",
        total_quantity: 0,
        category: "",
        category_id: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data);
        console.log(data);
    };

    useEffect(() => {
        if (initialData) {
            setData({
                name: initialData.name || "",
                total_quantity: initialData.total_quantity || 0,
                category: initialData.category || "",
                category_id: initialData.category_id || 0,
            });
        } else {
            setData({ name: "", total_quantity: 0, category: "", category_id: 0 });
        }
    }, [initialData]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Item" : "Add New Item"}</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Item Name"
                    id="item-name"
                    type="text"
                    icon="tag"
                    value={data.name}
                    setValue={(value) => setData({ ...data, name: value })}
                    isRequired={true}
                />
                <InputField
                    label="Quantity"
                    id="item-quantity"
                    type="number"
                    icon="sort-numeric-up"
                    value={data.total_quantity}
                    setValue={(value) => setData({ ...data, total_quantity: parseInt(value, 10) || 0 })}
                    isRequired={true}
                />
                <label htmlFor="category" className="my-4">
                    <p className="mb-2">Category</p>
                    <SelectField
                        id="category"
                        icon="list"
                        options={[
                            { name: "Select Category", value: "" },
                            ...categories.map((category) => ({
                                name: category.name,
                                value: category.id,
                            })),
                        ]}
                        onChange={(e) => {
                            const selectedCategory = categories.find((cat) => cat.id === parseInt(e.target.value));
                            setData({
                                ...data,
                                category: selectedCategory?.name || "",
                                category_id: selectedCategory?.id || 0,
                            });
                        }}
                        isRequired={true}
                        value={data.category_id}
                    />
                </label>
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

ItemForm.propTypes = {
    categories: PropTypes.array.isRequired,
    initialData: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
};

export default ItemForm;
