
const roleService = {

    async getRoles() {
        const response = await apiService.get('/roles');
        return response.data
    },

}