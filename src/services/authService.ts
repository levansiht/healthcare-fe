import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  User,
  RoleEnum,
} from "@/types/api";


export const authService = {
  // Login user
 async login(credentials: LoginRequest, loginType: RoleEnum): Promise<LoginResponse> {
    try {
      const endpoint = loginType === "Admin"
        ? API_ENDPOINTS.auth.loginAdmin
        : API_ENDPOINTS.auth.login;

      const response = await apiClient.post<LoginResponse>(
        endpoint,
        credentials
      );
      console.log("Login response:", response);

      return response;
    } catch (error) {
      throw new Error(`Login failed for ${loginType}: ` + (error as Error).message);
    }
  },

  // Register new user
  async register(
    userData: RegisterRequest
  ): Promise<{ user: User; message: string }> {
    try {
      const response = await apiClient.post<{ user: User; message: string }>(
        API_ENDPOINTS.auth.register,
        userData
      );
      return response;
    } catch (error) {
      throw new Error("Registration failed: " + error);
    }
  },

  // Logout user
  async logout(): Promise<{ message: string }> {
    // For now, just return success message
    return { message: "Logged out successfully" };
  },

  // Refresh access token
  async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    return apiClient.post(API_ENDPOINTS.auth.refresh, data);
  },

  // Get current user info
  async getMe(): Promise<User> {
    return apiClient.get(API_ENDPOINTS.auth.me);
  },

  // Forgot password
  async forgotPassword(email: string): Promise<{ message: string }> {
    return apiClient.post("/auth/forgot-password", { email });
  },

  // Reset password
  async resetPassword(
    token: string,
    password: string
  ): Promise<{ message: string }> {
    return apiClient.post("/auth/reset-password", { token, password });
  },

  // Verify email
  async verifyEmail(token: string): Promise<{ message: string }> {
    return apiClient.post("/auth/verify-email", { token });
  },

  // Resend verification email
  async resendVerification(): Promise<{ message: string }> {
    return apiClient.post("/auth/resend-verification");
  },
};
