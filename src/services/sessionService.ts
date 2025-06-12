import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import {
  Session,
  CreateSessionRequest,
  UpdateSessionRequest,
} from "@/types/api";

export const sessionService = {
  // Get all sessions
  async getAllSessions(planId?: number): Promise<Session[]> {
    const params = planId ? { planId } : {};
    return apiClient.get(API_ENDPOINTS.sessions.list, { params });
  },

  // Get session by ID
  async getSessionById(id: number): Promise<Session> {
    return apiClient.get(`${API_ENDPOINTS.sessions.list}/${id}`);
  },

  // Get sessions by user ID
  async getSessionsByUser(userId: number): Promise<Session[]> {
    return apiClient.get(API_ENDPOINTS.sessions.list, {
      params: { userId },
    });
  },
  // Create session
  async createSession(data: CreateSessionRequest): Promise<Session> {
    return apiClient.post(API_ENDPOINTS.sessions.create, data);
  },

  // Update session
  async updateSession(data: UpdateSessionRequest): Promise<Session> {
    return apiClient.put(API_ENDPOINTS.sessions.update, data);
  },

  // Delete session
  async deleteSession(id: number): Promise<void> {
    return apiClient.delete(API_ENDPOINTS.sessions.delete(id));
  },

  // Get sessions by plan
  async getSessionsByPlan(planId: number): Promise<Session[]> {
    return apiClient.get(API_ENDPOINTS.sessions.list, {
      params: { planId },
    });
  },
};
