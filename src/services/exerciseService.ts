import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import {
  Exercise,
  CreateExerciseRequest,
  UpdateExerciseRequest,
  MuscleGroup,
} from "@/types/api";

export const exerciseService = {
  // Get all exercises
  async getAllExercises(muscle?: MuscleGroup): Promise<Exercise[]> {
    const params = muscle ? { muscle } : {};
    return apiClient.get(API_ENDPOINTS.exercises.list, { params });
  },

  // Get exercise by ID
  async getExerciseById(id: number): Promise<Exercise> {
    return apiClient.get(`${API_ENDPOINTS.exercises.list}/${id}`);
  },

  // Create exercise
  async createExercise(data: CreateExerciseRequest): Promise<Exercise> {
    return apiClient.post(API_ENDPOINTS.exercises.create, data);
  },

  // Update exercise
  async updateExercise(data: UpdateExerciseRequest): Promise<Exercise> {
    return apiClient.put(API_ENDPOINTS.exercises.update, data);
  },

  // Delete exercise
  async deleteExercise(id: number): Promise<void> {
    return apiClient.delete(API_ENDPOINTS.exercises.delete(id));
  },

  // Get exercises by muscle group
  async getExercisesByMuscleGroup(muscle: MuscleGroup): Promise<Exercise[]> {
    return apiClient.get(API_ENDPOINTS.exercises.list, {
      params: { muscle },
    });
  },

  // Backward compatibility methods for useApi.ts hook
  async getExercises(
    filters?: Record<string, unknown>,
    pagination?: Record<string, unknown>
  ): Promise<Exercise[]> {
    const params = { ...filters, ...pagination };
    return apiClient.get(API_ENDPOINTS.exercises.list, { params });
  },

  async searchExercises(
    query: string,
    filters?: Record<string, unknown>,
    pagination?: Record<string, unknown>
  ): Promise<Exercise[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = pagination;
    const params = { search: query, ...filters };
    return apiClient.get(API_ENDPOINTS.exercises.list, { params });
  },
};
