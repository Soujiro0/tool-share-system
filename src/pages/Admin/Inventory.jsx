import AddItemModal from "@/components/dialogs/AddItemDialog";
import DeleteConfirmationDialog from "@/components/dialogs/DeleteConfirmationDialog";
import EditItemDialog from "@/components/dialogs/EditItemDialog";
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
    const [selectedItem, setSelectedItem] = useState();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const fetchItems = async () => {
        try {
            const data = await ApiService.ItemService.getItems();
            setInventory(data.items);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const handleAdd = () => {
        setIsAddModalOpen(true);
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setIsEditDialogOpen(true);
    };

    const handleDelete = (item) => {
        setSelectedItem(item);
        setIsDeleteDialogOpen(true);
    };

    const handleSaveAdd = async (newItem) => {
        setInventory((prev) => [...prev, { ...newItem, item_id: prev.length }]);

        try {
            await ApiService.ItemService.createItem(newItem);
        } catch (error) {
            console.error("Error Adding New Item", error);
            throw error;
        } finally {
            fetchItems();
        }

        toast.success("Item Added to Inventory", {
            description: `${newItem.name} has been added to the inventory.`,
        });
    };

    const handleSaveEdit = async (updatedItem) => {
        console.log(updatedItem)
        setInventory((prev) => prev.map((item) => (item.item_id === updatedItem.item_id ? updatedItem : item)));

        try {
            await ApiService.ItemService.updateItem(updatedItem.item_id, updatedItem);
        } catch (error) {
            console.error("Error Updating Item", error);
            throw error;
        } finally {
            fetchItems();
        }

        toast.success("Item Updated Successfully", {
            description: `${updatedItem.name} has been updated.`,
        });
    };

    const handleDeleteConfirm = async () => {
        setInventory((prev) => prev.filter((item) => item.item_id !== selectedItem.item_id));

        try {
            await ApiService.ItemService.deleteItem(selectedItem.item_id);
        } catch (error) {
            console.error("Error Deleting Item", error);
            throw error;
        } finally {
            fetchItems();
        }

        toast.success("Item Deleted to Inventory", {
            description: `${selectedItem.name} has been deleted to the inventory.`,
        });
    };

    return (
        <>
        <Toaster richColors position="top-center" expand={true}/>
            <Header headerTitle="Inventory Management" />
            <DataTable columns={columns} handleEdit={handleEdit} handleDelete={handleDelete} data={inventory} />
            <AddItemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleSaveAdd} />
            <EditItemDialog isOpen={isEditModalOpen} onClose={() => setIsEditDialogOpen(false)} item={selectedItem} onSave={handleSaveEdit} />
            <DeleteConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                item={selectedItem}
                onConfirm={handleDeleteConfirm}
            />
            {/* Floating Add Button */}
            <Button
                className="fixed bottom-6 right-6 rounded-full shadow-lg bg-primary text-white hover:bg-primary-dark w-15 h-15"
                onClick={handleAdd}
            >
                <Plus />
            </Button>
            {/* <Alert className="fixed top-50 left-50">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>You can add components and dependencies to your app using the cli.</AlertDescription>
            </Alert> */}
        </>
    );
};

export default Inventory;
