import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBrands } from "../../hooks/useBrands";
import { getBrandFields } from "../../config/getBrandFields";
import Form from "../../components/common/Form";
import Loader from "../../components/common/Loader";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function BrandEdit() {
  const { id } = useParams();
  const {
    brand,
    loading,
    error,
    fetchBrand,
    updateBrand,
    countries,
    fetchCountries,
  } = useBrands();
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchBrand(id);
  }, [id]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fields = getBrandFields({ countries });

  const handleUpdate = async (formData) => {
    await updateBrand(id, formData);
    navigate("/brands");
  };

  return (
    <div className="flex items-center justify-center ">
      <ToastContainer />

      <section className="container">
        {loading && <Loader />}

        {error && <p className="text-red-700">{error.message}</p>}
        <Form
          fields={fields}
          initialData={brand}
          onSubmit={handleUpdate}
          isEdit={true}
        />
      </section>
    </div>
  );
}

export default BrandEdit;
