import { useState, useEffect, useCallback } from 'react';
import productService from '../services/productService'; // Fixed typo
import { useDebounce } from "./useDebounce";

export function useProducts() {

  const [searchParams, setSearchParams] = useSearchParams();
  // Placeholder for future admin-related hooks
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "name";
  const order = searchParams.get("order") || "asc";
  const page = Number(searchParams.get("page") || 1);

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState([]);


  const debouncedSearch = useDebounce(search, 600);

  // Fetch all products
  const fetchProducts = async (params) => {
    setLoading(true);
    setError(null);

    try {
      const response = await productService.getProducts(
        {
          search: debouncedSearch,
          sort,
          order,
          page,
          ...params,
        }
      );
      setProducts(response.data);
      setMeta(response.meta);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
      console.error("Error fetching products:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch single product
  const fetchProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getProduct(id);
      const br = response.data;
      setProduct({
        ...br,
        subfamily_id: br.subfamily_id ?? "",
        brand_id: br.brand_id ?? "",
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch product');
      console.error("Error fetching product:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create product
  const storeProduct = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.createProduct(data);
      // Optimistic update
      setProducts(prev => [...prev, response.data.data]);
      return response.data.data;
    } catch (err) {
      setError(err.message || 'Failed to create product');
      console.error("Error creating product:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update product
  const updateProduct = useCallback(async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.updateProduct(id, data);
      // Optimistic update
      setProducts(prev =>
        prev.map(product => product.id === id ? response.data : product)
      );
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to update product');
      console.error("Error updating product:", err);
      // Refresh on error to ensure consistency
      fetchProducts();
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchProducts]);

  // Delete product
  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await productService.deleteProduct(id);
      // Optimistic update
      setProducts(prev => prev.filter(product => product.id !== id));
      return true;
    } catch (err) {
      setError(err.message || 'Failed to delete product');
      console.error("Error deleting product:", err);
      // Refresh on error to ensure consistency
      fetchProducts();
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchProducts]);



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


  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    // State
    products,
    product,
    loading,
    error,
    meta,


    // Actions
    fetchProducts,
    fetchProduct,
    storeProduct,
    updateProduct,
    deleteProduct,

    // Search and Sorting
    sort,
    order,
    order,
    setSearchTerm,
    setSort,
    setPageOnPrev,
    setPageOnNext,
  };
}