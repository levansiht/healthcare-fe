import { toast } from "sonner";

export interface ToastOptions {
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

export const useToast = () => {
  const success = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action,
    });
  };

  const error = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      description: options?.description,
      duration: options?.duration || 5000,
      action: options?.action,
    });
  };

  const warning = (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action,
    });
  };

  const info = (message: string, options?: ToastOptions) => {
    toast.info(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action,
    });
  };

  const loading = (message: string) => {
    return toast.loading(message);
  };

  const dismiss = (toastId?: string | number) => {
    toast.dismiss(toastId);
  };

  const promise = <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
    }
  ) => {
    return toast.promise(promise, options);
  };

  return {
    success,
    error,
    warning,
    info,
    loading,
    dismiss,
    promise,
  };
};

// Pre-configured toast messages for common actions
export const authToasts = {
  loginSuccess: () =>
    toast.success("Đăng nhập thành công!", {
      description: "Chào mừng bạn trở lại",
    }),

  loginError: (error?: string) =>
    toast.error("Đăng nhập thất bại", {
      description: error || "Vui lòng kiểm tra thông tin đăng nhập",
    }),

  registerSuccess: () =>
    toast.success("Đăng ký thành công!", {
      description: "Vui lòng kiểm tra email để xác thực tài khoản",
    }),

  registerError: (error?: string) =>
    toast.error("Đăng ký thất bại", {
      description: error || "Vui lòng thử lại sau",
    }),

  logoutSuccess: () =>
    toast.success("Đăng xuất thành công", {
      description: "Hẹn gặp lại bạn!",
    }),

  sessionExpired: () =>
    toast.warning("Phiên đăng nhập đã hết hạn", {
      description: "Vui lòng đăng nhập lại",
      action: {
        label: "Đăng nhập",
        onClick: () => (window.location.href = "/auth/login"),
      },
    }),
};

export const apiToasts = {
  networkError: () =>
    toast.error("Lỗi kết nối", {
      description: "Không thể kết nối đến server. Vui lòng thử lại.",
    }),

  serverError: () =>
    toast.error("Lỗi server", {
      description: "Có lỗi xảy ra từ phía server. Vui lòng thử lại sau.",
    }),

  saveSuccess: () => toast.success("Lưu thành công!"),

  deleteSuccess: () => toast.success("Xóa thành công!"),

  updateSuccess: () => toast.success("Cập nhật thành công!"),
};
