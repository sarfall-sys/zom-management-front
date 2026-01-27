import { toast } from "react-toastify";
import { adminService } from "../services/adminService";
import {roleSwrvice } from "../services/roleService";
export function useAdmin() {
    // Placeholder for future admin-related hooks

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await adminService.getAllUsers();
            setUsers(response);
        } catch (err) {
            setError(err);
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    async function createUser(userData) {
        setLoading(true);
        setError(null);
        try {
            const newUser = await adminService.createUser(userData);
            setUsers((prev) => [...prev, newUser]);
            toast.success("User created successfully");
            return newUser;
        } catch (err) {
            setError(err);
            toast.error("Failed to create user: " + (err.message || ""));
            throw err;
        }
        finally {
            setLoading(false);
        }

    }

    async function updateUser(userId, updatedData) {
        setLoading(true);
        setError(null);
        try {
            const updatedUser = await adminService.updateUser(userId, updatedData);
            setUsers((prev) =>
                prev.map((user) => (user.id === userId ? updatedUser : user))
            );
            toast.success("User updated successfully");
            return updatedUser;
        } catch (err) {
            setError(err);
            toast.error("Failed to update user: " + (err.message || ""));
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function deleteUser(userId) {
        setLoading(true);
        setError(null);
        try {
            await adminService.deleteUser(userId);
            setUsers((prev) => prev.filter((user) => user.id !== userId));
            toast.success("User deleted successfully");
        } catch (err) {
            setError(err);
            toast.error("Failed to delete user: " + (err.message || ""));
            throw err;
        }
        finally {
            setLoading(false);
        }
    }

   async function getRoles(){
        setLoading(true);
        setError(null);
        try {
            const roles = await roleService.getRoles();
            return roles;
        } catch (err) {
            setError(err);
            toast.error("Failed to fetch roles");
            throw err;
        }
   }

    return {
        loading,
        error,
        users,
        fetchUsers,
        createUser,
        updateUser,
        deleteUser,
        getRoles
    };

}