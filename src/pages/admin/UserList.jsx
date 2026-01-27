import useAdmin from "../../hooks/useAdmin";
import { ToastContainer, toast } from "react-toastify";
import Link from "react-router-dom/Link";
import SearchBar from "../../components/common/SearchBar";
import Filter from "../../components/common/Filter";
import ConfirmModal from "../../components/common/ConfirmModal";
import Loader from "../../components/common/Loader";
import { useNavigate } from "react-router-dom";
function UserList() {
  const { users, loading, error, deleteUser } = useAdmin();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ];

  const navigate = useNavigate();

  const handleEdit = (userId) => {
    navigate(`/users/edit/${userId}`);
  };

  const handleDelete = async (userId) => {
    setOpenConfirmModal(true);
    try {
      await deleteUser(userId);
    } finally {
      setOpenConfirmModal(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link to="/users/create">
          <button className="bg-indigo-400 text-white px-4 py-2 rounded">
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

      {users.length > 0 && (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700"
                >
                  {col.label}
                </th>
              ))}
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="py-2  px-4 border-b border-gray-200 text-sm text-gray-700"
                  >
                    {user[col.key]}
                  </td>
                ))}
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
