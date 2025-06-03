import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { Set, CreateSetRequest, UpdateSetRequest } from "@/types/api";

export const setService = {
  // Get all sets
  async getAllSets(sessionId?: number): Promise<Set[]> {
    const params = sessionId ? { sessionId } : {};
    return apiClient.get(API_ENDPOINTS.sets.list, { params });
  },

  // Get set by ID
  async getSetById(id: number): Promise<Set> {
    return apiClient.get(`${API_ENDPOINTS.sets.list}/${id}`);
  },

  // Create set
  async createSet(data: CreateSetRequest): Promise<Set> {
    return apiClient.post(API_ENDPOINTS.sets.create, data);
  },

  // Update set
  async updateSet(data: UpdateSetRequest): Promise<Set> {
    return apiClient.put(API_ENDPOINTS.sets.update, data);
  },

  // Delete set
  async deleteSet(id: number): Promise<void> {
    return apiClient.delete(API_ENDPOINTS.sets.delete(id));
  },

  // Get sets by session
  async getSetsBySession(sessionId: number): Promise<Set[]> {
    return apiClient.get(API_ENDPOINTS.sets.list, {
      params: { sessionId },
    });
  },
};
