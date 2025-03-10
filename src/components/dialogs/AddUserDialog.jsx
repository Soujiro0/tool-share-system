import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const AddUserDialog = ({ isOpen, onClose, onSave, roles }) => {
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
        role_id: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (value) => {
        setFormData({ ...formData, role_id: value });
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                    <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                    <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                    <Input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />

                    {/* ShadCN Select Component for Role Selection */}
                    <Select onValueChange={handleRoleChange}>
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
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

AddUserDialog.propTypes;

export default AddUserDialog;
