"use client";

import { useState } from "react";
import Link from "next/link";
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
import { ArrowLeft, Mail, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Reset password for:", email);
    setIsLoading(false);
    setIsEmailSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

      <div className="w-full max-w-md relative z-10">
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-4 text-center pb-6">
            <div className="mx-auto p-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl w-fit">
              {isEmailSent ? (
                <Mail className="w-8 h-8 text-white" />
              ) : (
                <Heart className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {isEmailSent ? "Kiểm tra email" : "Quên mật khẩu?"}
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                {isEmailSent
                  ? "Chúng tôi đã gửi link đặt lại mật khẩu đến email của bạn"
                  : "Nhập email để nhận link đặt lại mật khẩu"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {!isEmailSent ? (
              <form onSubmit={handleSubmit} className="space-y-5">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  />
                </div>

                <Button
                  type="submit"
                  className={cn(
                    "w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]",
                    isLoading && "opacity-70"
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang gửi...</span>
                    </div>
                  ) : (
                    "Gửi link đặt lại"
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    Email đã được gửi đến <strong>{email}</strong>
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  Không nhận được email? Kiểm tra thư mục spam hoặc{" "}
                  <button
                    onClick={() => setIsEmailSent(false)}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    thử lại
                  </button>
                </p>
              </div>
            )}

            <div className="flex items-center justify-center">
              <Link
                href="/auth/login"
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại đăng nhập</span>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Cần hỗ trợ?{" "}
            <Link
              href="/support"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Liên hệ với chúng tôi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
