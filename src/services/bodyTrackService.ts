import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import {
  BodyTrack,
  CreateBodyTrackRequest,
  UpdateBodyTrackRequest,
} from "@/types/api";

export const bodyTrackService = {
  // Get all body tracks
  async getAllBodyTracks(userId?: number): Promise<BodyTrack[]> {
    const params = userId ? { userId } : {};
    return apiClient.get(API_ENDPOINTS.bodyTracks.list, { params });
  },

  // Get body track by ID
  async getBodyTrackById(id: number): Promise<BodyTrack> {
    return apiClient.get(`${API_ENDPOINTS.bodyTracks.list}/${id}`);
  },

  // Create body track
  async createBodyTrack(data: CreateBodyTrackRequest): Promise<BodyTrack> {
    return apiClient.post(API_ENDPOINTS.bodyTracks.create, data);
  },

  // Update body track
  async updateBodyTrack(data: UpdateBodyTrackRequest): Promise<BodyTrack> {
    return apiClient.put(API_ENDPOINTS.bodyTracks.update, data);
  },

  // Delete body track
  async deleteBodyTrack(id: number): Promise<void> {
    return apiClient.delete(API_ENDPOINTS.bodyTracks.delete(id));
  },

  // Get body tracks by user
  async getBodyTracksByUser(userId: number): Promise<BodyTrack[]> {
    return apiClient.get(API_ENDPOINTS.bodyTracks.list, {
      params: { userId },
    });
  },

  // Get latest body track for user
  async getLatestBodyTrack(userId: number): Promise<BodyTrack | null> {
    const tracks = await this.getBodyTracksByUser(userId);
    if (tracks.length === 0) return null;

    tracks.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return tracks[0];
  },
};
