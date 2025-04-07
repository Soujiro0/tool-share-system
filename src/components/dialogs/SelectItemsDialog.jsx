import ApiService from "@/api/ApiService";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const SelectItemsDialog = ({ open, onClose, selectedItems, onSelect }) => {
    const [localItems, setLocalItems] = useState([]);
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");

    const fetchItems = async () => {
        try {
            const data = await ApiService.ItemService.getItems();
            setItems(data.items || []);
        } catch (error) {
            console.log("Error fetching items:", error);
        }
    };

    const handleConfirm = () => {
        const selected = localItems.filter((item) => item.checked).map(({ item_id, name, category_name, quantity }) => ({ item_id, name, category_name, quantity }));
        console.log(selected);
        onSelect(selected);
        onClose();
    };

    useEffect(() => {
        if (open) {
            fetchItems();
        }
    }, [open]);

    useEffect(() => {
        const initial = items.map((item) => {
            const found = selectedItems.find((i) => i.item_id === item.item_id);
            return {
                ...item,
                quantity_available: item.quantity, // <--- this is your available stock
                quantity: found?.quantity || 1,
                checked: !!found,
            };
        });
        setLocalItems(initial);
    }, [items, selectedItems]);

    const filteredItems = localItems.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent width="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Select Items to Borrow</DialogTitle>
                </DialogHeader>

                {/* Search Input */}
                <Input placeholder="Search item..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-4" />

                {/* Scrollable list */}
                <ScrollArea className="max-h-96 pr-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-10"></TableHead>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead className="text-right">Available</TableHead>
                                <TableHead className="text-right">Quantity to Borrow</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item, index) => (
                                    <TableRow key={item.item_id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={item.checked}
                                                onCheckedChange={(val) => {
                                                    const updated = [...localItems];
                                                    updated[index].checked = val;
                                                    setLocalItems(updated);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.category_name}</TableCell>
                                        <TableCell className="text-center text-sm text-muted-foreground">{item.quantity_available} {item.unit}</TableCell>
                                        <TableCell className="flex items-center justify-end">
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => {
                                                        const updated = [...localItems];
                                                        if (updated[index].quantity > 1) updated[index].quantity -= 1;
                                                        setLocalItems(updated);
                                                    }}
                                                >
                                                    -
                                                </Button>
                                                <span>{item.quantity}</span>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => {
                                                        const updated = [...localItems];
                                                        if (updated[index].quantity < updated[index].quantity_available) {
                                                            updated[index].quantity += 1;
                                                            setLocalItems(updated);
                                                        }
                                                    }}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-sm text-muted-foreground">
                                        No items found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </ScrollArea>

                <Button className="w-full mt-4" onClick={handleConfirm}>
                    Add Selected Items
                </Button>
            </DialogContent>
        </Dialog>
    );
};

SelectItemsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedItems: PropTypes.arrayOf(
        PropTypes.shape({
            item_id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
        })
    ).isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default SelectItemsDialog;
