import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

declare module "axios" {
  interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: Date;
    };
    _retry?: boolean;
  }
}
import { API_BASE_URL, STORAGE_KEYS } from "./constants";

interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

interface ApiError {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
}

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth tokn if available
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }    

    config.metadata = { startTime: new Date() };

    if (process.env.NODE_ENV === "development") {
      console.log(
        `🚀 [API Request] ${config.method?.toUpperCase()} ${config.url}`,
        {
          params: config.params,
          data: config.data,
        }
      );
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("❌ [Request Error]", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const config = response.config as InternalAxiosRequestConfig;
    const duration = config.metadata?.startTime
      ? new Date().getTime() - config.metadata.startTime.getTime()
      : 0;

    if (process.env.NODE_ENV === "development") {
      console.log(
        `✅ [API Response] ${response.config.method?.toUpperCase()} ${
          response.config.url
        } (${duration}ms)`,
        response.data
      );
    }

    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (process.env.NODE_ENV === "development") {
      console.error(
        `❌ [API Error] ${originalRequest?.method?.toUpperCase()} ${
          originalRequest?.url
        }`,
        {
          status: error.response?.status,
          data: error.response?.data,
        }
      );
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          const response = await refreshAuthToken(refreshToken);
          const newToken = response.data.accessToken;

          setAuthToken(newToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }

          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        clearAuthData();
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      }
    }

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Đã xảy ra lỗi không xác định";

    const customError = {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
      originalError: error,
    };

    return Promise.reject(customError);
  }
);

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
}

function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh-token");
}

function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
}

function clearAuthData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem("refresh-token");
  localStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
}

async function refreshAuthToken(refreshToken: string) {
  return axios.post(`${API_BASE_URL}/auth/refresh`, {
    refreshToken,
  });
}

export const apiClient = {
  async request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    const response = await api.request(config);
    return response.data?.data !== undefined
      ? response.data.data
      : response.data;
  },

  // GET request
  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.get(url, config);

    if (process.env.NODE_ENV === "development") {
      console.log(`🔍 [API GET] ${url}:`, {
        status: response.status,
        data: response.data,
        hasDataProperty: response.data?.data !== undefined,
      });
    }

    // Handle both direct data and wrapped data responses
    return response.data?.data !== undefined
      ? response.data.data
      : response.data;
  },

  // POST request
  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await api.post(url, data, config);
    // Handle both direct data and wrapped data responses
    return response.data?.data !== undefined
      ? response.data.data
      : response.data;
  },

  // PUT request
  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await api.put(url, data, config);
    // Handle both direct data and wrapped data responses
    return response.data?.data !== undefined
      ? response.data.data
      : response.data;
  },

  // PATCH request
  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await api.patch(url, data, config);
    // Handle both direct data and wrapped data responses
    return response.data?.data !== undefined
      ? response.data.data
      : response.data;
  },

  // DELETE request
  async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await api.delete(url, config);
    // Handle both direct data and wrapped data responses
    return response.data?.data !== undefined
      ? response.data.data
      : response.data;
  },

  async upload<T = unknown>(
    url: string,
    file: File | FormData,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const formData = file instanceof FormData ? file : new FormData();
    if (file instanceof File) {
      formData.append("file", file);
    }

    const response = await api.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config?.headers,
      },
    });
    return response.data.data;
  },

  async download(
    url: string,
    filename?: string,
    config?: AxiosRequestConfig
  ): Promise<void> {
    const response = await api.get(url, {
      ...config,
      responseType: "blob",
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  },
};

export const authUtils = {
  async setTokens(accessToken: string): Promise<void> {
    setAuthToken(accessToken);
    // if (typeof window !== "undefined") {
    //   localStorage.setItem("refresh-token", refreshToken);
    // }        
     if (typeof window !== "undefined") {
      try {
        const { setAuthCookieAction } = await import('@/actions/authActions'); 
        const result = await setAuthCookieAction(accessToken);
        if (!result.success) {
          console.error("Failed to set auth cookie via Server Action:", result.message);
        }
      } catch (e) {
        console.error("Error invoking setAuthCookieAction:", e);
      }
    }
  },
  async setRoleUser(role: string): Promise<void> {
    if (typeof window !== "undefined") {
      try {
        const { setRoleUserCookieAction } = await import('@/actions/authActions'); 
        const result = await setRoleUserCookieAction(role);
        if (!result.success) {
          console.error("Failed to set role cookie via Server Action:", result.message);
        }
      } catch (e) {
        console.error("Error invoking setRoleUserCookieAction:", e);
      }
    }
  },

  async clearTokens(): Promise<void> {
    clearAuthData();
    if (typeof window !== "undefined") {
      try {
        const { clearAuthCookieAction } = await import('@/actions/authActions');
        await clearAuthCookieAction();
      } catch (e) {
        console.error("Error invoking clearAuthData:", e);
      }
    }
  },

  getToken(): string | null {
    return getAuthToken();
  },

  isAuthenticated(): boolean {
    return !!getAuthToken();
  },
};

export default api;
export { api };
