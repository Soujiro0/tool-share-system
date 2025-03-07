import { faBook, faChalkboardTeacher, faClipboard, faPlus, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import ApiService from "../../api/ApiService";
import ItemSelectionForm from "../../components/forms/ItemSelectionForm";
import Header from "../../components/layout/Header";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import { AuthContext } from "../../context/AuthContext";

export const BorrowItem = () => {

    const { auth } = useContext(AuthContext);
    const { token } = auth;

    const [formData, setFormData] = useState({
        name: "",
        course: "",
        purpose: "",
        searchItem: "",
        instructor: "",
        selectedItems: {},
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = "your-authentication-token"; // Replace with actual token
                const data = await ApiService.ItemService.getItems(token, 10, 1);
                setItems(data.items);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitItems = (selectedItems) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            selectedItems: {
                ...prevFormData.selectedItems,
                ...selectedItems,
            },
        }));
        handleCloseModal();
    };

    const handleDeleteItem = (itemId) => {
        // eslint-disable-next-line no-unused-vars
        const { [itemId]: _, ...rest } = formData.selectedItems;
        setFormData({ ...formData, selectedItems: rest });
    };

    const handleResetItems = () => {
        setFormData({ ...formData, selectedItems: {} });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const { name, course, purpose, instructor, selectedItems } = formData;
    
        // Validate required fields
        if (!name || !course || !purpose || !instructor) {
            alert("Please fill in all required fields.");
            return;
        }
    
        // Ensure at least one item is selected
        const borrowedItems = Object.entries(selectedItems).map(([itemId, quantity]) => [
            parseInt(itemId),  // Item ID as number
            quantity           // Quantity as number
        ]);
    
        if (borrowedItems.length === 0) {
            alert("Please select at least one item.");
            return;
        }
    
        // Construct the final JSON object
        const requestData = {
            borrower_name: name,
            faculty_user_id: instructor,
            items_borrowed: JSON.stringify(borrowedItems), // Stringified array of arrays
            purpose: purpose,
        };
    
        console.log(JSON.stringify(requestData, null, 2));
    
        // Call the API to create the request
        ApiService.BorrowRequestService.createBorrowRequest(token, requestData);
        alert("Borrow request submitted successfully!");
    };
    

    const instructorOptions = [
        { value: "", name: "Choose an instructor" },
        { value: 4, name: "YES" },
        // Add more instructor options here
    ];

    return (
        <>
            <div>
                <Header headerTitle={"Borrow Item"} />
                <div className="flex items-center justify-center min-h-auto py-2">
                    <div className="bg-gray-150 shadow-md rounded-lg h-auto w-screen p-5">
                        <h1 className="text-xl font-semibold mb-2">Borrowers Slip</h1>
                        <p className="text-gray-600 mb-4">Please fill in all required fields</p>

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Personal Details</h2>
                            <InputField
                                label="Name"
                                id="name"
                                type="text"
                                icon={faUser}
                                value={formData.name}
                                setValue={(value) => setFormData({ ...formData, name: value })}
                                isRequired={true}
                            />

                            <InputField
                                label="Course, Year & Section"
                                id="course"
                                type="text"
                                icon={faBook}
                                value={formData.course}
                                setValue={(value) => setFormData({ ...formData, course: value })}
                                isRequired={true}
                            />

                            <InputField
                                label="Purpose of borrowing"
                                id="purpose"
                                type="text"
                                icon={faClipboard}
                                value={formData.purpose}
                                setValue={(value) => setFormData({ ...formData, purpose: value })}
                                isRequired={true}
                            />
                        </div>

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Tools & Equipment</h2>
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr className="text-left">
                                        <th className="py-2">Item Name</th>
                                        <th className="py-2">Quantity</th>
                                        <th className="py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(formData.selectedItems).length > 0 ? (
                                        Object.keys(formData.selectedItems).map((itemId) => {
                                            const item = items.find((i) => i.item_id === parseInt(itemId));
                                            return (
                                                <tr key={itemId}>
                                                    <td className="py-2">{item.item_name}</td>
                                                    <td className="py-2">{formData.selectedItems[itemId]}</td>
                                                    <td className="py-2">
                                                        <button onClick={() => handleDeleteItem(itemId)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="py-2 text-center text-gray-500">
                                                No items selected
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="flex gap-5 items-center my-10">
                                <button className="text-blue-500 text-sm flex gap-2 items-center" onClick={handleOpenModal}>
                                    <p>Add Item</p>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <button className="text-red-500 text-sm flex gap-2 items-center" onClick={handleResetItems}>
                                    <p>Reset Items</p>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Instructor Approval</h2>
                            <SelectField
                                name="instructor"
                                icon={faChalkboardTeacher}
                                options={instructorOptions}
                                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                                isRequired={true}
                                value={formData.instructor}
                            />
                        </div>

                        <div className="">
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <ItemSelectionForm items={items} onClose={handleCloseModal} onSubmit={handleSubmitItems} />}
        </>
    );
};

export default BorrowItem;
