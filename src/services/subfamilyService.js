import api from "./apiService"
const subfamilyService = {

    async getSubfamily(id) {
        return await api.get(`/subfamilies/${id}`)
    },

    async getSubfamilies() {
        return await api.get(`/subfamilies`)
    },

    async createSubfamily(data) {
        return await api.post(`/subfamilies/`, data)

    },
    async updateSubfamily(id, data) {
        return await api.put(`/subfamilies/${id}`, data)

    },

    async deleteSubfamily(id) {
        return await api.delete(`/subfamilies/${id}`)
    },
    async getSubfamilyNames() {
        return await api.get('/subfamily-names');
    }
}
export default subfamilyService;