import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PropTypes from "prop-types";

const DeleteUnitDialog = ({ isOpen, onClose, onConfirm, unit }) => {
    
    if (!unit) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Unit</DialogTitle>
                </DialogHeader>
                <p>
                    Are you sure you want to delete <strong>{unit.property_no}</strong>? This action cannot be undone.
                </p>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            onConfirm(unit.unit_id);
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

DeleteUnitDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    unit: PropTypes.object.isRequired,
};

export default DeleteUnitDialog;
