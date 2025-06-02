export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
  },
  users: {
    profile: '/users/profile',
    updateProfile: '/users/profile',
  },
  workouts: {
    list: '/workouts',
    create: '/workouts',
    update: (id: string) => `/workouts/${id}`,
    delete: (id: string) => `/workouts/${id}`,
  },
  exercises: {
    list: '/exercises',
    search: '/exercises/search',
    suggestions: '/exercises/suggestions',
  },
  schedules: {
    list: '/schedules',
    create: '/schedules',
    update: (id: string) => `/schedules/${id}`,
    delete: (id: string) => `/schedules/${id}`,
  },
} as const;

export const FITNESS_GOALS = {
  lose_weight: {
    label: 'Giảm cân',
    description: 'Tập trung vào đốt cháy calo và giảm cân',
    icon: '🔥',
    color: 'text-red-600',
  },
  gain_muscle: {
    label: 'Tăng cơ',
    description: 'Xây dựng khối lượng cơ bắp',
    icon: '💪',
    color: 'text-blue-600',
  },
  maintain: {
    label: 'Duy trì',
    description: 'Duy trì cân nặng và thể hình hiện tại',
    icon: '⚖️',
    color: 'text-green-600',
  },
  improve_endurance: {
    label: 'Tăng sức bền',
    description: 'Cải thiện sức bền tim mạch',
    icon: '🏃',
    color: 'text-purple-600',
  },
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth-token',
  USER_PREFERENCES: 'user-preferences',
  WORKOUT_DRAFT: 'workout-draft',
} as const;
