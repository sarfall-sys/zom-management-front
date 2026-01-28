import apiService from "./apiService";

class AdminService {

    async getAllUsers(params = {}) {
        const response = await apiService.get("/admin/users",{ params });
        return response.data;
    }
    async getUserById(userId) {
        const response = await apiService.get(`/admin/users/${userId}`);
        return response.data;
    }
    async createUser(userData) {
        const response = await apiService.webPost("/admin/users", userData);
        return response.data;
    }
    async deleteUser(userId) {
        const response = await apiService.webDelete(`/admin/users/${userId}`);
        return response.data;
    }   
    async updateUserRole(userId, role) {
        const response = await apiService.webPut(`/admin/users/${userId}/role`, { role });
        return response.data;
    }
}

export const adminService = new AdminService();