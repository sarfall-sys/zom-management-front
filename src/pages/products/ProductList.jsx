import { useState } from "react";
import Table from "../../components/common/Table";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import SearchBar from "../../components/common/SearchBar";
import Filter from "../../components/common/Filter";
import Pagination from "../../components/common/Pagination";
import ConfirmModal from "../../components/common/ConfirmModal";
import { ToastContainer, toast } from "react-toastify";
import CanManageProducts from "../../components/CanManageProducts";
function ProductList() {
  const navigate = useNavigate();

  const {
    products,
    loading,
    error,
    deleteProduct,
    search,
    setSearch,
    sort,
    setSort,
    order,
    page,
    meta,
    setPageOnNext,
    setPageOnPrev,
  } = useProducts();

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [id, setId] = useState(null);

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

  const handleDeleteModal = (id) => {
    setOpenConfirmModal(true);
    setId(id);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id);

      toast.success("Product deleted successfully");
    } finally {
      setOpenConfirmModal(false);
    }
  };

  const handleSearch = (term) => {
    setSearch(term);
  };

  const handleSort = (column) => {
    setSort(column);
  };

  const handleOnPrev = () => {
    setPageOnPrev();
  };

  const handleOnNext = () => {
    setPageOnNext();
  };

  return (
    <>
      <ToastContainer />
      <CanManageProducts>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/products/create">
          <Button variant="primary">Add Product</Button>
        </Link>
      </div>
      </CanManageProducts>

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

      <div className="flex justify-between grid-cols-1 gap-4 mb-4 flex-grid md:grid-cols-2">
        <div className="mb-4">
          <SearchBar
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Filter onSort={handleSort} activeSort={sort} order={order} />
        </div>
      </div>
      <CanManageProducts>
        <Table
          columns={columns}
          data={products}
          onEdit={handleEdit}
          onDelete={handleDeleteModal}
        />
      </CanManageProducts>
      <Pagination
        onPrevious={handleOnPrev}
        onNext={handleOnNext}
        currentPage={page}
        lastPage={meta.last_page}
      />

      {openConfirmModal && (
        <ConfirmModal
          title="Confirm Deletion"
          message="Are you sure you want to delete this product?"
          onConfirm={async () => {
            await handleDelete();
            setOpenConfirmModal(false);
          }}
          onCancel={() => setOpenConfirmModal(false)}
          open={openConfirmModal}
        />
      )}
    </>
  );
}

export default ProductList;
