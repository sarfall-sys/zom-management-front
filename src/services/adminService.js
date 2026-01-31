import apiService from "./apiService";

class AdminService {

    async getUsers(params = {}) {
        const response = await apiService.get('/admin/users', { params });
        return response.data;
    }

    async getUser(id) {
        const response = await apiService.get(`/admin/users/${id}`);
        return response.data;
    }

    async createUser(userData) {
        const response = await apiService.post('/admin/users', userData);
        return response.data;
    }

    async updateUser(id, userData) {
        const response = await apiService.patch(`/admin/users/${id}`, userData);
        return response.data;
    }

    async deleteUser(id) {
        const response = await apiService.delete(`/admin/users/${id}`);
        return response.data;
    }

    async getUserStats(){
        const response = await apiService.get('/admin/users/stats');
        return response.data;
    }
    async getProductsStats(){
        const response = await apiService.get('/admin/products/stats');
        return response.data;
    }
    async getNameRoles(){
        const response = await apiService.get('/admin/roles/names');
        return response.data;
    }

    async getProductsBrandChartsData(){
        const response = await apiService.get('/admin/products/brand/chart');
        return response.data;
    }

    async getProductsSubfamilyChartsData(){
        const response = await apiService.get('/admin/products/subfamily/chart');
        return response.data;

    }

}

export const adminService = new AdminService();

