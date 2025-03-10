import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const LogoutDialog = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent width="max-w-fit">
                <DialogHeader>
                    <DialogTitle>Confirm Logout</DialogTitle>
                </DialogHeader>
                <p className="text-gray-600 text-center">Are you sure you want to log out?</p>
                <div className="flex justify-center gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onConfirm}>
                        Logout
                    </Button>
                    </div>
            </DialogContent>
        </Dialog>
    );
};

LogoutDialog.propTypes;

export default LogoutDialog;
