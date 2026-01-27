import api from "./api"
const familyService = {

    async getFamily(id) {
        return await api.get(`/families/${id}`)
    },
    async getFamilies() {
        return await api.get(`/families}`)

    },

    async createFamily(data) {
        return await api.post(`/families/`,data)
    },
    async updateFamily(id, data) {
        return await api.put(`/families/${id}`,data)

    },

    async deleteFamily(id) {
        return await api.delete(`/families/${id}`)

    }
}
export default familyService;