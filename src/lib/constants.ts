export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
  // Auth endpoints (placeholder - healthcare API may not have these)
  auth: {
    // login: "/auth/login",
    // register: "/auth/register",
    login: "/client/login",
    loginAdmin: "/admin/login",

    register: "/client/signup",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
  },
  // User endpoints
  users: {
    list: "/user",
    create: "/user",
    update: "/user",
    delete: (id: number) => `/user/${id}`,
  },
  // Plan endpoints
  plans: {
    list: "/plan",
    create: "/plan",
    update: "/plan",
    delete: (id: number) => `/plan/${id}`,
  },
  // Exercise endpoints
  exercises: {
    list: "/exercise",
    create: "/exercise",
    update: "/exercise",
    delete: (id: number) => `/exercise/${id}`,
  },
  // Session endpoints
  sessions: {
    list: "/session",
    create: "/session",
    update: "/session",
    delete: (id: number) => `/session/${id}`,
  },
  // Set endpoints
  sets: {
    list: "/set",
    create: "/set",
    update: "/set",
    delete: (id: number) => `/set/${id}`,
  },
  // BodyTrack endpoints
  bodyTracks: {
    list: "/bodytrack",
    create: "/bodytrack",
    update: "/bodytrack",
    delete: (id: number) => `/bodytrack/${id}`,
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
  ADVANCE: "Advance",
  HIGH: "High",
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
