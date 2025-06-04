import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - FitTracker",
  description: "Bảng điều khiển quản trị viên cho ứng dụng FitTracker",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="admin-layout">{children}</div>;
}
