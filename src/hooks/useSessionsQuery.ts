"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sessionService } from "@/services/sessionService";
import { CreateSessionRequest, UpdateSessionRequest } from "@/types/api";
import { useToast } from "@/hooks/useToast";

export const sessionKeys = {
  all: ["sessions"] as const,
  lists: () => [...sessionKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...sessionKeys.lists(), { filters }] as const,
  details: () => [...sessionKeys.all, "detail"] as const,
  detail: (id: number) => [...sessionKeys.details(), id] as const,
  byPlan: (planId: number) => [...sessionKeys.all, "plan", planId] as const,
};

export function useSessionsQuery(planId?: number) {
  return useQuery({
    queryKey: planId ? sessionKeys.byPlan(planId) : sessionKeys.lists(),
    queryFn: () => sessionService.getAllSessions(planId),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSessionQuery(id: number) {
  return useQuery({
    queryKey: sessionKeys.detail(id),
    queryFn: () => sessionService.getSessionById(id),
    enabled: !!id,
  });
}

export function useSessionsByUserQuery(userId: number) {
  return useQuery({
    queryKey: sessionKeys.list({ userId }),
    queryFn: () => sessionService.getSessionsByUser(userId),
    enabled: !!userId,
  });
}

export function useCreateSessionMutation() {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (data: CreateSessionRequest) =>
      sessionService.createSession(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });
      success("Đã tạo phiên tập mới");
    },
    onError: (error) => {
      console.error("Error creating session:", error);
      showError("Không thể tạo phiên tập");
    },
  });
}

export function useUpdateSessionMutation() {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (data: UpdateSessionRequest) =>
      sessionService.updateSession(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });
      if (variables.id) {
        queryClient.invalidateQueries({
          queryKey: sessionKeys.detail(variables.id),
        });
      }
      success("Đã cập nhật phiên tập");
    },
    onError: (error) => {
      console.error("Error updating session:", error);
      showError("Không thể cập nhật phiên tập");
    },
  });
}

export function useDeleteSessionMutation() {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (id: number) => sessionService.deleteSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });
      success("Đã xóa phiên tập");
    },
    onError: (error) => {
      console.error("Error deleting session:", error);
      showError("Không thể xóa phiên tập");
    },
  });
}
