
import apiService from "./apiService"
const subfamilyService = {

    async getSubfamily(id) {
        return await apiService.get(`/subfamilies/${id}`)
    },

    async getSubfamilies() {
        return await apiService.get(`/subfamilies`)
    },

    async getSubfamiliesNames() {
        return await apiService.get(`/subfamily-names`)
    },

    async createSubfamily(data) {
        return await apiService.post(`/subfamilies/`, data)

    },
    async updateSubfamily(id, data) {
        return await apiService.patch(`/subfamilies/${id}`, data)

    },

    async deleteSubfamily(id) {
        return await apiService.delete(`/subfamilies/${id}`)
    },
    async getSubfamilyNames() {

      const  response = await apiService.get('/subfamily-names');
      return response.data;
    }
}
export default subfamilyService;