"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { planService } from "@/services/planService";
import { CreatePlanRequest, UpdatePlanRequest } from "@/types/api";
import { useToast } from "@/hooks/useToast";

export const planKeys = {
  all: ["plans"] as const,
  lists: () => [...planKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...planKeys.lists(), { filters }] as const,
  details: () => [...planKeys.all, "detail"] as const,
  detail: (id: number) => [...planKeys.details(), id] as const,
  byUser: (userId: number) => [...planKeys.all, "user", userId] as const,
};

export function usePlansQuery(userId?: number) {
  return useQuery({
    queryKey: userId ? planKeys.byUser(userId) : planKeys.lists(),
    queryFn: () => planService.getAllPlans(userId),
    staleTime: 5 * 60 * 1000, 
  });
}

export function usePlanQuery(id: number) {
  return useQuery({
    queryKey: planKeys.detail(id),
    queryFn: () => planService.getPlanById(id),
    enabled: !!id,
  });
}

export function useCreatePlanMutation() {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (data: CreatePlanRequest) => planService.createPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: planKeys.lists() });
      success("Đã tạo kế hoạch mới");
    },
    onError: (error) => {
      console.error("Error creating plan:", error);
      showError("Không thể tạo kế hoạch");
    },
  });
}

export function useUpdatePlanMutation() {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (data: UpdatePlanRequest) => planService.updatePlan(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: planKeys.lists() });
      if (variables.id) {
        queryClient.invalidateQueries({
          queryKey: planKeys.detail(variables.id),
        });
      }
      success("Đã cập nhật kế hoạch");
    },
    onError: (error) => {
      console.error("Error updating plan:", error);
      showError("Không thể cập nhật kế hoạch");
    },
  });
}

export function useDeletePlanMutation() {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (id: number) => planService.deletePlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: planKeys.lists() });
      success("Đã xóa kế hoạch");
    },
    onError: (error) => {
      console.error("Error deleting plan:", error);
      showError("Không thể xóa kế hoạch");
    },
  });
}
