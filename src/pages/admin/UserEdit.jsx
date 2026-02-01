import { useAdmin } from "../../hooks/useAdmin";
import Loader from "../../components/common/Loader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function UserEdit() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { user, fetchUserById, updateUser, loading, error, fetchRoles, roles } =
    useAdmin();

  useEffect(() => {
    fetchUserById(id);
  }, [id]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role_id: user.role_id || "",
      });
    }
  }, [user]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    await updateUser(id, formData);
    // Optionally, navigate back to the user list or show a success message
    navigate("/admin/users");
  };

  const fields = [
    { name: "name", label: "Name", type: "text", required: true },
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
    <div className="flex items-center justify-center min-h-screen bg-bg-light dark:bg-bg-dark">
      <section className="container">
        {loading && <Loader />}

        {error && <p className="text-red-400">{error.message}</p>}
        {/*Customized user form*/}
        <div className="">
          <form
            onSubmit={handleUpdate}
            className="max-w-md p-6 mx-auto border border-gray-600 rounded shadow bg-bg-light dark:bg-bg-dark dark:border-border-dark"
          >
            {fields.map((field) => (
              <div className="mb-4" key={field.name}>
                <label
                  className="block mb-2 font-medium text-text-light dark:text-text-dark"
                  htmlFor={field.name}
                >
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <div className="p-4 border border-gray-600 rounded">
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      className="w-full p-2 border border-gray-600 rounded bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark"
                      required={field.required}
                      onChange={handleChange}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    className="w-full p-2 border border-gray-600 rounded bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark"
                    required={field.required}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
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
