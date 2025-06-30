import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
} from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface ApiResponse<T = unknown> {
  status_code: number;
  message: string;
  payload?: T;
}

export interface ValidationErrorPayload {
  name?: string;
  email?: string;
  password?: string;
  [key: string]: string | undefined;
}

export interface ErrorResponseData {
  message?: string;
  payload?: ValidationErrorPayload | unknown;
  [key: string]: unknown;
}

export interface ApiError {
  code: number;
  message: string;
  payload?: ValidationErrorPayload | unknown;
}

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<ErrorResponseData>) => {
        const apiError: ApiError = {
          code: error.response?.status || 0,
          message: "An error occurred",
          payload: undefined,
        };

        if (error.response?.data) {
          const responseData = error.response.data;

          apiError.message =
            responseData.message || error.message || "An error occurred";

          if (responseData.payload) {
            apiError.payload = responseData.payload;
          }
        } else if (!error.response) {
          apiError.message = "Network error. Please check your connection.";
        } else {
          apiError.message = error.message || "An error occurred";
        }

        return Promise.reject(apiError);
      }
    );
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint);
    return response.data;
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, data);
    return response.data;
  }

  async postWithFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, data);
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint);
    return response.data;
  }

  setAuthToken(token: string) {
    this.axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  removeAuthToken() {
    delete this.axiosInstance.defaults.headers.common["Authorization"];
  }
}

export const apiService = new ApiService();
