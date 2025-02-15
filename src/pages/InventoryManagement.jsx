import { useContext, useEffect, useState } from "react";
import { ApiService } from "../api/ApiService";
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
    const user = auth.user;

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const [items, setItems] = useState([]);
    const [itemsPage, setItemsPage] = useState(1);
    const [itemsLimit] = useState(10);
    const [itemsTotalPages, setItemsTotalPages] = useState(1);

    const [activityLogs, setActivityLogs] = useState([]);
    const [activityPage, setActivityPage] = useState(1);
    const [activityLimit] = useState(5);
    const [activityTotalPage, setActivityTotalPage] = useState(1);

    const [categories, setCategories] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    const fetchItems = async () => {
        try {
            const data = await ApiService.ItemService.getItems(token, itemsLimit, itemsPage);
            setItemsTotalPages(Math.ceil(data.totalItems / itemsLimit));
            setItems(data.items);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const fetchActivityLogs = async () => {
        try {
            const data = await ApiService.ActivityLogService.getActivityLogs(token, activityLimit, activityPage);
            setActivityTotalPage(Math.ceil(data.totalLogs / activityLimit));
            setActivityLogs(data.logs);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await ApiService.CategoryService.getCategories(token);
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleCreateActLog = async (user, actionType, action) => {
        const logData = {
            user_type: user.role,
            user_id: user.user_id,
            action_type: actionType,
            action: action,
        };
        await ApiService.ActivityLogService.createActivityLog(token, logData);
    };

    const handleAddItem = () => {
        setEditingItem();
        setModalContent(<ItemForm categories={categories} onSubmit={handleAddOrUpdateItem} />);
        setModalOpen(true);
    };

    const handleUpdateItem = (item) => {
        setEditingItem(item);
    };

    const handleAddOrUpdateItem = async (item) => {
        try {
            if (editingItem && editingItem.id) {
                console.log("Updating existing item:", item);
                await ApiService.ItemService.updateItem(token, editingItem.id, item);
                handleCreateActLog(user, "Update", `Updated Item: ${item.name}`);
            } else {
                console.log("Adding new item:", item);
                await ApiService.ItemService.createItem(token, item);
                handleCreateActLog(user, "Create", `Added new Item: ${item.name} to Inventory`);
            }
        } catch (error) {
            console.error("Error saving item:", error);
        } finally {
            setEditingItem(null);
            setModalOpen(false);
            fetchItems();
            fetchActivityLogs();
        }
    };

    const handleDeleteItem = async (item) => {
        try {
            await ApiService.ItemService.deleteItem(token, item.id);
            handleCreateActLog(user, "Delete", `Deleted Item: ${item.name}`);
        } catch (error) {
            console.error("Error deleting item:", error);
        } finally {
            fetchActivityLogs();
            fetchItems();
        }
    };

    useEffect(() => {
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, itemsPage, itemsLimit]);

    useEffect(() => {
        fetchActivityLogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, activityPage, activityLimit]);

    useEffect(() => {
        fetchCategories();
        console.log(editingItem);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        if (editingItem) {
            setModalContent(<ItemForm categories={categories} initialData={editingItem} onSubmit={handleAddOrUpdateItem} />);
            setModalOpen(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingItem]);

    return (
        <>
            <div className="w-full mx-auto">
                <Header onAdd={handleAddItem} />
                <div className="pt-2">
                    <div className="bg-white p-5 rounded-md shadow-md mb-6">
                        <Filters categories={categories} />
                        <InventoryTable items={items} onEdit={handleUpdateItem} onDelete={handleDeleteItem} />
                        <Pagination currentPage={itemsPage} totalPages={itemsTotalPages} onPageChange={setItemsPage} />
                    </div>
                    <div className="bg-white p-5 rounded-md shadow-md">
                        <ActivityLog logs={activityLogs} />
                        <Pagination currentPage={activityPage} totalPages={activityTotalPage} onPageChange={setActivityPage} />
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