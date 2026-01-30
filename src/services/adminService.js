import apiService from "./apiService";

class AdminService {

    async getUsers(params = {}) {
        const response = await apiClient.webGet('/admin/users', { params });
        return response.data;
    }

    async getUser(id) {
        const response = await apiClient.webGet(`/admin/users/${id}`);
        return response.data;
    }

    async createUser(userData) {
        const response = await apiClient.webPost('/admin/users', userData);
        return response.data;
    }

    async updateUser(id, userData) {
        const response = await apiClient.webPatch(`/admin/users/${id}`, userData);
        return response.data;
    }

    async deleteUser(id) {
        const response = await apiClient.webDelete(`/admin/users/${id}`);
        return response.data;
    }

}

export const adminService = new AdminService();

