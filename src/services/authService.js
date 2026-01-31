import apiService from "./apiService";

class AuthService {

    async login(credentials) {
        const response = await apiService.webPost("/login", credentials);
        return response.data;
    }

    async logout() {
        const response = await apiService.webPost("/logout");
        apiService.resetCsrf();

    }

    async me() {
        return apiService.get("/user");
    }

    async register(data) {
        const response = await apiService.webPost("/register", data);
        return response.data;
    }
}

export const authService = new AuthService();


