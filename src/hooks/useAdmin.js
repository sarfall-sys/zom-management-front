import { toast } from "react-toastify";
import { adminService } from "../services/adminService";
import { roleService } from "../services/roleService";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "./useDebounce";

export function useAdmin() {
    const [searchParams, setSearchParams] = useSearchParams();
    // Placeholder for future admin-related hooks

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState(null);
    const [meta, setMeta] = useState([]);
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [sort, setSort] = useState(searchParams.get("sort") || "name");
    const [order, setOrder] = useState(searchParams.get("order") || "asc");
    const [page, setPage] = useState(Number(searchParams.get("page") || 1));
    
    const debouncedSearch = useDebounce(searchParams.get("search") || "", 600);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await adminService.getAllUsers({
                search: debouncedSearch,
                // Add other params like sort, order, page if needed
                sort: searchParams.get("sort") || "name",
                order: searchParams.get("order") || "asc",
                page: Number(searchParams.get("page") || 1),    
            });
            setUsers(response.data);
            setMeta(response.meta);
        } catch (err) {
            setError(err);
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    async function fetchUserById(userId) {
        setLoading(true);
        setError(null);
        try {
            const user = await adminService.getUserById(userId);
            setUser(user);
        } catch (err) {
            setError(err);
            toast.error("Failed to fetch user");
            throw err;
        }
        finally {
            setLoading(false);
        }
    }

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

    async function getRoles() {
        setLoading(true);
        setError(null);
        try {
            const roles = await roleService.getRoles();
            setRoles(roles);
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
        user,
        roles,
        meta,
        fetchUsers,
        fetchUserById,
        createUser,
        updateUser,
        deleteUser,
        getRoles,
        search,
        setSearch,
        sort,
        setSort,
        order,
        setOrder,
        page,
        setPage,

    };

}