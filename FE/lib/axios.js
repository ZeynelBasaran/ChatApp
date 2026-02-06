import axios from 'axios';

//API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';


console.log("de",API_BASE_URL)

// Endpointler
export const API_ENDPOINTS = {
  RECIPES: "/recipes",
};

// 2. Özel Axios Örneğini Oluştur
const apiFactory = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // İstek zaman aşımı (10 saniye)
});

// 3. İstek Interceptor'ı (Token Ekleme Mekanizması)
apiFactory.interceptors.request.use(
  (config) => {
    // --- Token'ı Alma Mantığı ---
    let token = null;
    
    // Client-side (tarayıcı) ortamında
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('authToken');
    }
    // Server-side için token config'den geliyorsa kullan
    // Server component'lerde token'ı config ile geçirebilirsiniz
    if (config.token) {
      token = config.token;
    }

    if (token) {
      // Authorization başlığına token'ı ekle
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Config'den token'ı temizle (axios'a göndermemek için)
    delete config.token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 4. Yanıt Interceptor'ı (Hata Yönetimi)
apiFactory.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 401 (Yetkisiz) hatası durumunda yönlendirme
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        // Token'ı temizle
        localStorage.removeItem('authToken');
        // Login sayfasına yönlendir (isteğe bağlı)
        // window.location.href = '/login';
      }
    }

    // 403 (Yasak) hatası
    if (error.response?.status === 403) {
      console.error("Forbidden: You don't have permission to access this resource");
    }

    // 404 (Bulunamadı) hatası
    if (error.response?.status === 404) {
      console.error("Not Found: The requested resource was not found");
    }

    // 500 (Sunucu Hatası) hatası
    if (error.response?.status >= 500) {
      console.error("Server Error: Internal server error");
    }

    return Promise.reject(error);
  }
);

export default apiFactory;
