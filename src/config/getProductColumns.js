export const getProductColumns = () => {
  return [
    { key: "name", label: "Product Name" },
    { key: "sku", label: "SKU" },
    { key: "slug", label: "Slug" },
    { key: "is_active", label: "Is Active" },
    { key: "is_on_sale", label: "Is On Sale" },
    { key: "price", label: "Price" },
    { key: "sale_price", label: "Sale Price" }, 
    { key: "subfamily_name", label: "Subfamily" },
    { key: "brand_name", label: "Brand" },
  ];
}