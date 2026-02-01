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
      [name]: name === "role_id" ? Number(value) : value,
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
      type: "radio",
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
        <h2 className="mb-6 text-2xl font-bold text-text-light dark:text-text-dark">
          Edit User
        </h2>

          <form
            onSubmit={handleUpdate}
            className="max-w-md p-6 mx-auto bg-gray-800 border border-gray-700 rounded shadow"
          >
            {fields.map((field) => (
              <div className="mb-4" key={field.name}>
                <label
                  className="block mb-2 font-medium text-gray-200"
                  htmlFor={field.name}
                >
                  {field.label}
                </label>
                {field.type === "radio" ? (
                  <div className="flex flex-wrap gap-2">
                    {field.options.map((option, index) => (
                      <label
                        key={option.id}
                        className={`flex items-center gap-2 px-4 py-2 border border-gray-600 rounded cursor-pointer hover:bg-indigo-900 ${index === 0 ? "bg-green-900" : index === 1 ? "bg-red-900" : "bg-yellow-900"}`}
                      >
                        <input
                          type="radio"
                          name={field.name}
                          value={option.id}
                          checked={formData[field.name] === option.id}
                          onChange={handleChange}
                          required={field.required}
                        />
                        <span className="text-gray-200">{option.name}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    className="w-full p-2 text-gray-200 bg-gray-700 border border-gray-600 rounded"
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
        
      </section>
    </div>
  );
}

export default UserEdit;
