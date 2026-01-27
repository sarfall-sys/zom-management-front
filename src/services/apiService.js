import { apiClient } from "./apiClient";
import { webClient } from "./webClient";


class ApiService {
  csrfLoaded = false;

  constructor() {
    this.apiClient = apiClient;
    this.webClient = webClient;
   // this.webApiClient = webApiClient;

    // Setup interceptors for both clients
    this.setupInterceptor(this.apiClient);
   // this.setupInterceptor(this.webApiClient);
    
    // Add request interceptor to manually inject XSRF token
    this.addXsrfTokenInjector(this.apiClient);
   // this.addXsrfTokenInjector(this.webApiClient);
  }

  // 🔑 Get XSRF token from cookie
  getXsrfToken() {
    const name = 'XSRF-TOKEN';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) {
      const token = decodeURIComponent(parts.pop().split(';').shift());
      console.log('🔑 XSRF-TOKEN found in cookie');
      return token;
    }
    
    console.warn('⚠️ XSRF-TOKEN cookie not found');
    return null;
  }

  // 💉 Inject XSRF token into request headers
  addXsrfTokenInjector(client) {
    client.interceptors.request.use(
      (config) => {
        // Only add token for state-changing methods
        const stateChanging = ['post', 'put', 'patch', 'delete'];
        
        if (stateChanging.includes(config.method.toLowerCase())) {
          const token = this.getXsrfToken();
          
          if (token) {
            config.headers['X-XSRF-TOKEN'] = token;
            console.log(`✅ ${config.method.toUpperCase()} - XSRF token injected`);
          } else {
            console.error(`❌ ${config.method.toUpperCase()} - NO XSRF token available!`);
          }
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // 🔄 Setup response interceptor for error handling
  setupInterceptor(client) {
    client.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Handle CSRF token mismatch (419)
        if (error.response?.status === 419) {
          console.warn("⚠️ CSRF 419 error - refetching token");
          this.csrfLoaded = false;
          
          const originalRequest = error.config;
          
          // Only retry once
          if (!originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
              // Force fetch new CSRF token
              await this.forceCsrfToken();
              
              // Wait for cookie to be properly set
              await new Promise(resolve => setTimeout(resolve, 300));
              
              // Retry the original request
              console.log("🔄 Retrying original request with new CSRF token");
              return client(originalRequest);
            } catch (retryError) {
              console.error("❌ Retry failed:", retryError);
              return Promise.reject(retryError);
            }
          }
        }

        // Handle unauthorized (401)
        if (error.response?.status === 401) {
          console.warn("🔒 401 Unauthorized - session expired");
          this.csrfLoaded = false;
        }

        // Handle forbidden (403)
        if (error.response?.status === 403) {
          console.warn("🚫 403 Forbidden - insufficient permissions");
        }

        return Promise.reject(error);
      }
    );
  }

  // 🔐 Force fetch CSRF cookie
  async forceCsrfToken() {
    try {
      console.log("🔄 Fetching CSRF cookie from /sanctum/csrf-cookie");
      
      await this.webClient.get("/sanctum/csrf-cookie");
      
      this.csrfLoaded = true;
      console.log("✅ CSRF cookie fetched successfully");
      
      // Verify cookie was set
      const token = this.getXsrfToken();
      if (token) {
        console.log("✅ XSRF-TOKEN verified in cookies");
      } else {
        console.error("❌ CSRF cookie fetched but token not in document.cookie");
      }
      
    } catch (error) {
      console.error("❌ Failed to fetch CSRF token:", error);
      throw error;
    }
  }

  // 🔐 Ensure CSRF token exists (only fetch if needed)
  async ensureCsrfToken() {
    if (this.csrfLoaded) {
      console.log("✅ CSRF already loaded, verifying cookie still exists...");
      
      const token = this.getXsrfToken();
      if (token) {
        console.log("✅ CSRF token still valid");
        return;
      } else {
        console.warn("⚠️ CSRF was loaded but cookie missing, refetching");
        this.csrfLoaded = false;
      }
    }
    
    await this.forceCsrfToken();
  }

  // 🔄 Reset CSRF state (useful for logout)
  resetCsrf() {
    console.log("🔄 Resetting CSRF state");
    this.csrfLoaded = false;
  }

  // ====== API Methods (with /api prefix) ======
  
  async get(url, config = {}) {
    console.log(`📥 GET: ${url}`);
    return this.apiClient.get(url, config);
  }

  async post(url, data, config = {}) {
    console.log(`📤 POST: ${url}`);
    await this.ensureCsrfToken();
    return this.apiClient.post(url, data, config);
  }

  async put(url, data, config = {}) {
    console.log(`📤 PUT: ${url}`);
    await this.ensureCsrfToken();
    return this.apiClient.put(url, data, config);
  }

  async patch(url, data, config = {}) {
    console.log(`📤 PATCH: ${url}`);
    await this.ensureCsrfToken();
    return this.apiClient.patch(url, data, config);
  }

  async delete(url, config = {}) {
    console.log(`🗑️ DELETE: ${url}`);
    await this.ensureCsrfToken();
    
    // Double-check token exists right before delete
    const token = this.getXsrfToken();
    if (!token) {
      console.error("❌ Critical: No XSRF token before DELETE!");
      throw new Error("CSRF token not available");
    }
    
    console.log("✅ CSRF token verified, proceeding with DELETE");
    return this.apiClient.delete(url, config);
  }

  // ====== Web Methods (WITHOUT /api prefix) ======
  
  async webGet(url, config = {}) {
    console.log(`📥 WEB GET: ${url}`);
    return this.webClient.get(url, config);
  }

  async webPost(url, data, config = {}) {
    console.log(`📤 WEB POST: ${url}`);
    await this.ensureCsrfToken();
    return this.webClient.post(url, data, config);
  }

  async webPut(url, data, config = {}) {
    console.log(`📤 WEB PUT: ${url}`);
    await this.ensureCsrfToken();
    return this.webClient.put(url, data, config);
  }

  async webPatch(url, data, config = {}) {
    console.log(`📤 WEB PATCH: ${url}`);
    await this.ensureCsrfToken();
    return this.webClient.patch(url, data, config);
  }

  async webDelete(url, config = {}) {
    console.log(`🗑️ WEB DELETE: ${url}`);
    await this.ensureCsrfToken();
    
    const token = this.getXsrfToken();
    if (!token) {
      throw new Error("CSRF token not available");
    }
    
    return this.webClient.delete(url, config);
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;

