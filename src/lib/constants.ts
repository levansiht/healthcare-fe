export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
  // Auth endpoints (placeholder - healthcare API may not have these)
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    logout: "/api/auth/logout",
    refresh: "/api/auth/refresh",
    me: "/api/auth/me",
  },
  // User endpoints
  users: {
    list: "/api/users",
    create: "/api/users",
    update: "/api/users",
    delete: (id: number) => `/api/users/${id}`,
  },
  // Plan endpoints
  plans: {
    list: "/api/plans",
    create: "/api/plans",
    update: "/api/plans",
    delete: (id: number) => `/api/plans/${id}`,
  },
  // Exercise endpoints
  exercises: {
    list: "/api/exercises",
    create: "/api/exercises",
    update: "/api/exercises",
    delete: (id: number) => `/api/exercises/${id}`,
  },
  // Session endpoints
  sessions: {
    list: "/api/sessions",
    create: "/api/sessions",
    update: "/api/sessions",
    delete: (id: number) => `/api/sessions/${id}`,
  },
  // Set endpoints
  sets: {
    list: "/api/sets",
    create: "/api/sets",
    update: "/api/sets",
    delete: (id: number) => `/api/sets/${id}`,
  },
  // BodyTrack endpoints
  bodyTracks: {
    list: "/api/bodytracks",
    create: "/api/bodytracks",
    update: "/api/bodytracks",
    delete: (id: number) => `/api/bodytracks/${id}`,
  },
} as const;

export const FITNESS_GOALS = {
  lose_weight: {
    label: "Giảm cân",
    description: "Tập trung vào đốt cháy calo và giảm cân",
    icon: "🔥",
    color: "text-red-600",
  },
  gain_muscle: {
    label: "Tăng cơ",
    description: "Xây dựng khối lượng cơ bắp",
    icon: "💪",
    color: "text-blue-600",
  },
  maintain: {
    label: "Duy trì",
    description: "Duy trì cân nặng và thể hình hiện tại",
    icon: "⚖️",
    color: "text-green-600",
  },
  improve_endurance: {
    label: "Tăng sức bền",
    description: "Cải thiện sức bền tim mạch",
    icon: "🏃",
    color: "text-purple-600",
  },
} as const;

// Enums from backend API
export const MEMBERSHIP_TIERS = {
  BASIC: "Basic",
  PREMIUM: "Premium",
  PRO: "Pro",
} as const;

export const MUSCLE_GROUPS = {
  CHEST: "Chest",
  BACK: "Back",
  SHOULDERS: "Shoulders",
  ARMS: "Arms",
  ABS: "Abs",
  LEGS: "Legs",
  GLUTES: "Glutes",
  OTHER: "Other",
} as const;

export type MembershipTier =
  (typeof MEMBERSHIP_TIERS)[keyof typeof MEMBERSHIP_TIERS];
export type MuscleGroup = (typeof MUSCLE_GROUPS)[keyof typeof MUSCLE_GROUPS];

export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth-token",
  REFRESH_TOKEN: "refresh-token",
  USER_PREFERENCES: "user-preferences",
} as const;
