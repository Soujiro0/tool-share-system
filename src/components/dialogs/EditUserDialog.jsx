import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

const EditUserDialog = ({ isOpen, onClose, user, onSave, roles }) => {
    const [formData, setFormData] = useState(user);

    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input name="username" placeholder="Username" value={formData?.username} onChange={handleChange} />
                    <Input name="name" placeholder="Name" value={formData?.name} onChange={handleChange} />
                    <Input name="email" placeholder="Email" value={formData?.email} onChange={handleChange} />
                    <Input name="password" type="password" placeholder="New Password (optional)" onChange={handleChange} />
                    <Select
                        onValueChange={(value) => setFormData({ ...formData, role_id: value })}
                        value={formData?.role_id?.toString()} // Ensure it's a string
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                            {roles.map((role) => (
                                <SelectItem key={role.role_id} value={role.role_id.toString()}>
                                    {role.role_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Update</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

EditUserDialog.propTypes;

export default EditUserDialog;
