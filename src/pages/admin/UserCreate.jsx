import { useAdmin } from "../../hooks/useAdmin";
import { useNavigate } from "react-router-dom";
function UserCreate() {
  const navigate = useNavigate();
  const { roles, createUser } = useAdmin();

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

  const handleSubmit = async (formData) => {
    await createUser(formData);
    navigate("/admin/users");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <section className="container">
        <h2 className="text-2xl font-bold text-white mb-6">Create User</h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700"
        >
          {fields.map((field) => (
            <div className="mb-5" key={field.name}>
              <label
                className="block text-gray-200 font-medium mb-2"
                htmlFor={field.name}
              >
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded focus:outline-none focus:border-indigo-500"
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded focus:outline-none focus:border-indigo-500"
                  required={field.required}
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded font-medium hover:bg-indigo-700 transition"
          >
            Create User
          </button>
        </form>
      </section>
    </div>
  );
}

export default UserCreate;
