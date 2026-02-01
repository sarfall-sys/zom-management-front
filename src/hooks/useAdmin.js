import { toast } from "react-toastify";
import { adminService } from "../services/adminService";
import roleService from "../services/roleService";
import { data, useSearchParams } from "react-router-dom";
import { useDebounce } from "./useDebounce";
import { useEffect, useState } from "react";

export function useAdmin() {
    const [searchParams, setSearchParams] = useSearchParams();
    // Placeholder for future admin-related hooks
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "name";
    const order = searchParams.get("order") || "asc";
    const page = Number(searchParams.get("page") || 1);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState(null);
    const [meta, setMeta] = useState([]);
    const [userStats, setUserStats] = useState({});
    const [productStats, setProductStats] = useState({});
    const [productBrandChartData, setProductBrandChartData] = useState([]);
    const [productSubfamilyChartData, setProductSubfamilyChartData] = useState([]);


    const debouncedSearch = useDebounce(search, 600);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await adminService.getUsers({
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
            const response = await adminService.getUser(userId);
            const user = response || response.data;
            setUser(user);
            setRoles([{
                ...user,
                role_id: user.role_id,
            }]
            )
            
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

    async function fetchRoles() {
        setLoading(true);
        setError(null);
        try {
            const roles = await adminService.getNameRoles();
            setRoles(roles);
        } catch (err) {
            setError(err);
            toast.error("Failed to fetch roles");
            throw err;
        }
    }

    async function fetchUserStats() {
        setLoading(true);
        setError(null);
        try {
            const response = await adminService.getUserStats();
            const stats = response || response.data;
            setUserStats(stats);
        } catch (err) {
            setError(err);
            toast.error("Failed to fetch user stats");
            throw err;
        }
        finally {
            setLoading(false);
        }

    }

    async function fetchProductStats() {
        setLoading(true);
        setError(null);
        try {
            const response = await adminService.getProductsStats();
            const stats = response || response.data;
            setProductStats(stats);
        } catch (err) {
            setError(err);
            toast.error("Failed to fetch product stats");
            throw err;
        }

        finally {
            setLoading(false);
        }
    }


    async function fetchProductBrandChartData() {
        setLoading(true);
        setError(null);
        try {
            const response = await adminService.getProductsBrandChartsData();
            const charts = response;

            console.log("Brands charts in fetch :", charts);
            setProductBrandChartData(
                charts.map(item => ({
                    name: item.name,
                    value: item.total
                }))
            )
        }
        catch (err) {
            setError(err);
            toast.error("Failed to fetch product brand chart data");
            throw err;
        }

        finally {
            setLoading(false);
        }
    }

    async function fetchProductSubfamilyChartData() {
        setLoading(true);
        setError(null);
        try {
            const response = await adminService.getProductsSubfamilyChartsData();
            const charts = response;
            setProductSubfamilyChartData(
                charts.map(item => ({
                    name: item.name,
                    value: item.total
                }))
            )
            console.log("Subfamilies in fetch :", charts);
        }
        catch (err) {
            setError(err);
            toast.error("Failed to fetch product subfamily chart data");
            throw err;
        }
        finally {
            setLoading(false);
        }
    }

    const updateParams = (params) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            Object.entries(params).forEach(([k, v]) => {
                if (!v) next.delete(k);
                else next.set(k, v);
            });
            return next;
        });
    };

    const setSearchTerm = (term) => {
        updateParams({ search: term, page: 1 });
    };

    const setSort = (column) => {

        updateParams({ sort: column, order: sort === column && order === "asc" ? "desc" : "asc", page: 1 });
    };

    const setPageOnPrev = () => {
        const currentPage = Number(searchParams.get("page") || 1);
        if (currentPage > 1) {
            updateParams({ page: currentPage - 1 });
        }
    };

    const setPageOnNext = () => {
        const currentPage = Number(searchParams.get("page") || 1);
        updateParams({ page: currentPage + 1 });
    };

  /*   useEffect(() => {
        fetchUsers();
    }, [debouncedSearch, sort, order, page]);
 */
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
        fetchRoles,
        search,
        sort,
        order,
        page,
        setSearchTerm,
        setSort,
        setPageOnPrev,
        setPageOnNext,

        userStats,
        productStats,
        productBrandChartData,
        productSubfamilyChartData,
        fetchUserStats,
        fetchProductStats,
        fetchProductBrandChartData,
        fetchProductSubfamilyChartData,

        debouncedSearch,

    };

}


export default useAdmin;