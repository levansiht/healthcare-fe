import { useState, useCallback } from "react";
import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { exerciseService } from "@/services/exerciseService";
import { workoutService } from "@/services/workoutService";
import { authUtils } from "@/lib/axios";
import { authToasts, apiToasts } from "@/hooks/useToast";
import {
    LoginRequest,
    RegisterRequest,
    User,
    CreateWorkoutRequest,
    RoleEnum,
} from "@/types/api";

const getErrorMessage = (error: unknown, fallback: string): string => {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === "object" && error !== null && "message" in error) {
        return String((error as { message: unknown }).message);
    }
    return fallback;
};

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

     const login = useCallback(async (credentials: LoginRequest, loginType: RoleEnum = "User") => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login(credentials, loginType);
            await authUtils.setTokens(response.token);
            await authUtils.setRoleUser(response.role);
            
            setUser(response); // Assuming LoginResponse is compatible with User

            authToasts.loginSuccess();
            return response;
        } catch (err: unknown) {
            const errorMessage = getErrorMessage(err, `Đăng nhập ${loginType === "Admin" ? "Admin " : ""}thất bại`);
            console.error(`Login error (${loginType}):`, errorMessage);
            setError(errorMessage);
            authToasts.loginError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (userData: RegisterRequest) => {
        setLoading(true);
        setError(null);

        try {
            console.log("Registering user:", userData);
            
            const response = await authService.register(userData);
            authToasts.registerSuccess();
            return response;
        } catch (err: unknown) {
            const errorMessage = getErrorMessage(err, "Đăng ký thất bại");
            setError(errorMessage);
            authToasts.registerError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setLoading(true);

        try {
            await authService.logout();
            authToasts.logoutSuccess();
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            authUtils.clearTokens();
            setUser(null);
            setLoading(false);
        }
    }, []);

    const getMe = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const userData = await authService.getMe();
            setUser(userData);
            return userData;
        } catch (err: unknown) {
            const errorMessage = getErrorMessage(
                err,
                "Không thể lấy thông tin người dùng"
            );
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        user,
        loading,
        error,
        login,
        register,
        logout,
        getMe,
        isAuthenticated: authUtils.isAuthenticated(),
    };
}

export function useUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProfile = useCallback(async (data: Partial<User>) => {
        setLoading(true);
        setError(null);

        try {
            const updatedUser = await userService.updateProfile(data);
            apiToasts.updateSuccess();
            return updatedUser;
        } catch (err: unknown) {
            const errorMessage = getErrorMessage(
                err,
                "Cập nhật thông tin thất bại"
            );
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadAvatar = useCallback(async (file: File) => {
        setLoading(true);
        setError(null);

        try {
            const response = await userService.uploadAvatar(file);
            apiToasts.saveSuccess();
            return response;
        } catch (err: unknown) {
            const errorMessage = getErrorMessage(err, "Tải ảnh lên thất bại");
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const changePassword = useCallback(
        async (currentPassword: string, newPassword: string) => {
            setLoading(true);
            setError(null);

            try {
                const response = await userService.changePassword(
                    currentPassword,
                    newPassword
                );
                apiToasts.updateSuccess();
                return response;
            } catch (err: unknown) {
                const errorMessage = getErrorMessage(
                    err,
                    "Đổi mật khẩu thất bại"
                );
                setError(errorMessage);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return {
        loading,
        error,
        updateProfile,
        uploadAvatar,
        changePassword,
    };
}

export function useExercises() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getExercises = useCallback(
        async (
            filters?: Record<string, unknown>,
            pagination?: Record<string, unknown>
        ) => {
            setLoading(true);
            setError(null);

            try {
                const response = await exerciseService.getExercises(
                    filters,
                    pagination
                );
                return response;
            } catch (err: unknown) {
                const errorMessage = getErrorMessage(
                    err,
                    "Không thể tải danh sách bài tập"
                );
                setError(errorMessage);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const searchExercises = useCallback(
        async (
            query: string,
            filters?: Record<string, unknown>,
            pagination?: Record<string, unknown>
        ) => {
            setLoading(true);
            setError(null);

            try {
                const response = await exerciseService.searchExercises(
                    query,
                    filters,
                    pagination
                );
                return response;
            } catch (err: unknown) {
                const errorMessage = getErrorMessage(err, "Tìm kiếm thất bại");
                setError(errorMessage);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return {
        loading,
        error,
        getExercises,
        searchExercises,
    };
}

export function useWorkouts() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getWorkouts = useCallback(
        async (pagination?: Record<string, unknown>) => {
            setLoading(true);
            setError(null);

            try {
                const response = await workoutService.getWorkouts(pagination);
                return response;
            } catch (err: unknown) {
                const errorMessage = getErrorMessage(
                    err,
                    "Không thể tải danh sách bài tập"
                );
                setError(errorMessage);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const createWorkout = useCallback(async (data: CreateWorkoutRequest) => {
        setLoading(true);
        setError(null);

        try {
            const response = await workoutService.createWorkout(data);
            apiToasts.saveSuccess();
            return response;
        } catch (err: unknown) {
            const errorMessage = getErrorMessage(err, "Tạo bài tập thất bại");
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateWorkout = useCallback(
        async (id: string, data: Partial<CreateWorkoutRequest>) => {
            setLoading(true);
            setError(null);

            try {
                const response = await workoutService.updateWorkout(
                    parseInt(id),
                    data
                );
                apiToasts.updateSuccess();
                return response;
            } catch (err: unknown) {
                const errorMessage = getErrorMessage(
                    err,
                    "Cập nhật bài tập thất bại"
                );
                setError(errorMessage);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const deleteWorkout = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await workoutService.deleteWorkout(parseInt(id));
            apiToasts.deleteSuccess();
            return response;
        } catch (err: unknown) {
            const errorMessage = getErrorMessage(err, "Xóa bài tập thất bại");
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        getWorkouts,
        createWorkout,
        updateWorkout,
        deleteWorkout,
    };
}

export function useApi<T = unknown>() {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (apiCall: () => Promise<T>) => {
        setLoading(true);
        setError(null);

        try {
            const result = await apiCall();
            setData(result);
            return result;
        } catch (err: unknown) {
            const errorMessage = getErrorMessage(err, "Đã xảy ra lỗi");
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
    }, []);

    return {
        data,
        loading,
        error,
        execute,
        reset,
    };
}
