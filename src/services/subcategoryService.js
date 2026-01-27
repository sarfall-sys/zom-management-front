import api from "./api";
const subcategoryService = {

    async getSubcategory(id) {
        return await api.get(`/subcategories/${id}`)

    },

    async getSubcategories() {
        return await api.get(`/subcategories`)

    },

    async createSubcategory(data) {
        return await api.get(`/subcategories`, data)

    },
    async updateSubcategory(id, data) {
        return await api.put(`/subcategories/${id}`, data)

    },

    async deleteSubcategory(id) {
        return await api.delete(`/subcategories/${id}`)

    }
}
export default subcategoryService;