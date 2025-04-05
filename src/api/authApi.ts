import apiClient from "@/utils/api";

interface LoginResponse {
  access: string;
  refresh: string;
}

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/token/", { username, password });
  localStorage.setItem("accessToken", response.data.access);
  localStorage.setItem("refreshToken", response.data.refresh);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
