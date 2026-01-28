import { use, useEffect } from "react";
import { useSubfamilies } from "../../hooks/useSubfamilies";
import { useBrands } from "../../hooks/useBrands";
import { getProductFields } from "../../config/getProductFields";
import { useProducts } from "../../hooks/useProducts";
import Form from "../../components/common/Form";
import { useParams } from "react-router-dom";
import { useBrands } from "../../hooks/useBrands";
import { ToastContainer } from "react-toastify";

function ProductEdit() {
  const { id } = useParams();
  const { product, loading, error, updateProduct, fetchProduct } =
    useProducts();

  const { subfamiliesNames, fetchSubfamilyNames } = useSubfamilies();

  const { brandNames, fetchBrandNames } = useBrands();

  useEffect(() => {
    fetchSubfamilyNames();
    fetchBrandNames();
  }, [fetchSubfamilyNames, fetchBrandNames]);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [fetchProduct, id]);

  useEffect(() => {
    fetchBrandNames();
    fetchSubfamilyNames();
  }, []);

  const fields = getProductFields({
    subfamilies: subfamiliesNames,
    brands: brandNames,
  });

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
