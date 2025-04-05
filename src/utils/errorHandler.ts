import { AxiosError } from "axios";
import { showToast } from "@/components/Toast";

export const handleApiError = (error: unknown) => {
  const axiosError = error as AxiosError<{ detail?: string }>;
  if (!axiosError.response) {
    showToast.error("Unable to reach the server. Please check your connection.");
  } else if (axiosError.response.status === 500) {
    showToast.error("Something went wrong on the server. Please try again later.");
  } else if (axiosError.response.data?.detail) {
    showToast.error(axiosError.response.data.detail);
  } else {
    showToast.error("An unexpected error occurred. Please try again.");
  }
};
