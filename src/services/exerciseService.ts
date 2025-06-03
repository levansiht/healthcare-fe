import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import {
  Exercise,
  SearchFilters,
  PaginationParams,
  PaginatedResponse,
} from "@/types/api";

export const exerciseService = {
  // Get all exercises with pagination and filters
  async getExercises(
    filters?: SearchFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Exercise>> {
    const params = {
      ...filters,
      ...pagination,
    };
    return apiClient.get(API_ENDPOINTS.exercises.list, { params });
  },

  // Search exercises
  async searchExercises(
    query: string,
    filters?: SearchFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Exercise>> {
    const params = {
      q: query,
      ...filters,
      ...pagination,
    };
    return apiClient.get(API_ENDPOINTS.exercises.search, { params });
  },

  // Get exercise by ID
  async getExerciseById(id: string): Promise<Exercise> {
    return apiClient.get(`${API_ENDPOINTS.exercises.list}/${id}`);
  },

  // Get exercise suggestions based on user preferences
  async getExerciseSuggestions(limit?: number): Promise<Exercise[]> {
    return apiClient.get(API_ENDPOINTS.exercises.suggestions, {
      params: { limit },
    });
  },

  // Get exercises by muscle group
  async getExercisesByMuscleGroup(muscleGroup: string): Promise<Exercise[]> {
    return apiClient.get(
      `${API_ENDPOINTS.exercises.list}/muscle-group/${muscleGroup}`
    );
  },

  // Get exercises by equipment
  async getExercisesByEquipment(equipment: string): Promise<Exercise[]> {
    return apiClient.get(
      `${API_ENDPOINTS.exercises.list}/equipment/${equipment}`
    );
  },

  // Create custom exercise
  async createExercise(
    data: Omit<Exercise, "id" | "createdAt" | "updatedAt" | "createdBy">
  ): Promise<Exercise> {
    return apiClient.post(API_ENDPOINTS.exercises.list, data);
  },

  // Update exercise
  async updateExercise(id: string, data: Partial<Exercise>): Promise<Exercise> {
    return apiClient.put(`${API_ENDPOINTS.exercises.list}/${id}`, data);
  },

  // Delete exercise
  async deleteExercise(id: string): Promise<{ message: string }> {
    return apiClient.delete(`${API_ENDPOINTS.exercises.list}/${id}`);
  },

  // Get exercise categories
  async getCategories(): Promise<string[]> {
    return apiClient.get(`${API_ENDPOINTS.exercises.list}/categories`);
  },

  // Get muscle groups
  async getMuscleGroups(): Promise<string[]> {
    return apiClient.get(`${API_ENDPOINTS.exercises.list}/muscle-groups`);
  },

  // Get equipment list
  async getEquipment(): Promise<string[]> {
    return apiClient.get(`${API_ENDPOINTS.exercises.list}/equipment`);
  },
};
