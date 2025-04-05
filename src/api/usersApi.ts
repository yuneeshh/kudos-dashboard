import apiClient from "@/utils/api";

export const fetchUsers = async () => {
  try {
    const response = await apiClient.get("/users/");
    return response.data; // Assuming API returns an array of users
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};


export const getCurrentUser = async () => {
    const response = await apiClient.get("/user/me/"); // Adjust endpoint as needed
    return response.data;
  };
  