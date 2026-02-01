import { useAdmin } from "../../hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";

function UserCreate() {
  const navigate = useNavigate();
  const { roles, loading, error, createUser, fetchRoles } = useAdmin();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role_id: null,
  });

  const handleSubmit = async (formData) => {
    await createUser(formData);
    navigate("/admin/users");
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fields = [
    { name: "username", label: "Username", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },

    {
      name: "role_id",
      label: "Role",
      type: "radio",
      options: roles,
      required: true,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "role_id" ? Number(value) : value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-light dark:bg-bg-dark">
      <section className="container">

        {error && <p className="text-red-400">{error.message}</p>}
        <h2 className="mb-6 text-2xl font-bold text-text-light dark:text-text-dark">
          Create User
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-md p-6 mx-auto border border-gray-600 rounded shadow bg-bg-light dark:bg-bg-dark dark:border-border-dark"
        >
          {fields.map((field) => (
            <div className="mb-5" key={field.name}>
              <label
                className="block mb-2 font-medium text-text-light dark:text-text-dark"
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
                        checked={formData.role_id === option.id}
                        onChange={handleChange}
                        required={field.required}
                      />
                      <span className="text-text-light dark:text-text-dark">
                        {option.name}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-600 rounded bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark"
                  required={field.required}
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white transition bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Create User
          </button>
        </form>
      </section>
    </div>
  );
}

export default UserCreate;
