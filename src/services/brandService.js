import apiService from "./apiService";

const brandService = {

    async getBrands(params = {}) {
        const response = await apiService.get('/brands', { params });
        return response.data
    }
    ,
    async createBrand(brandData) {
        const response = await apiService.post('/brands', brandData);
        return response.data;
    },
    async updateBrand(id, brandData) {
        const response = await apiService.patch(`/brands/${id}`, brandData);
        return response.data;
    },
    async deleteBrand(id) {
        const response = await apiService.delete(`/brands/${id}`);
        return response.data;
    },
    async getBrand(id) {
        const response = await apiService.get(`/brands/${id}`);
        return response.data;
    },
    async getBrandNames() {
        const response = await apiService.get('/brand-names');
        return response.data;

    },
    async getCountries() {
        const response = await apiService.get('/countries');
        return response.data;
    },
}

export default brandService;