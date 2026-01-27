import React, { use, useState } from "react";
import Table from "../../components/common/Table";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { getProductColumns } from "../../config/getProductColumns";
import SearchBar from "../../components/common/SearchBar";
import Filter from "../../components/common/Filter";
function ProductList() {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const { products, loading, error, deleteProduct, fetchProducts } =
    useProducts();
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  console.log("Products data ", products);

  const columns = [
    { key: "name", label: "Product Name" },
    { key: "sku", label: "SKU" },
    { key: "slug", label: "Slug" },
    { key: "is_active", label: "Is Active" },
    { key: "is_on_sale", label: "Is On Sale" },
    { key: "price", label: "Price" },
    { key: "sale_price", label: "Sale Price" },
    { key: "subfamily_name", label: "Subfamily" },
    { key: "brand_name", label: "Brand" },
  ];

  const handleEdit = (productId) => {
    navigate(`/products/edit/${productId}`);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        alert("Product deleted successfully");
      } catch (err) {
        alert("Failed to delete product: " + err.message);
      }
    }
  };

  const handleSearch = async (term) => {
    console.log("Search term from ProductList:", term);
    // Implement search functionality here
    await fetchProducts({ search: term });
  };

  const handleFilter = async (filterParams) => {
    console.log("Filter params from ProductList:", { sort: filterParams });
    await fetchProducts({ sort: filterParams });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/products/create">
          <Button variant="primary">Add Product</Button>
        </Link>
      </div>

      {error && (
        <div className="px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}
      {loading && (
        <div className="my-4">
          <Loader />
        </div>
      )}

      <div className="flex justify-between mb-4 flex-grid md:grid-cols-2">
        <div className="mb-4">
          <SearchBar
            type="text"
            placeholder="Search Products..."
            className="w-full px-4 py-2 border border-gray-300 rounded"
            localSearchTerm={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            onSubmit={() => handleSearch(localSearchTerm)}
          />
        </div>
        <div className="m-4">
          <Filter onSubmit={handleFilter} />
        </div>
      </div>

      <Table
        columns={columns}
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
}

export default ProductList;
