import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { User, UserProfile, ProgressStats } from "@/types/api";

export const userService = {
  // Get user profile
  async getProfile(): Promise<User> {
    return apiClient.get(API_ENDPOINTS.users.profile);
  },

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    return apiClient.put(API_ENDPOINTS.users.updateProfile, data);
  },

  // Update user fitness profile
  async updateFitnessProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    return apiClient.put("/users/fitness-profile", data);
  },

  // Upload avatar
  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    return apiClient.upload("/users/avatar", file);
  },

  // Change password
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<{ message: string }> {
    return apiClient.post("/users/change-password", {
      currentPassword,
      newPassword,
    });
  },

  // Delete account
  async deleteAccount(password: string): Promise<{ message: string }> {
    return apiClient.delete("/users/account", {
      data: { password },
    });
  },

  // Get user statistics
  async getStats(): Promise<ProgressStats> {
    return apiClient.get("/users/stats");
  },
};
