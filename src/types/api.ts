// API Response Types
export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}

export interface ApiError {
  status: number;
  message: string;
  data?: unknown;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Healthcare API Types
export type MembershipTier = "Basic" | "Premium" | "Pro";
export type RoleEnum = "User" | "Admin";
export type MuscleGroup =
  | "Chest"
  | "Back"
  | "Shoulders"
  | "Arms"
  | "Abs"
  | "Legs"
  | "Glutes"
  | "Other";

// User Types (Healthcare API)
export interface User {
  // id: number;
  // username: string;
  // membershipTier: MembershipTier;
  id: number;
  username: string;
  email?: string;
  dateOfBirth?: Date;
  phoneNumber?: string;
  avaUrl?: string;
  membershipTier: MembershipTier;
  role: RoleEnum;
  // token: string;
}

export interface CreateUserRequest {
  username: string;
  role: RoleEnum;
  password: string;
  membershipTier?: MembershipTier;
}

export interface UpdateUserRequest {
  id: number;
  username?: string;
  role: RoleEnum;
  password?: string;
  membershipTier?: MembershipTier;
}

// Plan Types
export interface Plan {
  id: number;
  name: string;
  description: string;
  userId: number;
}

export interface CreatePlanRequest {
  name: string;
  description: string;
  userId: number;
}

export interface UpdatePlanRequest {
  id: number;
  name?: string;
  description?: string;
}

// Exercise Types (Healthcare API)
export interface Exercise {
  id: number;
  name: string;
  description: string;
  muscle: MuscleGroup; // Keep for backward compatibility
  targetMuscle1: MuscleGroup;
  targetMuscle2?: MuscleGroup;
  targetMuscle3?: MuscleGroup;
  imageUrl?: string;
}

export interface CreateExerciseRequest {
  name: string;
  description: string;
  muscle: MuscleGroup; // Keep for backward compatibility
  targetMuscle1: MuscleGroup;
  targetMuscle2?: MuscleGroup;
  targetMuscle3?: MuscleGroup;
  imageUrl?: string;
}

export interface UpdateExerciseRequest {
  id: number;
  name?: string;
  description?: string;
  muscle?: MuscleGroup; // Keep for backward compatibility
  targetMuscle1?: MuscleGroup;
  targetMuscle2?: MuscleGroup;
  targetMuscle3?: MuscleGroup;
  imageUrl?: string;
}

// Session Types
export interface Session {
  id: number;
  name: string;
  date: string;
  planId: number;
}

export interface CreateSessionRequest {
  name: string;
  date: string;
  planId: number;
}

export interface UpdateSessionRequest {
  id: number;
  name?: string;
  date?: string;
}

// Set Types
export interface Set {
  id: number;
  reps: number;
  weight: number;
  restTime: number; // seconds
  exerciseId: number;
  sessionId: number;
}

export interface CreateSetRequest {
  reps: number;
  weight: number;
  restTime: number; // seconds
  exerciseId: number;
  sessionId: number;
}

export interface UpdateSetRequest {
  id: number;
  reps?: number;
  weight?: number;
  restTime?: number; // seconds
}

// BodyTrack Types
export interface BodyTrack {
  id: number;
  weight: number; // in kg
  height: number; // in cm
  date: string;
  userId: number;
}

export interface CreateBodyTrackRequest {
  weight: number;
  height: number;
  date: string;
  userId: number;
}

export interface UpdateBodyTrackRequest {
  id: number;
  weight?: number;
  height?: number;
}

// Auth Types (for future use)
export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  // user: User;
  // accessToken: string;
  // refreshToken: string;
  // token: string;
  // expiresIn: number;
  id: number;
  username: string;
  email?: string;
  dateOfBirth?: Date;
  phoneNumber?: string;
  avaUrl?: string;
  membershipTier: MembershipTier;
  role: RoleEnum;
  token: string;
  status?: number;
  message?: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  // email: string;
  // firstName: string;
  // lastName: string;
  // dateOfBirth: string;
  // gender: "male" | "female" | "other";
  // phoneNumber?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Backward compatibility types for useApi hook
export interface CreateWorkoutRequest {
  name: string;
  description: string;
  planId: number;
  exercises: {
    exerciseId: number;
    sets: { reps: number; weight: number }[];
  }[];
}

// Additional User profile types for backward compatibility
export interface UserProfile {
  height?: number;
  weight?: number;
  activityLevel?: string;
  fitnessGoal?: string;
}

// Search and pagination types for backward compatibility
export interface SearchFilters {
  muscle?: MuscleGroup;
  [key: string]: unknown;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  [key: string]: unknown;
}
