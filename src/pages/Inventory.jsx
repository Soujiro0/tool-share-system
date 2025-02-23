import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import ApiService from "../api/ApiService";
import DeleteItemAlert from "../components/alerts/DeleteItemAlert";
import InventoryFilter from "../components/filters/InventoryFilter";
import ItemForm from "../components/forms/ItemForm";
import Header from "../components/layout/Header";
import ActivityLogTable from "../components/tables/ActivityLogTable";
import InventoryTable from "../components/tables/InventoryTable";
import Modal from "../components/ui/Modal";
import Pagination from "../components/ui/Pagination";
import { AuthContext } from "../context/AuthContext";

library.add(faPlus);

export const Inventory = () => {
    const { auth } = useContext(AuthContext);
    const { token, user } = auth;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsTotalPages, setItemsTotalPages] = useState(1);

    const [categories, setCategories] = useState([]);

    const [logs, setLogs] = useState([]);

    const [filters, setFilters] = useState({
        category: "",
        searchQuery: "",
        sortColumn: "",
        sortOrder: "",
    });

    const logAction = async (action, item) => {
        try {
            await ApiService.ActivityLogService.createActivityLog(token, {
                user_id: user.user_id,
                user_name: user.name,
                role: user.role,
                action_type: action,
                action: `${action} item: ${item.name}`,
                action_timestamp: new Date().toISOString(),
            });
        } catch (error) {
            console.error("Error logging action:", error);
        }
    };

    const handleAddItem = () => {
        setModalContent(<ItemForm categories={categories} initialData={null} onSubmit={handleSubmitItem} />);
        setIsModalOpen(true);
    };

    const handleUpdateItem = (item) => {
        setSelectedItem(item);
    };

    const handleDeleteItem = (item) => {
        setModalContent(<DeleteItemAlert item={item} onConfirm={() => handleConfirmDelete(item)} />);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async (item) => {
        try {
            await ApiService.ItemService.deleteItem(token, item.id);
            await logAction("Delete", { id: item.id, name: item.name });
        } catch (error) {
            console.error("Error deleting item:", error);
        } finally {
            setIsModalOpen(false);
            refreshTables();
        }
    };

    const handleSubmitItem = async (item) => {
        try {
            if (selectedItem && selectedItem.id) {
                await ApiService.ItemService.updateItem(token, selectedItem.id, item);
                await logAction("Update", item);
            } else {
                await ApiService.ItemService.createItem(token, item);
                await logAction("Create", item);
            }
        } catch (error) {
            console.error("Error saving item:", error);
        } finally {
            setSelectedItem(null);
            setIsModalOpen(false);
            refreshTables();
        }
    };

    const handleSearch = (searchQuery) => {
        resetPage();
        setFilters((prevFilters) => ({ ...prevFilters, searchQuery }));
    };

    const handleCategoryChange = (category) => {
        resetPage();
        setFilters((prevFilters) => ({ ...prevFilters, category }));
    };

    const handleSortByColumnChange = (sortColumn) => {
        resetPage();
        setFilters((prevFilters) => ({ ...prevFilters, sortColumn }));
    };

    const handleSortOrderChange = (sortOrder) => {
        resetPage();
        setFilters((prevFilters) => ({ ...prevFilters, sortOrder }));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const resetPage = () => {
        setCurrentPage(1);
    };

    const refreshTables = () => {
        fetchItems();
        fetchLogs();
    }

    const fetchItems = async () => {
        try {
            const data = await ApiService.ItemService.getItems(
                token,
                10,
                currentPage,
                filters.category,
                filters.searchQuery,
                filters.sortColumn,
                filters.sortOrder
            );
            setItemsTotalPages(Math.ceil(data.totalItems / 10));
            setItems(data.items);
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

    const fetchLogs = async () => {
        try {
            const data = await ApiService.ActivityLogService.getActivityLogs(token, 5, 1, "");
            setLogs(data.logs);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, currentPage, filters]);

    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        fetchLogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        if (selectedItem) {
            setModalContent(<ItemForm categories={categories} initialData={selectedItem} onSubmit={handleSubmitItem} />);
            setIsModalOpen(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItem]);

    return (
        <>
            <Header headerTitle="Inventory" />
            <div className="mt-5">
                <InventoryFilter
                    categories={categories}
                    onSearch={handleSearch}
                    onCategoryChange={handleCategoryChange}
                    onSortByColumnChange={handleSortByColumnChange}
                    onSortOrderChange={handleSortOrderChange}
                />
            </div>
            <div className="my-2">
                <button onClick={handleAddItem} className="flex items-center gap-2 bg-blue-600 px-5 py-2.5 rounded-2xl text-white font-bold">
                    <FontAwesomeIcon icon="plus" />
                    <h1>Add Item</h1>
                </button>
            </div>
            <div className="bg-gray-200 mt-5 p-2 rounded-2xl">
                <InventoryTable items={items} onEditItem={handleUpdateItem} onDeleteItem={handleDeleteItem} />
                <br />
                <Pagination currentPage={currentPage} totalPages={itemsTotalPages} onPageChange={handlePageChange} />
            </div>
            <div className="mt-5">
                <h1 className="text-2xl font-bold mb-2">Recent Activity</h1>
                <ActivityLogTable logs={logs} showOptions={false} />
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedItem(null);
                }}
            >
                {modalContent}
            </Modal>
        </>
    );
};

export default Inventory;