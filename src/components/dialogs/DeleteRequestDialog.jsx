import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PropTypes from "prop-types";

const DeleteRequestDialog = ({ confirmDelete, setConfirmDelete, handleDelete }) => {
    if (!confirmDelete) return null;

    return (
        <Dialog open={true} onOpenChange={() => setConfirmDelete(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete this request?</p>
                <DialogFooter>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

DeleteRequestDialog.propTypes = {
    confirmDelete: PropTypes.object,
    setConfirmDelete: PropTypes.func,
    handleDelete: PropTypes.func,
};

export default DeleteRequestDialog;
