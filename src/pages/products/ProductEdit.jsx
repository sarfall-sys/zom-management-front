import { useEffect } from "react";
import { useSubfamilies } from "../../hooks/useSubfamilies";
import { useBrands } from "../../hooks/useBrands";
import { getProductFields } from "../../config/getProductFields";
import { useProducts } from "../../hooks/useProducts";
import Form from "../../components/common/Form";
import { useParams } from "react-router-dom";
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

  const fields = getProductFields({
    subfamilies: subfamiliesNames,
    brands: brandNames,
  });

  console.log("Editing Product:", product);
  const handleUpdate = async (formData) => {
    await updateProduct(id, formData);
    console.log("Form Data Updated: ", formData);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product</p>;
  if (!product) return null;

  return (
    <>
      <section>
        <Form
          fields={fields}
          initialData={product}
          onSubmit={handleUpdate}
          isEdit={true}
        />
      </section>
    </>
  );
}

export default ProductEdit;
