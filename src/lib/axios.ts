import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  details?: unknown;
};
