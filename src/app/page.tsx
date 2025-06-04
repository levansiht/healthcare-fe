import {
  Calendar,
  Dumbbell,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Play,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Dumbbell className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">FitTracker</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/features"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Tính năng
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Bảng giá
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Giới thiệu
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Đăng nhập
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="sm">Bắt đầu ngay</Button>
            </Link>
          </div>

          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                🎯 Quản lý lịch tập thông minh
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Biến mục tiêu{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  sức khỏe
                </span>{" "}
                thành thực tế
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Ứng dụng quản lý lịch tập và gợi ý bài tập cá nhân hóa. Theo dõi
                tiến độ, nhận hướng dẫn từ chuyên gia và đạt được mục tiêu
                fitness của bạn.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Bắt đầu miễn phí
                </Button>
              </Link>
              <Link href="/features">
                <Button variant="outline" size="lg">
                  Xem demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 border-2 border-white" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 border-2 border-white" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 border-2 border-white" />
                </div>
                <span className="text-sm text-muted-foreground">
                  10,000+ người dùng
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  4.9/5 đánh giá
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl transform rotate-6 opacity-20" />
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Lịch tập hôm nay</h3>
                    <Badge variant="secondary">3 bài tập</Badge>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: "Push-ups", sets: "3x15", completed: true },
                      { name: "Squats", sets: "3x20", completed: true },
                      { name: "Plank", sets: "3x30s", completed: false },
                    ].map((exercise, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                      >
                        <CheckCircle
                          className={`h-5 w-5 ${
                            exercise.completed
                              ? "text-green-500"
                              : "text-gray-300"
                          }`}
                        />
                        <div className="flex-1">
                          <div className="font-medium">{exercise.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {exercise.sets}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="container mx-auto px-4 py-20 bg-white/50 dark:bg-gray-800/50"
      >
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline">Tính năng nổi bật</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Mọi thứ bạn cần để đạt được mục tiêu
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Từ lập kế hoạch tập luyện đến theo dõi tiến độ, chúng tôi cung cấp
            đầy đủ công cụ cho hành trình fitness của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Calendar,
              title: "Lập lịch thông minh",
              description:
                "Tạo và quản lý lịch tập cá nhân hóa với AI thông minh",
              color: "text-blue-600",
            },
            {
              icon: Dumbbell,
              title: "Gợi ý bài tập",
              description:
                "Nhận gợi ý bài tập phù hợp với mức độ và mục tiêu của bạn",
              color: "text-purple-600",
            },
            {
              icon: Users,
              title: "Cộng đồng",
              description:
                "Kết nối với cộng đồng fitness và chia sẻ thành tích",
              color: "text-green-600",
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Sẵn sàng bắt đầu hành trình của bạn?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tham gia cùng hàng nghìn người dùng đã thay đổi cuộc sống của họ với
            FitTracker
          </p>
          <Link href="/auth/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Bắt đầu miễn phí ngay hôm nay
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/95">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Dumbbell className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-xl">FitTracker</span>
              </div>
              <p className="text-muted-foreground">
                Ứng dụng quản lý lịch tập và gợi ý bài tập thông minh nhất.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Sản phẩm</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="/features" className="block hover:text-blue-600">
                  Tính năng
                </Link>
                <Link href="/pricing" className="block hover:text-blue-600">
                  Bảng giá
                </Link>
                <div>API</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Hỗ trợ</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Trung tâm trợ giúp</div>
                <div>Liên hệ</div>
                <div>Blog</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Pháp lý</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Điều khoản</div>
                <div>Bảo mật</div>
                <div>Cookies</div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            © 2025 FitTracker. Tất cả quyền được bảo lưu.
          </div>
        </div>
      </footer>
    </div>
  );
}
