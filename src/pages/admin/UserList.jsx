import useAdmin from "../../hooks/useAdmin";
import { ToastContainer, toast } from "react-toastify";
import SearchBar from "../../components/common/SearchBar";
import Filter from "../../components/common/Filter";
import Pagination from "../../components/common/Pagination";
import ConfirmModal from "../../components/common/ConfirmModal";
import Loader from "../../components/common/Loader";
import { useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
function UserList() {
  const { fetchUsers, users, loading, error, deleteUser, meta,search, setSearch, sort,page,debouncedSearch, setSort, order,setPageOnPrev,setPageOnNext} = useAdmin();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearch, sort, order, page]);


  const handleEdit = (userId) => {
    navigate(`/admin/users/edit/${userId}`);
  };

  const handleDelete = async (userId) => {
    setOpenConfirmModal(true);
    try {
      await deleteUser(userId);
    } finally {
      setOpenConfirmModal(false);
    }
  };

  const handleSort = (column) => {
    setSort(column);
  }

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link to="/admin/users/create">
          <button className="px-4 py-2 text-white bg-indigo-400 rounded">
            Add User
          </button>
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

      <div className="flex justify-between grid-cols-1 gap-4 mb-4 flex-grid md:grid-cols-2">
        <div className="mb-4">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="mb-4">
          <Filter  onSort={handleSort} activeSort={sort} order={order} />
        </div>
      </div>

      {users.length > 0 && (
        <table className="min-w-full overflow-hidden rounded-lg bg-bg-light dark:bg-bg-dark">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-2 text-sm font-semibold text-left border-b border-gray-200 text-text-light dark:text-text-dark bg-bg-light dark:bg-bg-dark"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-2 border-b border-gray-200 bg-bg-light dark:bg-bg-dark"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-4 py-2 text-sm border-b border-gray-200 text-text-light dark:text-text-dark"
                  >
                    {user[col.key]}
                  </td>
                ))}
                <td className="px-4 py-2 text-sm border-b border-gray-200 text-text-light dark:text-text-dark">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="px-2 py-1 mr-4 text-blue-600 bg-blue-200 rounded-full hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-2 py-1 text-red-600 bg-red-200 rounded-full hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination meta={meta} setPageOnPrev={setPageOnPrev} setPageOnNext={setPageOnNext} />

      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          title="Confirm Delete"
          message="Are you sure you want to delete this user? This action cannot be undone."
          onConfirm={() => handleDelete()}
          onCancel={() => setOpenConfirmModal(false)}
        />
      )}
    </>
  );
}

export default UserList;
