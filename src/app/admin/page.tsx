"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Dumbbell,
  Calendar,
  Settings,
  BarChart3,
  Activity,
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Heart,
  Star,
  Bell,
  LogOut,
  Home,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data
const stats = [
  {
    title: "Tổng người dùng",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "blue",
  },
  {
    title: "Bài tập đã tạo",
    value: "1,243",
    change: "+8.2%",
    trend: "up",
    icon: Dumbbell,
    color: "green",
  },
  {
    title: "Lịch tập hôm nay",
    value: "534",
    change: "+23.1%",
    trend: "up",
    icon: Calendar,
    color: "purple",
  },
  {
    title: "Hoạt động",
    value: "98.2%",
    change: "+2.4%",
    trend: "up",
    icon: Activity,
    color: "orange",
  },
];

const recentUsers = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "an.nguyen@email.com",
    avatar: "/avatars/01.png",
    status: "active",
    joinDate: "2024-01-15",
    plan: "Premium",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    email: "binh.tran@email.com",
    avatar: "/avatars/02.png",
    status: "active",
    joinDate: "2024-01-14",
    plan: "Basic",
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    email: "cuong.le@email.com",
    avatar: "/avatars/03.png",
    status: "inactive",
    joinDate: "2024-01-13",
    plan: "Premium",
  },
  {
    id: 4,
    name: "Phạm Thị Dung",
    email: "dung.pham@email.com",
    avatar: "/avatars/04.png",
    status: "active",
    joinDate: "2024-01-12",
    plan: "Basic",
  },
  {
    id: 5,
    name: "Hoàng Văn Em",
    email: "em.hoang@email.com",
    avatar: "/avatars/05.png",
    status: "active",
    joinDate: "2024-01-11",
    plan: "Premium",
  },
];

const exercises = [
  {
    id: 1,
    name: "Push-ups",
    category: "Ngực",
    difficulty: "Trung bình",
    duration: "10 phút",
    popularity: 95,
  },
  {
    id: 2,
    name: "Squats",
    category: "Chân",
    difficulty: "Dễ",
    duration: "15 phút",
    popularity: 89,
  },
  {
    id: 3,
    name: "Plank",
    category: "Core",
    difficulty: "Khó",
    duration: "5 phút",
    popularity: 78,
  },
  {
    id: 4,
    name: "Pull-ups",
    category: "Lưng",
    difficulty: "Khó",
    duration: "12 phút",
    popularity: 67,
  },
];

const sidebarItems = [
  {
    title: "Tổng quan",
    icon: Home,
    href: "/admin",
    isActive: true,
  },
  {
    title: "Người dùng",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Bài tập",
    icon: Dumbbell,
    href: "/admin/exercises",
  },
  {
    title: "Lịch tập",
    icon: Calendar,
    href: "/admin/schedules",
  },
  {
    title: "Thống kê",
    icon: BarChart3,
    href: "/admin/analytics",
  },
  {
    title: "Cài đặt",
    icon: Settings,
    href: "/admin/settings",
  },
];

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 px-4 py-6 border-b">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Heart className="h-4 w-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">FitTracker</span>
          <span className="truncate text-xs text-muted-foreground">
            Admin Panel
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${
                item.isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/admin.png" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Admin User</span>
                <span className="truncate text-xs text-muted-foreground">
                  admin@fittracker.com
                </span>
              </div>
              <MoreHorizontal className="ml-auto size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/admin.png" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Admin User</span>
                  <span className="truncate text-xs text-muted-foreground">
                    admin@fittracker.com
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Cài đặt tài khoản
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Thông báo
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 lg:bg-card lg:border-r">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 lg:hidden">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
          </Sheet>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4">
          {/* Stats Cards - Responsive Grid */}
          <div className="grid auto-rows-min gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 text-${stat.color}-600`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={`text-${stat.color}-600`}>
                      {stat.change}
                    </span>{" "}
                    so với tháng trước
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content - Mobile First Responsive */}
          <div className="grid gap-4 lg:grid-cols-7 mb-4">
            {/* Recent Users - Mobile Optimized */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Người dùng gần đây</CardTitle>
                    <CardDescription>
                      Danh sách người dùng mới đăng ký
                    </CardDescription>
                  </div>
                  <Button size="sm" className="gap-1 w-full sm:w-auto">
                    <Plus className="h-4 w-4" />
                    Thêm mới
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Search and Filter - Mobile Stack */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Tìm kiếm người dùng..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      <Filter className="h-4 w-4" />
                      <span className="sm:hidden ml-2">Bộ lọc</span>
                    </Button>
                  </div>

                  {/* Table with Horizontal Scroll on Mobile */}
                  <div className="rounded-md border overflow-hidden">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="min-w-[200px]">
                              Người dùng
                            </TableHead>
                            <TableHead className="min-w-[100px]">
                              Trạng thái
                            </TableHead>
                            <TableHead className="min-w-[80px]">Gói</TableHead>
                            <TableHead className="text-right min-w-[80px]">
                              Hành động
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8 flex-shrink-0">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>
                                      {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="min-w-0 flex-1">
                                    <div className="font-medium truncate">
                                      {user.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground truncate">
                                      {user.email}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    user.status === "active"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="text-xs whitespace-nowrap"
                                >
                                  {user.status === "active"
                                    ? "Hoạt động"
                                    : "Không hoạt động"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">
                                  {user.plan}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      className="h-8 w-8 p-0"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Eye className="mr-2 h-4 w-4" />
                                      Xem chi tiết
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Chỉnh sửa
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Xóa
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exercise Overview - Responsive */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Bài tập phổ biến</CardTitle>
                <CardDescription>
                  Top bài tập được thực hiện nhiều nhất
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exercises.map((exercise) => (
                    <div key={exercise.id} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                        <Dumbbell className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <p className="text-sm font-medium leading-none truncate">
                          {exercise.name}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {exercise.category} • {exercise.duration}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0">
                        <Badge variant="outline" className="text-xs">
                          {exercise.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {exercise.popularity}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions - Mobile Optimized */}
          <Card>
            <CardHeader>
              <CardTitle>Hành động nhanh</CardTitle>
              <CardDescription>
                Các tác vụ thường dùng trong quản trị
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                <Button
                  className="h-20 flex-col gap-2 text-center"
                  variant="outline"
                >
                  <Users className="h-6 w-6" />
                  <span className="text-xs sm:text-sm">Quản lý người dùng</span>
                </Button>
                <Button
                  className="h-20 flex-col gap-2 text-center"
                  variant="outline"
                >
                  <Dumbbell className="h-6 w-6" />
                  <span className="text-xs sm:text-sm">Thêm bài tập mới</span>
                </Button>
                <Button
                  className="h-20 flex-col gap-2 text-center"
                  variant="outline"
                >
                  <BarChart3 className="h-6 w-6" />
                  <span className="text-xs sm:text-sm">Xem báo cáo</span>
                </Button>
                <Button
                  className="h-20 flex-col gap-2 text-center"
                  variant="outline"
                >
                  <Download className="h-6 w-6" />
                  <span className="text-xs sm:text-sm">Xuất dữ liệu</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
