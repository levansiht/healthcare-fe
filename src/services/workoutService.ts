import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import {
  Workout,
  CreateWorkoutRequest,
  PaginatedResponse,
  PaginationParams,
} from "@/types/api";

export const workoutService = {
  // Get user workouts
  async getWorkouts(
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Workout>> {
    return apiClient.get(API_ENDPOINTS.workouts.list, {
      params: pagination,
    });
  },

  // Get workout by ID
  async getWorkoutById(id: string): Promise<Workout> {
    return apiClient.get(`${API_ENDPOINTS.workouts.list}/${id}`);
  },

  // Create new workout
  async createWorkout(data: CreateWorkoutRequest): Promise<Workout> {
    return apiClient.post(API_ENDPOINTS.workouts.create, data);
  },

  // Update workout
  async updateWorkout(
    id: string,
    data: Partial<CreateWorkoutRequest>
  ): Promise<Workout> {
    return apiClient.put(API_ENDPOINTS.workouts.update(id), data);
  },

  // Delete workout
  async deleteWorkout(id: string): Promise<{ message: string }> {
    return apiClient.delete(API_ENDPOINTS.workouts.delete(id));
  },

  // Complete workout
  async completeWorkout(id: string): Promise<Workout> {
    return apiClient.post(`${API_ENDPOINTS.workouts.list}/${id}/complete`);
  },

  // Get workout templates
  async getTemplates(
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Workout>> {
    return apiClient.get(`${API_ENDPOINTS.workouts.list}/templates`, {
      params: pagination,
    });
  },

  // Get public workouts
  async getPublicWorkouts(
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Workout>> {
    return apiClient.get(`${API_ENDPOINTS.workouts.list}/public`, {
      params: pagination,
    });
  },

  // Clone workout
  async cloneWorkout(id: string): Promise<Workout> {
    return apiClient.post(`${API_ENDPOINTS.workouts.list}/${id}/clone`);
  },

  // Get workout statistics
  async getWorkoutStats(timeframe: "week" | "month" | "year"): Promise<{
    totalWorkouts: number;
    totalDuration: number;
    totalCalories: number;
    averageWorkoutsPerWeek: number;
    mostFrequentExercises: Array<{
      exerciseId: string;
      exerciseName: string;
      count: number;
    }>;
  }> {
    return apiClient.get(`${API_ENDPOINTS.workouts.list}/stats`, {
      params: { timeframe },
    });
  },
};
