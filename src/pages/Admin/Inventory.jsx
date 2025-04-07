import AddItemDialog from "@/components/dialogs/AddItemDialog";
import DeleteConfirmationDialog from "@/components/dialogs/DeleteConfirmationDialog";
import DeleteUnitDialog from "@/components/dialogs/DeleteUnitDialog";
import EditItemDialog from "@/components/dialogs/EditItemDialog";
import ItemDetailDialog from "@/components/dialogs/ItemDetailDialog";
import UpdateUnitDialog from "@/components/dialogs/UpdateUnitDialog";
import DataTable from "@/components/tables/DataTable";
import columns from "@/components/tables/InventoryColumn";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ApiService from "../../api/ApiService";
import Header from "../../components/layout/Header";

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
    const [editItemDialogOpen, setEditItemDialogOpen] = useState(false);
    const [deleteItemDialogOpen, setDeleteItemDialogOpen] = useState(false);
    const [updateUnitDialogOpen, setUpdateUnitDialogOpen] = useState(false);
    const [deleteUnitDialogOpen, setDeleteUnitDialogOpen] = useState(false);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);

    const handleViewDetails = (item) => {
        if (item) {
            setSelectedItem(item);
            setDetailDialogOpen(true);
        }
    };

    const handleCloseDetail = () => {
        setDetailDialogOpen(false);
        setSelectedItem(null);
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setEditItemDialogOpen(true);
    };

    const handleUpdateUnit = (unit) => {
        setSelectedUnit(unit);
        setUpdateUnitDialogOpen(true);
    };

    const handleDelete = (item) => {
        setSelectedItem(item);
        setDetailDialogOpen(false);
        setDeleteItemDialogOpen(true);
    };

    const handleDeleteUnit = (unit) => {
        setSelectedUnit(unit);
        setDetailDialogOpen(false);
        setDeleteUnitDialogOpen(true);
    };

    const fetchItems = async () => {
        try {
            const data = await ApiService.ItemService.getItems();
            setInventory(data.items);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const handleAddItemCall = async (itemData) => {
        console.log("Saved item:", itemData);
        // Make and API call here to add the item
        try {
            const data = await ApiService.ItemService.createItem(itemData);
            console.log(data);
            // Success toast here
            toast.success("CREATED Item successfully", {
                description: `Added item: ${itemData.name} to Inventory`,
            });
        } catch (error) {
            console.error("Error adding item:", error);
            toast.error("Error adding item");
        } finally {
            fetchItems();
        }
    };

    const handleUpdateItemCall = async (itemId, updatedItem) => {
        console.log("Updated Item:", updatedItem);
        // Make an API call here to update the item
        try {
            const data = await ApiService.ItemService.updateItem(itemId, updatedItem);
            console.log(data);
            // Success toast here
            toast.success("UPDATED Item successfully", {
                description: `Update item ID: ${itemId} to Inventory`,
            });
        } catch (error) {
            console.log("Error updating item:", error);
            toast.error("Error updating item");
        } finally {
            fetchItems();
            handleCloseDetail();
        }
    };

    const handleDeleteItemCall = async (itemId) => {
        console.log("Deleting item with ID:", itemId);
        // Make an API call here to delete the item
        try {
            const data = await ApiService.ItemService.deleteItem(itemId);
            console.log(data);
            // Success toast here
            toast.success("DELETE Item successfully", {
                description: `Delete item ID: ${itemId} to Inventory`,
            });
        } catch (error) {
            console.log("Error deleting item:", error);
            toast.error("Error deleting item");
        } finally {
            fetchItems();
            handleCloseDetail();
        }
    };

    const handleUpdateUnitCall = async (unitId, updatedUnit) => {
        console.log("Updated Unit:", updatedUnit);
        // API call for updating the unit
        try {
            const data = await ApiService.ItemService.updateUnit(unitId, updatedUnit);
            console.log(data);
            // Success toast here
            toast.success("UPDATED Item Unit successfully", {
                description: `Update unit ID: ${unitId} to Inventory`,
            });
        } catch (error) {
            console.log("Error updating item unit:", error);
            toast.error("Error updating item unit");
        } finally {
            fetchItems();
            handleCloseDetail();
        }
    };

    const handleDeleteUnitCall = async (unitId) => {
        console.log("Deleting unit with ID:", unitId);
        // Make and API call here to delete the unit
        try {
            const data = await ApiService.ItemService.deleteUnit(unitId);
            console.log(data);
            // Success toast here
            toast.success("DELETE Item Unit successfully", {
                description: `Delete unit ID: ${unitId} to Inventory`,
            });
        } catch (error) {
            console.log("Error deleting item unit:", error);
            toast.error("Error deleting item unit");
        } finally {
            fetchItems();
            handleCloseDetail();
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <>
            <Toaster richColors position="top-center" expand={true} />
            <Header headerTitle="Inventory Management" />
            <DataTable columns={columns} data={inventory} onViewDetails={handleViewDetails} />
            <ItemDetailDialog
                isOpen={detailDialogOpen}
                onClose={handleCloseDetail}
                item={selectedItem}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onUpdateUnit={handleUpdateUnit}
                onDeleteUnit={handleDeleteUnit}
            />

            <AddItemDialog isOpen={addItemDialogOpen} onClose={() => setAddItemDialogOpen(false)} onSave={handleAddItemCall} />

            <EditItemDialog
                isOpen={editItemDialogOpen}
                onClose={() => setEditItemDialogOpen(false)}
                item={selectedItem}
                onSave={handleUpdateItemCall}
            />

            <UpdateUnitDialog
                isOpen={updateUnitDialogOpen}
                onClose={() => setUpdateUnitDialogOpen(false)}
                unit={selectedUnit}
                onSave={handleUpdateUnitCall}
            />

            <DeleteConfirmationDialog
                isOpen={deleteItemDialogOpen}
                onClose={() => setDeleteItemDialogOpen(false)}
                onConfirm={handleDeleteItemCall}
                item={selectedItem}
            />

            <DeleteUnitDialog
                isOpen={deleteUnitDialogOpen}
                onClose={() => setDeleteUnitDialogOpen(false)}
                onConfirm={handleDeleteUnitCall}
                unit={selectedUnit}
            />

            <Button
                className="fixed bottom-6 right-6 rounded-full shadow-lg bg-primary text-white hover:bg-primary-dark w-15 h-15"
                onClick={() => {
                    setAddItemDialogOpen(true);
                }}
            >
                <Plus />
            </Button>
        </>
    );
};

export default Inventory;
