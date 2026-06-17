import { useEffect, useMemo } from "react";
import Form from "../../components/common/Form";
import { getProductFields } from "../../config/getProductFields";
import { useProducts } from "../../hooks/useProducts";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProductCreate() {
  const { fetchBrands, fetchSubfamilies, brands, subfamilies, storeProduct } =
    useProducts();
  const navigate = useNavigate();
  useEffect(() => {
    fetchSubfamilies();
    fetchBrands();
  }, []);

  const fields = useMemo(
    () =>
      getProductFields({
        subfamilies,
        brands,
      }),
    [subfamilies, brands],
  );

  const handleSubmit = async (formData) => {
    await storeProduct(formData);
    navigate("/products");
  };

  return (
    <>
      <section>
        <ToastContainer />
        <Form
          fields={fields}
          initialData={{}}
          onSubmit={handleSubmit}
          isEdit={false}
        />
      </section>
    </>
  );
}

export default ProductCreate;
