import React, { useEffect } from "react";
import Form from "../../components/common/Form";
import { getBrandFields } from "../../config/getBrandFields";
import { useBrands } from "../../hooks/useBrands";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function BrandCreate() {
  const { countries, storeBrand, fetchCountries } = useBrands();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries();
  }, []);

  const fields = getBrandFields({ countries });

  const handleSubmit = async (formData) => {

    try{
      await storeBrand(formData);

    }finally {
      navigate("/brands");
    }
  }
  return (
    <>
      <ToastContainer />
      <Form
        fields={fields}
        initialData={{}}
        onSubmit={handleSubmit}
        isEdit={false}
      />
    </>
  );
}

export default BrandCreate;
