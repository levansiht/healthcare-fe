"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { exerciseService } from "@/services/exerciseService";
import {
  CreateExerciseRequest,
  UpdateExerciseRequest,
  MuscleGroup,
} from "@/types/api";
import { useToast } from "@/hooks/useToast";

export const exerciseKeys = {
  all: ["exercises"] as const,
  lists: () => [...exerciseKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...exerciseKeys.lists(), { filters }] as const,
  details: () => [...exerciseKeys.all, "detail"] as const,
  detail: (id: number) => [...exerciseKeys.details(), id] as const,
  byMuscle: (muscle: MuscleGroup) =>
    [...exerciseKeys.all, "muscle", muscle] as const,
};

export function useExercisesQuery(muscle?: MuscleGroup) {
  return useQuery({
    queryKey: muscle ? exerciseKeys.byMuscle(muscle) : exerciseKeys.lists(),
    queryFn: () => exerciseService.getAllExercises(muscle),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useExerciseQuery(id: number) {
  return useQuery({
    queryKey: exerciseKeys.detail(id),
    queryFn: () => exerciseService.getExerciseById(id),
    enabled: !!id,
  });
}

export function useCreateExerciseMutation() {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (data: CreateExerciseRequest) =>
      exerciseService.createExercise(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exerciseKeys.lists() });
      success("Đã tạo bài tập mới");
    },
    onError: (error) => {
      console.error("Error creating exercise:", error);
      showError("Không thể tạo bài tập");
    },
  });
}

export function useUpdateExerciseMutation() {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (data: UpdateExerciseRequest) =>
      exerciseService.updateExercise(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: exerciseKeys.lists() });
      if (variables.id) {
        queryClient.invalidateQueries({
          queryKey: exerciseKeys.detail(variables.id),
        });
      }
      success("Đã cập nhật bài tập");
    },
    onError: (error) => {
      console.error("Error updating exercise:", error);
      showError("Không thể cập nhật bài tập");
    },
  });
}

export function useDeleteExerciseMutation() {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (id: number) => exerciseService.deleteExercise(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exerciseKeys.lists() });
      success("Đã xóa bài tập");
    },
    onError: (error) => {
      console.error("Error deleting exercise:", error);
      showError("Không thể xóa bài tập");
    },
  });
}
