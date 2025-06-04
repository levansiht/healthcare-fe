import { Dumbbell, Check, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Pricing() {
  const plans = [
    {
      name: "Miễn phí",
      price: "0",
      description: "Bắt đầu hành trình fitness của bạn",
      features: [
        "Tối đa 5 bài tập/ngày",
        "Theo dõi tiến độ cơ bản",
        "Thư viện bài tập cơ bản",
        "Hỗ trợ qua email",
      ],
      popular: false,
      buttonText: "Bắt đầu miễn phí",
    },
    {
      name: "Pro",
      price: "199.000",
      description: "Cho những người nghiêm túc với fitness",
      features: [
        "Bài tập không giới hạn",
        "Lịch tập AI thông minh",
        "Phân tích chi tiết",
        "Thư viện bài tập premium",
        "Hỗ trợ ưu tiên",
        "Tính năng cộng đồng",
      ],
      popular: true,
      buttonText: "Chọn gói Pro",
    },
    {
      name: "Premium",
      price: "399.000",
      description: "Giải pháp toàn diện cho chuyên gia",
      features: [
        "Tất cả tính năng Pro",
        "Huấn luyện viên cá nhân AI",
        "Kế hoạch dinh dưỡng",
        "Phân tích sinh học",
        "Tích hợp thiết bị đeo",
        "Hỗ trợ 24/7",
        "Tùy chỉnh không giới hạn",
      ],
      popular: false,
      buttonText: "Chọn gói Premium",
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
              className="text-sm font-medium text-blue-600 transition-colors"
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
            💰 Bảng giá
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Chọn gói phù hợp với{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              mục tiêu
            </span>{" "}
            của bạn
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Từ miễn phí đến premium, chúng tôi có gói dịch vụ phù hợp với mọi
            nhu cầu và ngân sách.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                plan.popular ? "ring-2 ring-blue-600 dark:ring-blue-400" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Phổ biến nhất
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    {plan.price === "0" ? "Miễn phí" : `${plan.price}₫`}
                  </span>
                  {plan.price !== "0" && (
                    <span className="text-muted-foreground">/tháng</span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/auth/login" className="block">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Câu hỏi thường gặp
            </h2>
            <p className="text-xl text-muted-foreground">
              Những câu hỏi phổ biến về các gói dịch vụ của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Tôi có thể thay đổi gói bất cứ lúc nào không?",
                answer:
                  "Có, bạn có thể nâng cấp hoặc hạ cấp gói dịch vụ bất cứ lúc nào. Thay đổi sẽ có hiệu lực ngay lập tức.",
              },
              {
                question: "Có bảo đảm hoàn tiền không?",
                answer:
                  "Chúng tôi cung cấp bảo đảm hoàn tiền 30 ngày cho tất cả các gói trả phí nếu bạn không hài lòng.",
              },
              {
                question: "Gói miễn phí có giới hạn thời gian không?",
                answer:
                  "Không, gói miễn phí không có giới hạn thời gian. Bạn có thể sử dụng mãi mãi với các tính năng cơ bản.",
              },
              {
                question: "Tôi có thể hủy đăng ký bất cứ lúc nào không?",
                answer:
                  "Có, bạn có thể hủy đăng ký bất cứ lúc nào mà không mất phí. Tài khoản sẽ chuyển về gói miễn phí.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                  <CardDescription className="text-base">
                    {faq.answer}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
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
            <Link href="/features">
              <Button variant="outline" size="lg">
                Xem tính năng
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
