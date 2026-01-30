import { useEffect,useMemo } from "react";
import { getProductFields } from "../../config/getProductFields";
import { useProducts } from "../../hooks/useProducts";
import Form from "../../components/common/Form";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loader from "../../components/common/Loader";

function ProductEdit() {
  const { id } = useParams();
  const {
    product,
    loading,
    error,
    updateProduct,
    fetchProduct,
    brands,
    fetchBrands,
    subfamilies,
    fetchSubfamilies,
  } = useProducts();

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    fetchSubfamilies();
  }, []);

  const fields = useMemo(() => {
    return getProductFields({
      subfamilies,
      brands,
    });
  }, [subfamilies, brands]);

  const handleUpdate = async (formData) => {
    await updateProduct(id, formData);
  };

  return (
    <div className="flex items-center justify-center ">
      <ToastContainer />

      <section className="container">
        {loading && <Loader />}

        {error && <p className="text-red-700">{error.message}</p>}
        <Form
          fields={fields}
          initialData={product}
          onSubmit={handleUpdate}
          isEdit={true}
        />
      </section>
    </div>
  );
}

export default ProductEdit;
