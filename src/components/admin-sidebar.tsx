"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  Dumbbell,
  Calendar,
  Target,
  Activity,
  BarChart3,
  Settings,
  Home,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";
import { clearAuthCookieAction } from "@/actions/authActions";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    title: "Người dùng",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Bài tập",
    href: "/admin/exercises",
    icon: Dumbbell,
  },
  {
    title: "Kế hoạch",
    href: "/admin/plans",
    icon: Target,
  },
  {
    title: "Phiên tập",
    href: "/admin/sessions",
    icon: Calendar,
  },
  {
    title: "Bộ bài tập",
    href: "/admin/sets",
    icon: Activity,
  },
  {
    title: "Theo dõi cơ thể",
    href: "/admin/bodytracks",
    icon: BarChart3,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
      await clearAuthCookieAction();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo/Brand */}
      <div className="flex items-center px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Healthcare Admin</h2>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    isActive &&
                      "bg-secondary text-secondary-foreground font-medium"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t p-4 space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Settings className="w-4 h-4" />
          Cài đặt
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
