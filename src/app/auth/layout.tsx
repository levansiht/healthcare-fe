import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xác thực - HealthCare Pro",
  description:
    "Đăng nhập hoặc tạo tài khoản mới để truy cập vào HealthCare Pro",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="auth-layout">{children}</div>;
}
