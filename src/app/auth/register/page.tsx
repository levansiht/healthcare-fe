"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Heart, Shield, Users, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp!");
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      alert("Vui lòng đồng ý với điều khoản sử dụng!");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Handle register logic here
    console.log("Register data:", formData);
    setIsLoading(false);

    // Redirect to verification page or login
    router.push("/auth/login");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength <= 2) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number) => {
    if (strength <= 2) return "Yếu";
    if (strength <= 3) return "Trung bình";
    return "Mạnh";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Registration Form */}
        <div className="flex items-center justify-center order-2 lg:order-1">
          <Card className="w-full max-w-md border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-4 text-center pb-6">
              <div className="mx-auto p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl w-fit lg:hidden">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Tạo tài khoản
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Bắt đầu hành trình chăm sóc sức khỏe của bạn
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Họ
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Nguyễn"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Tên
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Văn A"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@healthcare.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Mật khẩu
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Tạo mật khẩu mạnh"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Độ mạnh mật khẩu:</span>
                        <span
                          className={cn(
                            "font-medium",
                            passwordStrength(formData.password) <= 2
                              ? "text-red-600"
                              : passwordStrength(formData.password) <= 3
                              ? "text-yellow-600"
                              : "text-green-600"
                          )}
                        >
                          {getStrengthText(passwordStrength(formData.password))}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={cn(
                            "h-2 rounded-full transition-all duration-300",
                            getStrengthColor(
                              passwordStrength(formData.password)
                            )
                          )}
                          style={{
                            width: `${
                              (passwordStrength(formData.password) / 5) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    Xác nhận mật khẩu
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className={cn(
                        "h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg pr-12",
                        formData.confirmPassword &&
                          formData.password !== formData.confirmPassword &&
                          "border-red-300 focus:border-red-500 focus:ring-red-500"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-red-600">
                        Mật khẩu không khớp
                      </p>
                    )}
                  {formData.confirmPassword &&
                    formData.password === formData.confirmPassword && (
                      <div className="flex items-center space-x-1 text-xs text-green-600">
                        <CheckCircle className="w-3 h-3" />
                        <span>Mật khẩu khớp</span>
                      </div>
                    )}
                </div>

                <div className="space-y-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      required
                    />
                    <span className="text-sm text-gray-600 leading-relaxed">
                      Tôi đồng ý với{" "}
                      <Link
                        href="/terms"
                        className="text-green-600 hover:text-green-700 font-medium transition-colors"
                      >
                        Điều khoản sử dụng
                      </Link>{" "}
                      và{" "}
                      <Link
                        href="/privacy"
                        className="text-green-600 hover:text-green-700 font-medium transition-colors"
                      >
                        Chính sách bảo mật
                      </Link>
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  className={cn(
                    "w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]",
                    isLoading && "opacity-70"
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang tạo tài khoản...</span>
                    </div>
                  ) : (
                    "Tạo tài khoản"
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Hoặc đăng ký với
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 border-gray-300 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 border-gray-300 hover:bg-gray-50"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Đã có tài khoản?{" "}
                  <Link
                    href="/auth/login"
                    className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                  >
                    Đăng nhập ngay
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 px-8 order-1 lg:order-2">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                HealthCare<span className="text-green-600">Pro</span>
              </h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Bắt đầu hành trình của bạn!
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Tham gia cộng đồng hàng triệu người dùng đang cải thiện sức khỏe
                và chất lượng cuộc sống.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Miễn phí mãi mãi
                  </h3>
                  <p className="text-sm text-gray-600">
                    Tất cả tính năng cơ bản hoàn toàn miễn phí
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Bảo mật tuyệt đối
                  </h3>
                  <p className="text-sm text-gray-600">
                    Dữ liệu cá nhân được bảo vệ tối đa
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Hỗ trợ 24/7</h3>
                  <p className="text-sm text-gray-600">
                    Đội ngũ chuyên gia luôn sẵn sàng hỗ trợ
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  1,000+ người dùng mới hôm nay
                </span>
              </div>
              <p className="text-sm text-gray-600">
                &quot;Ứng dụng tuyệt vời giúp tôi theo dõi sức khỏe hiệu quả và
                đạt được mục tiêu fitness!&quot;
              </p>
              <p className="text-xs text-gray-500 mt-2">
                - Nguyễn Thị Hoa, 28 tuổi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
