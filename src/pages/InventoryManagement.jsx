import { useContext, useEffect, useState } from "react";
import { getItems } from "../api/ApiService";
import Header from "../components/layout/Header";
import InventoryTable from "../components/tables/InvententoryTable";
import ActivityLog from "../components/tracking/ActivityLog";
import Filters from "../components/ui/Filters";
import Modal from "../components/ui/Modal";
import Pagination from "../components/ui/Pagination";
import { AuthContext } from "../context/AuthContext";

export const InventoryManagement = () => {
    const { auth } = useContext(AuthContext);
    const token = auth.token;

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const [items, setItems] = useState([]);
    const activityLogs = [
        { message: "Added new item: Laptop Dell XPS 13", timestamp: "Jan 15, 2025 - 10:30 AM", icon: "plus", color: "blue" },
        { message: "Updated quantity: Office Chair (5 → 3)", timestamp: "Jan 14, 2025 - 2:15 PM", icon: "pen", color: "yellow" },
        { message: "Deleted item: Desk Lamp", timestamp: "Jan 14, 2025 - 11:45 AM", icon: "trash", color: "red" },
    ];

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getItems(token, limit, page);
                const totalItems = data.totalItems;
                setTotalPages(Math.ceil(totalItems / limit));
                setItems(data.items);
            } catch (error) {
                console.error("Error fetching items:", error);
            } 
        };
        fetchItems();
    }, [page, limit, token]);

    const handleAdd = () => {
        setModalContent(
            <div>
                <h2 className="text-xl font-bold mb-4">Add New Item</h2>
                <input type="text" placeholder="Item Name" className="border border-gray-300 rounded-md p-2 w-full mb-2" />
                <input type="text" placeholder="Category" className="border border-gray-300 rounded-md p-2 w-full mb-2" />
                <input type="number" placeholder="Quantity" className="border border-gray-300 rounded-md p-2 w-full mb-2" />
                <select className="border border-gray-300 rounded-md p-2 w-full mb-2">
                    <option>Status</option>
                    <option>Good</option>
                    <option>Need Maintenance</option>
                </select>
                <input type="date" className="border border-gray-300 rounded-md p-2 w-full mb-2" />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">Add Item</button>
            </div>
        );
        setModalOpen(true);
    };

    const handleEdit = (item) => {
        setModalContent(
            <div>
                <h2 className="text-xl font-bold mb-4">Edit Item</h2>
                <input type="text" defaultValue={item.name} className="border border-gray-300 rounded-md p-2 w-full mb-2" />
                <input type="text" defaultValue={item.category} className="border border-gray-300 rounded-md p-2 w-full mb-2" />
                <input type="number" defaultValue={item.quantity} className="border border-gray-300 rounded-md p-2 w-full mb-2" />
                <select className="border border-gray-300 rounded-md p-2 w-full mb-2" defaultValue={item.status}>
                    <option>Good</option>
                    <option>Need Maintenance</option>
                </select>
                <input type="date" defaultValue={item.lastUpdated} className="border border-gray-300 rounded-md p-2 w-full mb-2" />
                <button className="bg-green-600 text-white px-4 py-2 rounded-md w-full">Save Changes</button>
            </div>
        );
        setModalOpen(true);
    };

    return (
        <>
            <div className="w-full mx-auto">
                <Header onAdd={handleAdd} />
                <div className="p-5">
                    <div className="bg-white p-4 rounded-md shadow-md mb-6">
                        <Filters />
                        <InventoryTable items={items} onEdit={handleEdit} />
                        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <ActivityLog logs={activityLogs} />
                    </div>
                    <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                        {modalContent}
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default InventoryManagement;
