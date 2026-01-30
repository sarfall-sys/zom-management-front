import apiService from "./apiService";

const productService = {

    async getProduct(id) {

        const response = await apiService.get(`/products/${id}`)

        return response.data;
    },

    async getProducts(params = {}) {

        const response = await apiService.get(`/products`, { params });
        return response.data;
    },
    async createProduct(data) {
        
        const response = await apiService.post('/products', data);
        return response.data;
    },

    async updateProduct(id, data) {
        const response = await apiService.put(`/products/${id}`, data);
        return response.data;
    },

    async deleteProduct(id) {
        const response = await apiService.delete(`/products/${id}`);
        return response.data;
    },
}

export default productService;
