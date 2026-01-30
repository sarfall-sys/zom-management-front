import apiService from "./apiService";

const roleService = {

    async getRoles() {
        const response = await apiService.get('/roles');
        return response.data;
    },
    async createRole(roleData) {
        const response = await apiService.post('/roles', roleData);
        return response.data;
    },
    async updateRole(id, roleData) {
        const response = await apiService.patch(`/roles/${id}`, roleData);
        return response.data;
    },
    async deleteRole(id) {
        const response = await apiService.delete(`/roles/${id}`);
        return response.data;
    },

}

export default roleService;