import { useState } from "react";
import ActivityLog from "../components/ActivityLog";
import Filters from "../components/Filters";
import Header from "../components/Header";
import InventoryTable from "../components/InvententoryTable";
import Modal from "../components/Modal";

export const InventoryManagement = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleAdd = () => {
        setModalContent(
            <div>
                <h2 className="text-xl font-bold mb-4">Add New Item</h2>
                <input type="text" placeholder="Item Name" className="border border-gray-300 rounded-md p-2 w-full mb-2" />
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
                <button className="bg-green-600 text-white px-4 py-2 rounded-md w-full">Save Changes</button>
            </div>
        );
        setModalOpen(true);
    };

    const inventoryItems = [
        { name: "Hand Drill", category: "Equipment", quantity: 2, status: "Need Maintenance", statusColor: "yellow", lastUpdated: "Jan 15, 2025" },
        { name: "Screw Driver", category: "Tools", quantity: 3, status: "Good", statusColor: "green", lastUpdated: "Jan 14, 2025" },
    ];

    const activityLogs = [
        { message: "Added new item: Laptop Dell XPS 13", timestamp: "Jan 15, 2025 - 10:30 AM", icon: "plus", color: "blue" },
        { message: "Updated quantity: Office Chair (5 → 3)", timestamp: "Jan 14, 2025 - 2:15 PM", icon: "pen", color: "yellow" },
        { message: "Deleted item: Desk Lamp", timestamp: "Jan 14, 2025 - 11:45 AM", icon: "trash", color: "red" },
    ];

    return (
        <div className="min-w-full mx-auto">
            <Header onAdd={handleAdd}/>
            <div className="bg-white p-4 rounded-md shadow-md mb-6">
                <Filters />
                <InventoryTable items={inventoryItems} onEdit={handleEdit} />
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
                <ActivityLog logs={activityLogs} />
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>{modalContent}</Modal>
        </div>
    );
};

export default InventoryManagement;
