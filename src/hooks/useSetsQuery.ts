"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { setService } from "@/services/setService";
import { CreateSetRequest, UpdateSetRequest } from "@/types/api";
import { useToast } from "@/hooks/useToast";

export const setKeys = {
  all: ["sets"] as const,
  lists: () => [...setKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...setKeys.lists(), { filters }] as const,
  details: () => [...setKeys.all, "detail"] as const,
  detail: (id: number) => [...setKeys.details(), id] as const,
  bySession: (sessionId: number) =>
    [...setKeys.all, "session", sessionId] as const,
  byExercise: (exerciseId: number) =>
    [...setKeys.all, "exercise", exerciseId] as const,
};

export function useSetsQuery(sessionId?: number, exerciseId?: number) {
  return useQuery({
    queryKey: sessionId
      ? setKeys.bySession(sessionId)
      : exerciseId
      ? setKeys.byExercise(exerciseId)
      : setKeys.lists(),
    queryFn: () => setService.getAllSets(sessionId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSetQuery(id: number) {
  return useQuery({
    queryKey: setKeys.detail(id),
    queryFn: () => setService.getSetById(id),
    enabled: !!id,
  });
}

export function useCreateSetMutation() {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (data: CreateSetRequest) => setService.createSet(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: setKeys.lists() });
      success("Đã tạo set mới");
    },
    onError: (error) => {
      console.error("Error creating set:", error);
      showError("Không thể tạo set");
    },
  });
}

export function useUpdateSetMutation() {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (data: UpdateSetRequest) => setService.updateSet(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: setKeys.lists() });
      success("Đã cập nhật set");
    },
    onError: (error) => {
      console.error("Error updating set:", error);
      showError("Không thể cập nhật set");
    },
  });
}

export function useDeleteSetMutation() {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (id: number) => setService.deleteSet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: setKeys.lists() });
      success("Đã xóa set");
    },
    onError: (error) => {
      console.error("Error deleting set:", error);
      showError("Không thể xóa set");
    },
  });
}
