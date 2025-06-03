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
    // Healthcare API might not have auth endpoints - this is a placeholder
    // In a real implementation, this would make an API call
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = credentials;
    throw new Error("Authentication not implemented in healthcare API");
  },

  // Register new user
  async register(
    userData: RegisterRequest
  ): Promise<{ user: User; message: string }> {
    // Healthcare API might not have auth endpoints - this is a placeholder
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = userData;
    throw new Error("Registration not implemented in healthcare API");
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
