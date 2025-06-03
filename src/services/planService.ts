import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { Plan, CreatePlanRequest, UpdatePlanRequest } from "@/types/api";

export const planService = {
  async getAllPlans(userId?: number): Promise<Plan[]> {
    const params = userId ? { userId } : {};
    return apiClient.get(API_ENDPOINTS.plans.list, { params });
  },

  async getPlanById(id: number): Promise<Plan> {
    return apiClient.get(`${API_ENDPOINTS.plans.list}/${id}`);
  },

  async createPlan(data: CreatePlanRequest): Promise<Plan> {
    return apiClient.post(API_ENDPOINTS.plans.create, data);
  },

  async updatePlan(data: UpdatePlanRequest): Promise<Plan> {
    return apiClient.put(API_ENDPOINTS.plans.update, data);
  },

  async deletePlan(id: number): Promise<void> {
    return apiClient.delete(API_ENDPOINTS.plans.delete(id));
  },

  async getPlansByUser(userId: number): Promise<Plan[]> {
    return apiClient.get(API_ENDPOINTS.plans.list, {
      params: { userId },
    });
  },
};
