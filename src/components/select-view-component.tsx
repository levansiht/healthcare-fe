"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
// import { Badge } from "@/components/ui/badge";


interface Route {
    href: string;
    label: string;
}


export default function SelectViewComponent({
    routes,
    content
}: Readonly<{ routes: Route[]; content: { title: string; description: string } }>) {
    const pathname = usePathname();
    const getButtonClass = (href: string) =>
        `text-[13px] font-[500] hover:cursor-pointer ${
            pathname.startsWith(href)
                ? "bg-[#10121D] text-white" // Adjusted active button text color for better contrast
                : "bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-slate-100"
        }`;

    return (
        <div className="flex justify-center py-3">
            <div className="container mx-auto px-6 py-2">
                <section className="container mx-auto px-4 py-20">
                    <div className="text-center space-y-6 mb-16">
                        {/* <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                            🚀 Tính năng mạnh mẽ
                        </Badge> */}
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                {content.title}
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            {content.description}
                        </p>
                    </div>
                </section>

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                        Chọn chế độ xem
                    </h2>
                    <div className="relative flex overflow-auto size-min gap-[10px] rounded-[6px] border border-solid border-slate-300 dark:border-slate-700 bg-transparent p-1">
                        {routes.map(({ href, label }) => (
                            <Link key={href} href={href}>
                                <Button className={getButtonClass(href)}>
                                    {label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
