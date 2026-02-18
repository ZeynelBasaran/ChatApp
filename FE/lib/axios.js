import axios from "axios";

//Production or dev mode
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined");
}

// Endpointler
export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REGISTER: "/auth/register",
  REFRESH_TOKEN: "/auth/refresh-token",
};

// 2. Özel Axios Örneğini Oluştur
const apiFactory = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

apiFactory.interceptors.request.use(
  (config) => {
    process.env.NODE_ENV === "development" &&
      console.log("Outgoing Request:", config.baseURL + config.url)

    return config;
  },
  (error) => Promise.reject(error),
);

// 4. Yanıt Interceptor'ı (Hata Yönetimi)
apiFactory.interceptors.response.use(
  (response) => response,
  async (error) => {
    /*
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }p
    }

    */

    if (error.response?.status === 403) {
      console.error(
        "Forbidden: You don't have permission to access this resource",
      );
    }

    if (error.response?.status === 404) {
      console.error("Not Found: The requested resource was not found");
    }

    if (error.response?.status >= 500) {
      console.error("Server Error: Internal server error");
    }

    return Promise.reject(error);
  },
);

export default apiFactory;
