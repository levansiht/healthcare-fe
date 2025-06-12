"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bodyTrackService } from "@/services/bodyTrackService";
import { CreateBodyTrackRequest, UpdateBodyTrackRequest } from "@/types/api";
import { useToast } from "@/hooks/useToast";

export const bodyTrackKeys = {
  all: ["bodytracks"] as const,
  list: (filters: Record<string, unknown>) =>
    [...bodyTrackKeys.all, "list", filters] as const,
  detail: (id: number) => [...bodyTrackKeys.all, "detail", id] as const,
};

export const useBodyTracksQuery = () => {
  return useQuery({
    queryKey: bodyTrackKeys.list({}),
    queryFn: () => bodyTrackService.getAllBodyTracks(),
  });
};

export const useBodyTrackQuery = (id: number) => {
  return useQuery({
    queryKey: bodyTrackKeys.detail(id),
    queryFn: () => bodyTrackService.getBodyTrackById(id),
    enabled: !!id,
  });
};

export const useBodyTracksByUserQuery = (userId: number) => {
  return useQuery({
    queryKey: bodyTrackKeys.list({ userId }),
    queryFn: () => bodyTrackService.getBodyTracksByUser(userId),
    enabled: !!userId,
  });
};

export const useCreateBodyTrackMutation = () => {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (data: CreateBodyTrackRequest) =>
      bodyTrackService.createBodyTrack(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bodyTrackKeys.all });
      success("Đã tạo bản ghi thể trạng mới");
    },
    onError: (error) => {
      console.error("Error creating body track:", error);
      showError("Không thể tạo bản ghi thể trạng");
    },
  });
};

export const useUpdateBodyTrackMutation = () => {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (data: UpdateBodyTrackRequest) =>
      bodyTrackService.updateBodyTrack(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bodyTrackKeys.all });
      success("Đã cập nhật bản ghi thể trạng");
    },
    onError: (error) => {
      console.error("Error updating body track:", error);
      showError("Không thể cập nhật bản ghi thể trạng");
    },
  });
};

export const useDeleteBodyTrackMutation = () => {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  return useMutation({
    mutationFn: (id: number) => bodyTrackService.deleteBodyTrack(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bodyTrackKeys.all });
      success("Đã xóa bản ghi thể trạng");
    },
    onError: (error) => {
      console.error("Error deleting body track:", error);
      showError("Không thể xóa bản ghi thể trạng");
    },
  });
};
