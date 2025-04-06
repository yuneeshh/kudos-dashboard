import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        window.dispatchEvent(new Event("logout"));
        return Promise.reject(error);
      }
      try {
        const res = await axios.post(`${BASE_URL}/token/refresh/`, { refresh: refreshToken });

        localStorage.setItem("accessToken", res.data.access);


        error.config.headers.Authorization = `Bearer ${res.data.access}`;
        return apiClient(error.config);
      } catch (refreshError) {
        window.dispatchEvent(new Event("logout"));
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
