import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { User, CreateUserRequest, UpdateUserRequest } from "@/types/api";

export const userService = {
  async getAllUsers(): Promise<User[]> {
    return apiClient.get(API_ENDPOINTS.users.list);
  },

  async getUserById(id: number): Promise<User> {
    return apiClient.get(`${API_ENDPOINTS.users.list}/${id}`);
  },

  async createUser(data: CreateUserRequest): Promise<User> {
    return apiClient.post(API_ENDPOINTS.users.create, data);
  },

  async updateUser(data: UpdateUserRequest): Promise<User> {
    return apiClient.put(API_ENDPOINTS.users.update, data);
  },

  async deleteUser(id: number): Promise<void> {
    return apiClient.delete(API_ENDPOINTS.users.delete(id));
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    if (!data.id) {
      throw new Error("User ID is required for profile update");
    }
    return this.updateUser(data as UpdateUserRequest);
  },

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    // This would need to be implemented based on your backend
    // For now, throwing an error as the healthcare API doesn't have this endpoint
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = file;
    throw new Error("Avatar upload not implemented in healthcare API");
  },

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<{ message: string }> {
    // This would need to be implemented based on your backend
    // For now, throwing an error as the healthcare API doesn't have this endpoint
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = { currentPassword, newPassword };
    throw new Error("Change password not implemented in healthcare API");
  },
};
