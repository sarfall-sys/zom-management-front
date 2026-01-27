import api from "./api";

const categoryService = {

    async getCategory(id) {
        return await api.get(`/categories/${id}`);
    },

    async getCategories() {
        return await api.get(`/categories/`);

    },

    async createCategory(data) {
        return await api.post(`/categories`, data);

    },
    async updateCategory(id, data) {
        return await api.put(`/categories/${id}`, data);

    },

    async deleteCategory(id) {

        return await api.delete(`/categories/${id}`);
    },

}
export default categoryService;