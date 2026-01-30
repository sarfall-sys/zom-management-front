import { useState, useEffect } from "react";

function Form({ fields, initialData = {}, onSubmit, isEdit }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      const filtered = fields.reduce((acc, field) => {
        acc[field.name] = initialData[field.name] ?? "";
        return acc;
      }, {});
      setFormData(filtered);
    }
  }, [initialData, fields]);

  const handleChange = (e) => {
    const { name, value, type, checked  } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = fields.reduce((acc, field) => {
      acc[field.name] = formData[field.name];
      return acc;
    }, {});

    onSubmit(payload);
  };

  return (
    <section className="max-w-md">
      <h1 className="mb-4 text-2xl font-bold text-text-light dark:text-text-dark">
        {isEdit ? "Edit Product" : "Create Product"}
      </h1>
      <form
        className="space-y-4 border rounded bg-bg-light dark:bg-bg-dark border-border-light dark:border-border-dark"
        onSubmit={handleSubmit}
      >
        <div className="p-4 space-y-4 ">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                className="block mb-1 ml-0 font-medium text-text-light dark:text-text-dark" 
                htmlFor={field.name}
              >
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full p-2 border rounded border-border-light dark:border-border-dark text-text-light"
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  className="w-full p-2 border rounded text-text-light border-border-dark dark:border-border-light"
                  value={formData[field.name] ?? ""}
                  onChange={handleChange}

                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="text-text-light dark:text-text-light"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                <input
                  id={field.name}
                  name={field.name}
                  type="checkbox"
                  checked={formData[field.name] || false}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={
                    formData[field.name] ||
                    (field.type === "checkbox" ? false : "")
                  }
                  onChange={handleChange}
                  required={field.required}
                  step={field.step}
                  min={field.min}
                  className="w-full p-2 border border-gray-300 rounded text-text-light"
                />
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="px-4 py-2 font-semibold rounded text-text-light dark:text-text-dark bg-primary-light dark:bg-primary-dark"
        >
          {isEdit ? "Update " : "Create "}
        </button>
      </form>
    </section>
  );
}

export default Form;
