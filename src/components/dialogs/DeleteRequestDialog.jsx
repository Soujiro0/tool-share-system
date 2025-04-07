import ApiService from "@/api/ApiService";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import PropTypes from "prop-types";
import { toast } from "sonner";

const DeleteRequestDialog = ({ id, onClose, setData }) => {
    const handleDelete = async () => {
        try {
            const data = await ApiService.RequestBorrowService.deleteRequest(id);
            console.log(data);
            console.log("Request deleted successfully");
            toast.success("Request Deleted successfully", {
                description: "Your request has been updated.",
            });
        } catch (error) {
            console.error("Error deleting request:", error);
            toast.error("Error deleting request");
        } finally {
            onClose();
            setData((prev) => prev.filter((req) => req.request_id !== id));
        }
    };

    return (
        <>
            <Toaster richColors position="top-center" expand={true} />
            <Dialog open onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this request? Request ID: {id}</p>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

DeleteRequestDialog.propTypes = {
    id: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
};

export default DeleteRequestDialog;
