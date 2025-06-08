"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Dumbbell,
  Calendar,
  Settings,
  BarChart3,
  Activity,
  Plus,
  Bell,
  Heart,
  Menu,
  Target,
  Zap,
  TrendingUp,
  TrendingDown,
  Eye,
  MoreHorizontal,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { userService } from "@/services/userService";
import { exerciseService } from "@/services/exerciseService";
import { planService } from "@/services/planService";
import { sessionService } from "@/services/sessionService";
import { setService } from "@/services/setService";
import { bodyTrackService } from "@/services/bodyTrackService";
import { User, Exercise, Plan, Session, Set, BodyTrack } from "@/types/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sets, setSets] = useState<Set[]>([]);
  const [bodyTracks, setBodyTracks] = useState<BodyTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    console.log("🔄 Users state updated:", users.length, users);
  }, [users]);

  useEffect(() => {
    console.log("🔄 Exercises state updated:", exercises.length, exercises);
  }, [exercises]);

  useEffect(() => {
    console.log("🚀 Starting dashboard data load...");
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        console.log("📡 Calling APIs...");
        const [
          usersData,
          exercisesData,
          plansData,
          sessionsData,
          setsData,
          bodyTracksData,
        ] = await Promise.all([
          userService.getAllUsers().catch((err) => {
            console.error("❌ Users API error:", err);
            return [];
          }),
          exerciseService.getAllExercises().catch((err) => {
            console.error("❌ Exercises API error:", err);
            return [];
          }),
          planService.getAllPlans().catch((err) => {
            console.error("❌ Plans API error:", err);
            return [];
          }),
          sessionService.getAllSessions().catch((err) => {
            console.error("❌ Sessions API error:", err);
            return [];
          }),
          setService.getAllSets().catch((err) => {
            console.error("❌ Sets API error:", err);
            return [];
          }),
          bodyTrackService.getAllBodyTracks().catch((err) => {
            console.error("❌ BodyTracks API error:", err);
            return [];
          }),
        ]);

        console.log("📊 API Results:", {
          users: usersData,
          exercises: exercisesData,
          plans: plansData,
          sessions: sessionsData,
          sets: setsData,
          bodyTracks: bodyTracksData,
        });

        setUsers(usersData || []);
        setExercises(exercisesData || []);
        setPlans(plansData || []);
        setSessions(sessionsData || []);
        setSets(setsData || []);
        setBodyTracks(bodyTracksData || []);

        console.log("✅ Dashboard data loaded successfully");
      } catch (error) {
        console.error("💥 Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const stats = [
    {
      title: "Tổng người dùng",
      value: (users?.length || 0).toString(),
      change: "+12.5%",
      trend: "up" as const,
      icon: Users,
      color: "blue",
      href: "/admin/users",
    },
    {
      title: "Bài tập đã tạo",
      value: (exercises?.length || 0).toString(),
      change: "+8.2%",
      trend: "up" as const,
      icon: Dumbbell,
      color: "green",
      href: "/admin/exercises",
    },
    {
      title: "Kế hoạch tập",
      value: (plans?.length || 0).toString(),
      change: "+23.1%",
      trend: "up" as const,
      icon: Target,
      color: "purple",
      href: "/admin/plans",
    },
    {
      title: "Phiên tập",
      value: (sessions?.length || 0).toString(),
      change: "+15.3%",
      trend: "up" as const,
      icon: Calendar,
      color: "orange",
      href: "/admin/sessions",
    },
  ];

  const recentUsers = (users || []).slice(-5).reverse();
  const recentExercises = (exercises || []).slice(-5).reverse();

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: BarChart3,
      href: "/admin",
      active: true,
    },
    {
      title: "Người dùng",
      icon: Users,
      href: "/admin/users",
      count: users?.length || 0,
    },
    {
      title: "Bài tập",
      icon: Dumbbell,
      href: "/admin/exercises",
      count: exercises?.length || 0,
    },
    {
      title: "Kế hoạch",
      icon: Target,
      href: "/admin/plans",
      count: plans?.length || 0,
    },
    {
      title: "Phiên tập",
      icon: Calendar,
      href: "/admin/sessions",
      count: sessions?.length || 0,
    },
    {
      title: "Set tập luyện",
      icon: Zap,
      href: "/admin/sets",
      count: sets?.length || 0,
    },
    {
      title: "Thể trạng",
      icon: Activity,
      href: "/admin/bodytracks",
      count: bodyTracks?.length || 0,
    },
    {
      title: "Cài đặt",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

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
                item.active
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
              {item.count !== undefined && (
                <Badge variant="secondary" className="ml-auto">
                  {item.count}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t p-4">
        <div className="flex items-center gap-2">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Cài đặt
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-1 min-h-0 border-r bg-card">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:pl-64">
        {/* Header */}
        <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="flex h-16 items-center px-4 gap-4">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
            </Sheet>

            <div className="flex-1">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Tổng quan về hệ thống quản lý sức khỏe
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Thêm mới
              </Button>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-auto p-6">
          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {stats.map((stat, index) => (
              <Link key={index} href={stat.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 text-${stat.color}-600`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      {stat.trend === "up" ? (
                        <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
                      )}
                      {stat.change} so với tháng trước
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Users */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Người dùng mới</CardTitle>
                  <CardDescription>
                    {recentUsers.length} người dùng đăng ký gần đây
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/users">
                    <Eye className="mr-2 h-4 w-4" />
                    Xem tất cả
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.length > 0 ? (
                    recentUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between space-x-4"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={`/avatars/0${user.id}.png`} />
                            <AvatarFallback>
                              {user.username?.[0]?.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium leading-none">
                              {user.username}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ID: {user.id}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            user.membershipTier === "Premium"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {user.membershipTier}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Chưa có người dùng nào
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Exercises */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Bài tập mới</CardTitle>
                  <CardDescription>
                    {recentExercises.length} bài tập được tạo gần đây
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/exercises">
                    <Eye className="mr-2 h-4 w-4" />
                    Xem tất cả
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentExercises.length > 0 ? (
                    recentExercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium">{exercise.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {exercise.muscle}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {exercise.description?.slice(0, 20)}...
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Chưa có bài tập nào
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Thao tác nhanh</CardTitle>
              <CardDescription>
                Các chức năng thường dùng trong quản lý hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                <Button variant="outline" className="h-20 flex-col" asChild>
                  <Link href="/admin/users">
                    <Users className="h-6 w-6 mb-2" />
                    <span className="text-xs">Quản lý người dùng</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col" asChild>
                  <Link href="/admin/exercises">
                    <Dumbbell className="h-6 w-6 mb-2" />
                    <span className="text-xs">Quản lý bài tập</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col" asChild>
                  <Link href="/admin/plans">
                    <Target className="h-6 w-6 mb-2" />
                    <span className="text-xs">Quản lý kế hoạch</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col" asChild>
                  <Link href="/admin/sessions">
                    <Calendar className="h-6 w-6 mb-2" />
                    <span className="text-xs">Quản lý phiên tập</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col" asChild>
                  <Link href="/admin/sets">
                    <Zap className="h-6 w-6 mb-2" />
                    <span className="text-xs">Quản lý set</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col" asChild>
                  <Link href="/admin/bodytracks">
                    <Activity className="h-6 w-6 mb-2" />
                    <span className="text-xs">Theo dõi thể trạng</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
