import ApiService from "@/api/ApiService";
import AddUserDialog from "@/components/dialogs/AddUserDialog";
import DeleteUserDialog from "@/components/dialogs/DeleteUserDialog";
import EditUserDialog from "@/components/dialogs/EditUserDialog";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const roles = [
    { role_id: 1, role_name: "Super Admin" },
    { role_id: 2, role_name: "Admin" },
    { role_id: 3, role_name: "Faculty" },
];

const ManageAccounts = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filterRole, setFilterRole] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [dialogType, setDialogType] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await ApiService.UserService.getUsers();
            setUsers(data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const openDialog = (type, user = null) => {
        setSelectedUser(user);
        setDialogType(type);
    };

    const closeDialog = () => {
        setDialogType("");
        setSelectedUser(null);
    };

    const handleAddUser = async (userData) => {
        try {
            await ApiService.UserService.addUser(userData);
        } catch (error) {
            console.error("Error adding user:", error);
        } finally {
            fetchUsers();
            closeDialog();
        }

        toast.success("CREATED user successfully", {
            description: `${userData.name} added successfully in database.`,
        });
    };

    const handleEditUser = async (userData) => {
        try {
            await ApiService.UserService.updateUser(userData.user_id, userData);
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            fetchUsers();
            closeDialog();
        }

        toast.success("UPDATED user successfully", {
            description: `${userData.name} has been updated.`,
        });
    };

    const handleDeleteUser = async (id) => {
        try {
            await ApiService.UserService.deleteUser(id);
        } catch (error) {
            console.error("Error deleting user:", error);
        } finally {
            fetchUsers();
            closeDialog();
        }
        toast.success("DELETED user successfully", {
            description: `User ID: ${id} has been deleted in database.`,
        });
    };

    const filteredUsers = users.filter(
        (user) =>
            (user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.username.toLowerCase().includes(search.toLowerCase())) &&
            (filterRole === "All" || filterRole === "" || user.role_id.toString() === filterRole)
    );

    return (
        <>
        <Toaster richColors position="top-center" expand={true}/>
            <Header headerTitle="Manage Accounts" />

            <div className="p-2">
                <div className="flex gap-4 my-4">
                    <Input
                        type="text"
                        placeholder="Search by name or username..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <Select onValueChange={setFilterRole} value={filterRole}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Roles</SelectItem>
                            {roles.map((role) => (
                                <SelectItem key={role.role_id} value={role.role_id.toString()}>
                                    {role.role_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button onClick={() => openDialog("add")}>Add User</Button>
                </div>

                <Table className="w-full border border-gray-200">
                    <TableHeader className="bg-gray-200">
                        <TableRow>
                            <TableHead>User ID</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.user_id} className="border-b border-gray-200">
                                <TableCell className="px-4 py-2">{user.user_id}</TableCell>
                                <TableCell className="px-4 py-2">{user.username}</TableCell>
                                <TableCell className="px-4 py-2">{user.name}</TableCell>
                                <TableCell className="px-4 py-2">{user.email}</TableCell>
                                <TableCell className="px-4 py-2">
                                    {roles.find((r) => r.role_id === user.role_id)?.role_name || "Unknown"}
                                </TableCell>
                                <TableCell className="px-4 py-2 flex gap-2">
                                    <Button
                                        variant="outline"
                                        className="border border-gray-300 px-3 py-1 text-sm"
                                        onClick={() => openDialog("edit", user)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className="bg-red-500 text-white px-3 py-1 text-sm"
                                        onClick={() => openDialog("delete", user)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Add User Dialog */}
            <AddUserDialog isOpen={dialogType === "add"} onClose={closeDialog} onSave={handleAddUser} roles={roles} />

            {/* Edit User Dialog */}
            <EditUserDialog isOpen={dialogType === "edit"} onClose={closeDialog} user={selectedUser} onSave={handleEditUser} roles={roles} />

            {/* Delete User Dialog */}
            <DeleteUserDialog isOpen={dialogType === "delete"} onClose={closeDialog} user={selectedUser} onDelete={handleDeleteUser} />
        </>
    );
};

export default ManageAccounts;
