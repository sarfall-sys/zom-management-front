import api from "./api";

const catalogService = {

    async getMenu() {
        return await api.get(`/menu`);
    },

    async getSearch(searchTerm) {
        return await api.get(`/search?term=${encodeURIComponent(searchTerm)}`);
    },
    async searchProducts(query) {
        return await api.get(`/products/search?q=${encodeURIComponent(query)}`);
    },
    async getFilters() {
        return await api.get(`/filters`);
    }
}

export default catalogService;