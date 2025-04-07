import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import PropTypes from "prop-types";

const SelectedItemsTable = ({ items, onRemove }) => {
    if (items.length === 0) return <p className="text-sm text-muted-foreground">No items selected.</p>;

    return (
        <div className="border rounded-md p-4">
            <h3 className="font-semibold mb-2">Selected Items</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.item_id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.category_name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => onRemove(item.item_id)}
                                >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

SelectedItemsTable.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            item_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            category_name: PropTypes.string,
            quantity: PropTypes.number.isRequired,
        })
    ).isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default SelectedItemsTable;