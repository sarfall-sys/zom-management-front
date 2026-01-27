import api from "./apiService";

const productService = {

    async getProduct(id) {

        return await api.get(`/api/products/${id}`)
    },

    async getProducts(params = null) {

        const config = params ? { params } : {};

        return await api.get(`/api/products`, config);
    },
    async createProduct(data) {
        return await api.post('/api/products', data);
    },

    async updateProduct(id, data) {

        return await api.put(`/api/products/${id}`, data);
    },

    async deleteProduct(id) {

        return await api.delete(`/api/products/${id}`)
    },

}

export default productService;
