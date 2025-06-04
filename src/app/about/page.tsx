import {
  Dumbbell,
  Target,
  Heart,
  ArrowRight,
  TrendingUp,
  Shield,
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

export default function About() {
  const stats = [
    { number: "10,000+", label: "Người dùng hoạt động" },
    { number: "500,000+", label: "Bài tập đã hoàn thành" },
    { number: "95%", label: "Tỷ lệ hài lòng" },
    { number: "24/7", label: "Hỗ trợ khách hàng" },
  ];

  const team = [
    {
      name: "Nguyễn Văn A",
      role: "CEO & Founder",
      description: "Chuyên gia fitness với 10 năm kinh nghiệm",
    },
    {
      name: "Trần Thị B",
      role: "CTO",
      description: "Kỹ sư phần mềm hàng đầu trong lĩnh vực health-tech",
    },
    {
      name: "Lê Văn C",
      role: "Head of Product",
      description: "Chuyên gia UX/UI với niềm đam mê về sức khỏe",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Sự quan tâm",
      description:
        "Chúng tôi quan tâm đến sức khỏe và hạnh phúc của từng người dùng",
    },
    {
      icon: Target,
      title: "Mục tiêu rõ ràng",
      description: "Giúp mọi người đạt được mục tiêu fitness một cách hiệu quả",
    },
    {
      icon: Shield,
      title: "Tin cậy",
      description:
        "Bảo vệ dữ liệu và quyền riêng tư của người dùng là ưu tiên hàng đầu",
    },
    {
      icon: TrendingUp,
      title: "Cải tiến liên tục",
      description: "Không ngừng đổi mới để mang lại trải nghiệm tốt nhất",
    },
  ];

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
              className="text-sm font-medium text-blue-600 transition-colors"
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
            🏆 Giới thiệu về chúng tôi
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Câu chuyện của{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              FitTracker
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Chúng tôi tin rằng mọi người đều xứng đáng có một cuộc sống khỏe
            mạnh và hạnh phúc. FitTracker được tạo ra để làm cho việc tập luyện
            trở nên đơn giản, thú vị và hiệu quả hơn.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Sứ mệnh của chúng tôi
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Tại FitTracker, sứ mệnh của chúng tôi là làm cho việc duy trì sức
            khỏe trở nên dễ dàng và thú vị cho mọi người. Chúng tôi tin rằng
            công nghệ có thể là cầu nối giúp mọi người đạt được mục tiêu fitness
            của mình, bất kể họ ở đâu hay có kinh nghiệm như thế nào.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/features">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Khám phá tính năng
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="lg">
                Bắt đầu ngay
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Giá trị cốt lõi</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Những giá trị định hướng mọi quyết định và hành động của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <value.icon className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl">{value.title}</CardTitle>
                <CardDescription className="text-base">
                  {value.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Đội ngũ của chúng tôi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Những con người đam mê và tài năng đang xây dựng tương lai của
            fitness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 mx-auto mb-4" />
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <Badge variant="secondary" className="mx-auto">
                  {member.role}
                </Badge>
                <CardDescription className="text-base mt-4">
                  {member.description}
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
            Sẵn sàng tham gia cùng chúng tôi?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hãy trở thành một phần của cộng đồng FitTracker và bắt đầu hành
            trình đến với phiên bản tốt nhất của chính bạn
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
