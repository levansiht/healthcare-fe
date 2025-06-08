"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { CreateUserRequest, UpdateUserRequest } from "@/types/api";
import { useToast } from "@/hooks/useToast";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

export function useUsersQuery() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: () => userService.getAllUsers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUserQuery(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
  });
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (data: CreateUserRequest) => userService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      success("Người dùng đã được tạo thành công");
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      showError("Không thể tạo người dùng");
    },
  });
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => userService.updateUser(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      if (variables.id) {
        queryClient.invalidateQueries({
          queryKey: userKeys.detail(variables.id),
        });
      }
      success("Người dùng đã được cập nhật thành công");
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      showError("Không thể cập nhật người dùng");
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      success("Người dùng đã được xóa thành công");
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
      showError("Không thể xóa người dùng");
    },
  });
}
