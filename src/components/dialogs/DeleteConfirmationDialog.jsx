import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PropTypes from "prop-types";

const DeleteConfirmationDialog = ({ isOpen, onClose, onConfirm, item }) => {
    if (!item) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Item</DialogTitle>
                </DialogHeader>
                <p>
                    Are you sure you want to delete <strong>{item.name}</strong>? This action cannot be undone.
                </p>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            onConfirm(item.item_id);
                            onClose();
                        }}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

DeleteConfirmationDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};

export default DeleteConfirmationDialog;
