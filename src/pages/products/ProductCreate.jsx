import { useEffect,useMemo} from "react";
import Form from "../../components/common/Form";
import { getProductFields } from "../../config/getProductFields";
import { useProducts } from "../../hooks/useProducts";
import { ToastContainer } from "react-toastify";

function ProductCreate() {
  const { updateProduct,fetchBrands,fetchSubfamilies,brands,subfamilies } = useProducts();

  useEffect(() => {
    fetchSubfamilies();
    fetchBrands();
  }, []);

  const fields = useMemo(() => getProductFields({
    subfamilies,
    brands,
  }), [subfamilies, brands]);


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
