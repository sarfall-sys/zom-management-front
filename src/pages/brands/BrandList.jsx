import { useBrands } from "../../hooks/useBrands";
import Table from "../../components/common/Table";
import Loader from "../../components/common/Loader";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import SearchBar from "../../components/common/SearchBar";
import Filter from "../../components/common/Filter";
import { ToastContainer, toast } from "react-toastify";
import CanManageBrands from "../../components/CanManageBrands";
import { ToastContainer, toast } from "react-toastify";
import ConfirmModal from "../../components/common/ConfirmModal";
import { useState } from "react";
function BrandList() {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const {
    brands,
    meta,
    loading,
    error,
    search,
    setSearch,
    sort,
    order,
    setSort,
    setPageOnPrev,
    setPageOnNext,
    deleteBrand,
  } = useBrands();

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "slug", label: "Slug" },
    { key: "description", label: "Description" },
    { key: "country_name", label: "Country" },
  ];

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [id, setId] = useState(null);

  const handleEdit = (brandId) => {
    navigate(`/brands/edit/${brandId}`);
  };

  const handleDeleteModal = (id) => {
    setOpenConfirmModal(true);
    setId(id);
  };

  const handleDelete = async () => {
    try {
      await deleteBrand(id);

      toast.success("Brand deleted successfully");
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

      <CanManageBrands>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Brands</h1>
          <Link to="/brands/create">
            <Button variant="primary">Add Brand</Button>
          </Link>
        </div>
      </CanManageBrands>

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

      <CanManageBrands>
        <Table
          columns={columns}
          data={brands}
          onEdit={handleEdit}
          onDelete={handleDeleteModal}
        />
      </CanManageBrands>
      <Pagination
        onPrevious={handleOnPrev}
        onNext={handleOnNext}
        currentPage={meta.current_page}
        lastPage={meta.last_page}
      />

      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          title="Confirm Delete"
          message="Are you sure you want to delete this brand? This action cannot be undone."
          onConfirm={() => {
            // Call the delete function here
            handleDelete();
          }}
          onClose={() => setOpenConfirmModal(false)}
        />
      )}
    </>
  );
}

export default BrandList;
