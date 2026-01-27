export const getProductFields = ({ subfamilies = [], brands = [] }) => {
  return [
    {
      name: "name",
      label: "Product Name",
      type: "text",
      required: true,
      placeholder: "Enter product name"
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      placeholder: "product-slug"
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      required: true,
      placeholder: "Stock Keeping Unit"
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      rows: 4,
      placeholder: "Product description"
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      required: true,
      step: "0.01",
      min: "0"
    },
    {
      name:"sale_price",
      label:"Sale Price",
      type:"number",
      required:false,
      step:"0.01",
      min:"0"

    },
        {
      name: "is_active",
      label: "Is Active",
      type: "checkbox",
      required: false
    },

    {
      name:"is_on_sale",
      label:"Is On Sale",
      type:"checkbox",
      required:false
    },
    {
      name: "subfamily_id",
      label: "Subfamily",
      type: "select",
      required: true,
      options: subfamilies
    },
    {
      name: "brand_id",
      label: "Brand",
      type: "select",
      required: false,
      options: brands
    },
    

    
  ];
};
