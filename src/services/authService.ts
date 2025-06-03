import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  User,
} from "@/types/api";

export const authService = {
  // Login user
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return apiClient.post(API_ENDPOINTS.auth.login, credentials);
  },

  // Register new user
  async register(
    userData: RegisterRequest
  ): Promise<{ user: User; message: string }> {
    return apiClient.post(API_ENDPOINTS.auth.register, userData);
  },

  // Logout user
  async logout(): Promise<{ message: string }> {
    return apiClient.post(API_ENDPOINTS.auth.logout);
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
