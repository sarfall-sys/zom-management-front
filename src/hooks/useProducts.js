import { useState, useEffect, useCallback } from 'react';
import productService from '../services/productService'; // Fixed typo

export function useProducts() {

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchProducts = (async (params) => {
    setLoading(true);
    setError(null);

    try {
      const response = await productService.getProducts(params);
      setProducts(response.data.data);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
      console.error("Error fetching products:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single product
  const fetchProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getProduct(id);
      const br = response.data.data;
      setProduct({
        ...br,
        subfamily_id: br.subfamily_id ?? "",
        brand_id: br.brand_id ?? "",
      });
      return br;
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

    // Actions
    fetchProducts,
    fetchProduct,
    storeProduct,
    updateProduct,
    deleteProduct,


  };
}