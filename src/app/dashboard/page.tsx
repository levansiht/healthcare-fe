import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Activity, ListChecks, CheckCircle } from "lucide-react"; // Added CheckCircle
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const navigationOptions = [
        {
            href: "/dashboard/bodyTrack",
            title: "Theo dõi cơ thể",
            description: "Ghi lại và theo dõi các chỉ số cơ thể của bạn như cân nặng, số đo các vòng...",
            icon: Activity,
            color: "text-teal-600",
            features: [ 
                "Theo dõi cân nặng, chiều cao",
                "Ghi chú số đo các vòng (eo, ngực, mông)",
                "Xem biểu đồ tiến trình",
                "Đặt mục tiêu cá nhân",
            ],
        },
        {
            href: "/dashboard/session",
            title: "Các bài tập",
            description: "Khám phá và lựa chọn các bài tập, kế hoạch tập luyện phù hợp với mục tiêu của bạn.",
            icon: ListChecks,
            color: "text-orange-600",
            features: [
                "Thư viện bài tập đa dạng",
                "Tạo kế hoạch tập luyện tùy chỉnh",
                "Lọc bài tập theo nhóm cơ, dụng cụ",
                "Xem video hướng dẫn chi tiết",
            ],
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
                    Chào mừng bạn đến với Bảng điều khiển
                </h1>
                <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                    Đây là trung tâm quản lý sức khỏe và kế hoạch tập luyện của bạn. Khám phá các tính năng và bắt đầu hành trình cải thiện vóc dáng ngay hôm nay!
                </p>
            </header>

            <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-8 text-center">
                    Bắt đầu hành trình của bạn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {navigationOptions.map((option) => (
                        <Link href={option.href} key={option.title} className="group">
                            <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col bg-card">
                                <CardHeader className="flex-row items-start gap-4 pb-4"> {/* Changed items-center to items-start for better alignment with feature list */}
                                    <option.icon className={`h-10 w-10 ${option.color} mt-1`} /> {/* Added mt-1 for better alignment */}
                                    <div className="flex gap-4 flex-col">
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                            {option.title}
                                        </CardTitle>
                                        <CardDescription className="text-sm text-muted-foreground"> {/* Adjusted text size */}
                                            {option.description}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow pt-0"> {/* Removed default padding-top */}
                                    <div className="space-y-2 pt-2 border-t border-border mt-2"> {/* Added border and margin */}
                                        {option.features.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2"
                                            >
                                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" /> {/* Added flex-shrink-0 */}
                                                <span className="text-sm text-muted-foreground">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <div className="p-6 pt-4"> {/* Adjusted padding-top */}
                                     <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        Truy cập ngay
                                    </Button>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}