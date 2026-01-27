export const getBrandFields = ({countries = []}) => {
    return [
        {
            name: "name",
            label: "Brand Name",
            type: "text",
            required: true,
            placeholder: "Enter brand name"
        },
        {
            name: "slug",
            label: "Slug",
            type: "text",
            required: true,
            placeholder: "brand-slug"
        },
        {
            name: "description",
            label: "Description",
            type: "textarea",
            rows: 4,
            placeholder: "Brand description"
        },
        {
            name: "country_id",
            label: "Country",
            type: "select",
            required: false,
            options: countries  
        }           
    ];
}       