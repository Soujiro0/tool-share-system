import { useContext, useEffect, useState } from "react";
import { createItem, deleteItem, getCategories, getItems, updateItem } from "../api/ApiService";
import ItemForm from "../components/forms/ItemForm";
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
    const [categories, setCategories] = useState([]);
    const [editingItem, setEditingItem] = useState({});

    const activityLogs = [
        { message: "Added new item: Laptop Dell XPS 13", timestamp: "Jan 15, 2025 - 10:30 AM", icon: "plus", color: "blue" },
        { message: "Updated quantity: Office Chair (5 → 3)", timestamp: "Jan 14, 2025 - 2:15 PM", icon: "pen", color: "yellow" },
        { message: "Deleted item: Desk Lamp", timestamp: "Jan 14, 2025 - 11:45 AM", icon: "trash", color: "red" },
    ];

    const fetchItems = async () => {
        try {
            const data = await getItems(token, limit, page);
            setTotalPages(Math.ceil(data.totalItems / limit));
            setItems(data.items);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await getCategories(token);
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, page, limit]);

    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleAddItem = () => {
        setEditingItem(null); // Reset editing
        setModalContent(<ItemForm categories={categories} onSubmit={handleAddOrUpdateItem} />);
        setModalOpen(true);
    };

    const handleUpdateItem = (item) => {
        setEditingItem({ ...item });
        setModalContent(<ItemForm categories={categories} initialData={item} onSubmit={handleAddOrUpdateItem} />);
        setModalOpen(true);
    };
    
    const handleDeleteItem = async (item) => {
        try {
            await deleteItem(token, item.id);
            fetchItems();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    }

    // ✅ Handles adding and updating an item
    const handleAddOrUpdateItem = async (item) => {
        try {
            console.log(editingItem);
            if (editingItem) {
                await updateItem(token, item.id, item);
                fetchItems();
            } else {
                await createItem(token, item);
                fetchItems();
            }
        } catch (error) {
            console.error("Error saving item:", error);
        } finally {
            setEditingItem(null);
            setModalOpen(false);
        }
    };

    return (
        <>
            <div className="w-full mx-auto">
                <Header onAdd={handleAddItem} />
                <div className="p-5">
                    <div className="bg-white p-4 rounded-md shadow-md mb-6">
                        <Filters categories={categories} />
                        <InventoryTable items={items} onEdit={handleUpdateItem} onDelete={handleDeleteItem} />
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
