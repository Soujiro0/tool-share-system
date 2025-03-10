import ApiService from "@/api/ApiService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const SelectItemsDialog = ({ onAddItems }) => {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedItems, setSelectedItems] = useState([]);

    const fetchItems = async () => {
        try {
            const data = await ApiService.ItemService.getItems();
            console.log(data);
            setItems(data.items);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleSelect = (item) => {
        setSelectedItems((prev) =>
            prev.some((i) => i.item_id === item.item_id)
                ? prev.filter((i) => i.item_id !== item.item_id)
                : [...prev, { ...item, quantityToBorrow: 1 }]
        );
    };

    const handleQuantityChange = (itemId, amount) => {
        setSelectedItems((prev) =>
            prev.map((item) =>
                item.item_id === itemId ? { ...item, quantityToBorrow: Math.max(1, Math.min(item.quantity, item.quantityToBorrow + amount)) } : item
            )
        );
    };

    const handleAddToSlip = () => {
        onAddItems(selectedItems);
        setSelectedItems([]);
    };

    const filteredItems = items.filter(
        (item) => item.name.toLowerCase().includes(search.toLowerCase()) && (statusFilter === "All" || item.status === statusFilter)
    );

    return (
        <DialogContent width="max-w-7xl">
            <DialogHeader>
                <DialogTitle>Select Items to Borrow</DialogTitle>
            </DialogHeader>

            {/* Search & Filters */}
            <div className="flex gap-2 mb-4">
                <Input placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1" />
                <Select onValueChange={setStatusFilter} defaultValue="All">
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="No Stock">No Stock</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Items Table */}
            <ScrollArea className="max-h-[400px] max-w-full overflow-auto border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-10"></TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Property No.</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Available</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Condition</TableHead>
                            <TableHead>Quantity to Borrow</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredItems.map((item) => (
                            <TableRow key={item.item_id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedItems.some((i) => i.item_id === item.item_id)}
                                        onCheckedChange={() => handleSelect(item)}
                                        disabled={item.quantity === 0}
                                    />
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.property_no}</TableCell>
                                <TableCell>{item.category_item_item_id}</TableCell>
                                <TableCell>
                                    {item.quantity} {item.unit}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={item.status === "AVAILABLE" ? "success" : "destructive"}>{item.status}</Badge>
                                </TableCell>
                                <TableCell>{item.item_condition}</TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() => handleQuantityChange(item.item_id, -1)}
                                            disabled={!selectedItems.some((i) => i.item_id === item.item_id) || item.quantity === 0}
                                        >
                                            –
                                        </Button>
                                        <span>{selectedItems.find((i) => i.item_id === item.item_id)?.quantityToBorrow || 0}</span>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() => handleQuantityChange(item.item_id, 1)}
                                            disabled={!selectedItems.some((i) => i.item_id === item.item_id) || item.quantity === 0}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {/* Selected Items & Add Button */}
            <div className="flex justify-between items-center mt-2">
                <span className="text-sm">
                    {selectedItems.length} items selected{" "}
                    {selectedItems.length > 0 && (
                        <button onClick={() => setSelectedItems([])} className="text-blue-600 underline">
                            Clear all
                        </button>
                    )}
                </span>
                <Button onClick={handleAddToSlip} disabled={selectedItems.length === 0}>
                    + Add to Borrower Slip
                </Button>
            </div>
        </DialogContent>
    );
};

SelectItemsDialog.propTypes = {
    onAddItems: PropTypes.func.isRequired,
};

export default SelectItemsDialog;
