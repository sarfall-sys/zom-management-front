import { useEffect } from "react";
import Form from "../../components/common/Form";
import { useSubfamilies } from "../../hooks/useSubfamilies";
import { useBrands } from "../../hooks/useBrands";
import { getProductFields } from "../../config/getProductFields";
import { useProducts } from "../../hooks/useProducts";
import { ToastContainer } from "react-toastify";

function ProductCreate() {
  const { storeProduct } = useProducts();

  const { subfamiliesNames, fetchSubfamilyNames } = useSubfamilies();

  const { brandNames, fetchBrandNames } = useBrands();

  useEffect(() => {
    fetchSubfamilyNames();
    fetchBrandNames();
  }, []);

  const fields = getProductFields({
    subfamilies: subfamiliesNames,
    brands: brandNames,
  });

  const handleSubmit = async (formData) => {
    await storeProduct(formData);
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
