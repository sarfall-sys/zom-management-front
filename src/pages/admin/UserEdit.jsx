import { useAdmin } from "../../hooks/useAdmin";
import Loader from "../../components/common/Loader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function UserEdit() {
  const { user, roles , fetchUserById, updateUser, loading, error , } = useAdmin();

  const { id } = useParams();

  useEffect(() => {
    fetchUserById(id);
  }, [id]);

  const handleUpdate = async (formData) => {
    await updateUser(id, formData);
  };

  const fields = [
    { name: "username", label: "Username", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },

    {
      name: "role_id",
      label: "Role",
      type: "select",
      options: roles,
      required: true,
    },
  ];


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <section className="container">
        {loading && <Loader />}

        {error && <p className="text-red-400">{error.message}</p>}
        {/*Customized user form*/}
        <div className="">
          <form
            onSubmit={handleUpdate}
            className="max-w-md mx-auto bg-gray-800 p-6 rounded shadow"
          >
            {fields.map((field) => (
              <div className="mb-4" key={field.name}>
                <label
                  className="block text-gray-300 mb-2"
                  htmlFor={field.name}
                >
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    defaultValue={user ? user[field.name] : ""}
                    className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded"
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    defaultValue={user ? user[field.name] : ""}
                    className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded"
                    required={field.required}
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Update User
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default UserEdit;
