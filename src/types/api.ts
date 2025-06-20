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
export enum MuscleEnum {
  QUADS = "Quads",
  HAMSTRING = "Hamstring",
  CALVES = "Calves",
  GLUTES = "Glutes",
  BACK = "Back",
  CHEST = "Chest",
  SHOULDERS = "Shoulders",
  TRICEPS = "Triceps",
  BICEPS = "Biceps",
  TRAPS = "Traps",
}

export type MuscleGroup = MuscleEnum;

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

export interface SessionTodayResponse {
    id: number;
    weight: number;
    reps: number;
    restTime: number;
    name: string;
    imageUrl: string;
    targetMuscle1: string;
    targetMuscle2: string;
    targetMuscle3: string | null;
}

// Extended interface for UI display
export interface SessionTodayDisplay {
    id: number;
    time: string;
    plan: string;
    exercises: string[];
    completed: boolean;
    duration: number;
    sets: SessionTodayResponse[];
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
    muscle: MuscleGroup;
    targetMuscle1: string;
    targetMuscle2: string;
    targetMuscle3: string | null;
    imageUrl?: string;
}

export interface CreateExerciseRequest {
    name: string;
    description: string;
    targetMuscle1: string;
    targetMuscle2?: string;
    targetMuscle3?: string;
    imageUrl?: string;
}

export interface UpdateExerciseRequest {
    id: number;
    name?: string;
    description?: string;
    muscle?: MuscleGroup;
    targetMuscle1?: string | null;
    targetMuscle2?: string | null;
    targetMuscle3?: string | null;
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
    name?: string;
    date: string;
    planId: number;
}

export interface UpdateSessionRequest {
    id: number;
    name?: string;
    date?: string;
}

// Training Volume Type
export interface TrainingVolumeData {
    date: string;
    volume: number;
}

// Set Types
export interface Set {
    id: number;
    reps: number;
    weight: number;
    restTime: number;
    exerciseId: number;
    sessionId: number;
}

export interface CreateSetRequest {
    reps: number;
    weight: number;
    restTime?: number; // Optional field for rest time
    exerciseId: number;
    sessionId: number;
}

export interface UpdateSetRequest {
    id: number;
    reps?: number;
    weight?: number;
    restTime?: number;
    exerciseId?: number;
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
