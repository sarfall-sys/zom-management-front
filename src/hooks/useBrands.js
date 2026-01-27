import { useState, useEffect, useCallback } from "react";
import brandService from "../services/brandService";
import { useDebounce } from "./useDebounce";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export function useBrands() {
    const [searchParams, setSearchParams] = useSearchParams();
    // Read from URL (single source of truth)

    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "name";
    const order = searchParams.get("order") || "asc";
    const page = Number(searchParams.get("page") || 1);

    //Server State

    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState(null);
    const [meta, setMeta] = useState([]);

    const [brandNames, setBrandsNames] = useState([]);
    const [countries, setCountries] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const debouncedSearch = useDebounce(search, 600);

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

    const fetchBrands = async (params = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await brandService.getBrands({
                search: debouncedSearch,
                sort,
                order,
                page,
                ...params,
            });

            setBrands(response.data); // important
            setMeta(response.meta);   // important
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchBrand = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await brandService.getBrand(id);
            const pro = response.data;

            setBrand({
                ...pro,
                country_id: pro.country_id ?? "",
            });
            return pro;
        } catch (err) {
            const status = err.response?.status;
            setError(err.response?.data?.message || err.message || 'Failed to fetch brand');
        } finally {
            setLoading(false);
        }
    };

    const fetchBrandNames = (async () => {
        setLoading(true);
        try {
            const response = await brandService.getBrandNames();
            const data = response || response.data;
            console.log("Brand Names Data: ", data);
            setBrandsNames(
                data.map(item => ({
                    value: item.id,
                    label: item.name
                })));
            return response.data;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    });

    const fetchCountries = (async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await brandService.getCountries();
            const data = response || response.data;
            console.log("Countries Data: ", data);
            setCountries(

                data.map(item => ({
                    value: item.id,
                    label: item.name
                }))
            );
            return response.data;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    });

    const storeBrand = (async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await brandService.createBrand(data);
            await fetchBrands();
            toast.success("Brand created successfully");
        } catch (err) {
            const status = err.response?.status;
            if (status === 401) {
                toast.error("You are not authorized to perform this action");
            } else if (status === 419) {
                toast.error("Session expired. Please refresh the page.");
            } else {
                toast.error(err.response?.data?.message || "Failed to create brand");
            }
            setError(err);
        } finally {
            setLoading(false);
        }
    });
    const updateBrand = (async (id, data) => {
        setLoading(true);
        setError(null);
        let status = null; // Initialize status variable
        try {
            const response = await brandService.updateBrand(id, data);
            status = response.status; // Capture the status
            toast.success("Brand updated successfully"); // Add toast for success
            await fetchBrands();
        } catch (err) {
            setError(err.response?.data?.message ||
                err.message ||
                "Unexpected error");
                
            const status = err.response?.status;

            if (status === 401) {
                toast.error("You are not authorized to perform this action");
            } else if (status === 419) {
                toast.error("Session expired. Please refresh the page.");
            } else {
                toast.error(
                    err.response?.data?.message || "Failed to delete brand"
                );
            }
        } finally {
            setLoading(false);
            return status; // Return the status
        }
    });

    const deleteBrand = async (id) => {
        setLoading(true);

        try {
            console.log("🗑️ Deleting brand:", id);

            await brandService.deleteBrand(id);

            toast.success("Brand deleted successfully");

            await fetchBrands();
        } catch (err) {
            console.error("❌ Delete error:", err);

            const status = err.response?.status;

            if (status === 401) {
                toast.error("You are not authorized to perform this action");
            } else if (status === 419) {
                toast.error("Session expired. Please refresh the page.");
            } else {
                toast.error(
                    err.response?.data?.message || "Failed to delete brand"
                );
            }

            throw err; // 🔥 important: allow component to react if needed
        } finally {
            setLoading(false);
        }
    };

    const setSearch = (term) => {
        updateParams({ search: term, page: 1 });
    };

    const setSort = (column) => {
        updateParams({ sort: column, order: sort === column && order === "asc" ? "desc" : "asc", page: 1 });
    };

    const setRemoveBrand = (id) => {

        setBrands(brands.filter(brand => brand.id !== id));
    };

    const setPageOnPrev = () => {
        if (meta.current_page > 1) {
            updateParams({ page: meta.current_page - 1 });
        }
    };

    const setPageOnNext = () => {
        if (meta.current_page < meta.last_page) {
            updateParams({ page: meta.current_page + 1 });
        }
    };


    useEffect(() => {
        fetchBrands();
    }, [debouncedSearch, sort, order, page]);



    return {
        brands,
        brand,
        loading,
        error,
        brandNames,
        countries,

        setBrandsNames,
        setBrands,
        setBrand,
        setLoading,
        fetchBrands,
        fetchBrand,
        fetchBrandNames,
        fetchCountries,
        storeBrand,
        updateBrand,
        deleteBrand,

        meta,

        search,
        order,
        sort,
        page,

        setSearch,
        setSort,
        setRemoveBrand,
        setPageOnPrev,
        setPageOnNext,

    };

}