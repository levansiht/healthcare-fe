import {
  Calendar,
  Dumbbell,
  Users,
  ArrowRight,
  CheckCircle,
  Shield,
  Clock,
  Target,
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

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">FitTracker</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/features"
              className="text-sm font-medium text-blue-600 transition-colors"
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6 mb-16">
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            🚀 Tính năng mạnh mẽ
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Tất cả những gì bạn cần cho{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              hành trình fitness
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Khám phá bộ công cụ đầy đủ để quản lý lịch tập, theo dõi tiến độ và
            đạt được mục tiêu sức khỏe của bạn.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Calendar,
              title: "Lập lịch thông minh",
              description:
                "Tạo và quản lý lịch tập cá nhân hóa với AI thông minh. Tự động điều chỉnh theo tiến độ và sở thích của bạn.",
              color: "text-blue-600",
              features: [
                "Lịch tập tự động",
                "Điều chỉnh theo tiến độ",
                "Nhắc nhở thông minh",
              ],
            },
            {
              icon: Dumbbell,
              title: "Gợi ý bài tập",
              description:
                "Nhận gợi ý bài tập phù hợp với mức độ và mục tiêu của bạn. Hàng nghìn bài tập được chọn lọc.",
              color: "text-purple-600",
              features: [
                "Hàng nghìn bài tập",
                "Phù hợp mọi trình độ",
                "Video hướng dẫn",
              ],
            },
            {
              icon: Users,
              title: "Cộng đồng",
              description:
                "Kết nối với cộng đồng fitness và chia sẻ thành tích. Tham gia thử thách và động viên lẫn nhau.",
              color: "text-green-600",
              features: [
                "Cộng đồng sôi động",
                "Thử thách hàng tuần",
                "Chia sẻ thành tích",
              ],
            },
            {
              icon: Target,
              title: "Theo dõi mục tiêu",
              description:
                "Đặt và theo dõi mục tiêu cá nhân. Nhận phân tích chi tiết về tiến độ và hiệu suất.",
              color: "text-red-600",
              features: [
                "Mục tiêu cá nhân",
                "Phân tích chi tiết",
                "Báo cáo tiến độ",
              ],
            },
            {
              icon: Shield,
              title: "An toàn & Bảo mật",
              description:
                "Dữ liệu của bạn được bảo vệ tối đa với công nghệ mã hóa tiên tiến và tuân thủ các tiêu chuẩn bảo mật.",
              color: "text-orange-600",
              features: ["Mã hóa dữ liệu", "Tuân thủ GDPR", "Backup tự động"],
            },
            {
              icon: Clock,
              title: "Theo dõi thời gian",
              description:
                "Đo lường thời gian tập luyện, thời gian nghỉ ngơi và tối ưu hóa hiệu suất tập luyện của bạn.",
              color: "text-cyan-600",
              features: [
                "Đo thời gian tập",
                "Thời gian nghỉ ngơi",
                "Phân tích hiệu suất",
              ],
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base mb-4">
                  {feature.description}
                </CardDescription>
                <div className="space-y-2">
                  {feature.features.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Sẵn sàng trải nghiệm tất cả tính năng?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bắt đầu miễn phí ngay hôm nay và khám phá tất cả tính năng mạnh mẽ
            của FitTracker
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Bắt đầu miễn phí
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg">
                Xem bảng giá
              </Button>
            </Link>
          </div>
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
