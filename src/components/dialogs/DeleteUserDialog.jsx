import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const DeleteUserDialog = ({ isOpen, onClose, user, onDelete }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete <strong>{user?.name}</strong>?</p>
                <DialogFooter>
                    <Button onClick={onClose} variant="outline">Cancel</Button>
                    <Button onClick={() => onDelete(user.user_id)} variant="destructive">Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

DeleteUserDialog.propTypes;

export default DeleteUserDialog;