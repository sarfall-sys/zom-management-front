import api from "./api";

const bannerService = {
    
    async getBanners() {
        return await api.get('/banners');
    },
    async createBanner(bannerData) {
        return await api.post('/banners', bannerData);
    },
    async updateBanner(bannerId, bannerData) {
        return await api.put(`/banners/${bannerId}`, bannerData);
    },
    async deleteBanner(bannerId) {
        return await api.delete(`/banners/${bannerId}`);
    }
}

export default bannerService;