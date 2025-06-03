// API Response Types
export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
  details?: unknown;
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

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  phoneNumber?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  phoneNumber?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  profile?: UserProfile;
}

export interface UserProfile {
  height: number; // cm
  weight: number; // kg
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active";
  fitnessGoal: "lose_weight" | "gain_muscle" | "maintain" | "improve_endurance";
  targetWeight?: number;
  medicalConditions?: string[];
  allergies?: string[];
}

// Exercise Types
export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: string;
  muscleGroups: string[];
  equipment: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  instructions: string[];
  images: string[];
  videos?: string[];
  calories_per_minute: number;
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseSet {
  id: string;
  exerciseId: string;
  reps?: number;
  weight?: number;
  duration?: number; // seconds
  distance?: number; // meters
  calories?: number;
  restTime?: number; // seconds
  notes?: string;
}

// Workout Types
export interface Workout {
  id: string;
  name: string;
  description?: string;
  date: string;
  duration: number; // minutes
  totalCalories: number;
  exercises: WorkoutExercise[];
  notes?: string;
  isTemplate: boolean;
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutExercise {
  id: string;
  exercise: Exercise;
  sets: ExerciseSet[];
  order: number;
  notes?: string;
}

export interface CreateWorkoutRequest {
  name: string;
  description?: string;
  date: string;
  exercises: {
    exerciseId: string;
    sets: Omit<ExerciseSet, "id" | "exerciseId">[];
    order: number;
    notes?: string;
  }[];
  notes?: string;
  isTemplate?: boolean;
  isPublic?: boolean;
}

// Plan Types
export interface Plan {
  id: string;
  name: string;
  description: string;
  duration: number; // weeks
  difficulty: "beginner" | "intermediate" | "advanced";
  goal: "lose_weight" | "gain_muscle" | "maintain" | "improve_endurance";
  workouts: PlanWorkout[];
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlanWorkout {
  id: string;
  workout: Workout;
  day: number; // 1-7 (Monday to Sunday)
  week: number;
  isCompleted: boolean;
  completedAt?: string;
}

// Body Tracking Types
export interface BodyMeasurement {
  id: string;
  userId: string;
  date: string;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  waterPercentage?: number;
  measurements: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
    neck?: number;
  };
  photos?: string[];
  notes?: string;
  createdAt: string;
}

export interface CreateBodyMeasurementRequest {
  date: string;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  waterPercentage?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
    neck?: number;
  };
  photos?: File[];
  notes?: string;
}

// Progress Types
export interface ProgressStats {
  weightChange: {
    current: number;
    previous: number;
    change: number;
    changePercentage: number;
  };
  workoutStats: {
    totalWorkouts: number;
    totalDuration: number;
    totalCalories: number;
    averageWorkoutsPerWeek: number;
  };
  strengthProgress: {
    exerciseProgress: {
      exerciseId: string;
      exerciseName: string;
      maxWeight: number;
      weightChange: number;
      volumeChange: number;
    }[];
  };
  bodyComposition: {
    bodyFatChange: number;
    muscleMassChange: number;
  };
}

// Schedule Types
export interface Schedule {
  id: string;
  title: string;
  type: "workout" | "meal" | "measurement" | "appointment";
  date: string;
  time: string;
  duration?: number;
  description?: string;
  workoutId?: string;
  isCompleted: boolean;
  reminder?: {
    enabled: boolean;
    minutesBefore: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateScheduleRequest {
  title: string;
  type: "workout" | "meal" | "measurement" | "appointment";
  date: string;
  time: string;
  duration?: number;
  description?: string;
  workoutId?: string;
  reminder?: {
    enabled: boolean;
    minutesBefore: number;
  };
}

// Search and Filter Types
export interface SearchFilters {
  query?: string;
  category?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  muscleGroups?: string[];
  equipment?: string[];
  duration?: {
    min?: number;
    max?: number;
  };
  calories?: {
    min?: number;
    max?: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// File Upload Types
export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}
