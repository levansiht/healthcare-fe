"use client";

import { Dumbbell, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { authUtils } from "@/lib/axios";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useApi";

const navItems = [
    { href: "/features", label: "Tính năng" },
    { href: "/pricing", label: "Bảng giá" },
    { href: "/about", label: "Giới thiệu" },
];

const authNavItems = [
    { href: "/auth/login", label: "Đăng nhập", variant: "outline" as const },
    { href: "/auth/login", label: "Bắt đầu ngay", variant: undefined },
];

const UserDropdownItems = [
    { href: "/profile", label: "Hồ sơ" },
    { href: "/settings", label: "Cài đặt" },
    { href: "/auth/logout", label: "Đăng xuất", action: "logout" },
];

export function UserDropdown() {
    const [open, setOpen] = useState(false);
    const {logout} = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        setOpen(false);
        return router.push("/auth/login");
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Image
                    src="/image-default.jpeg"
                    onClick={() => {
                        setOpen((prev) => !prev);
                    }}
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full cursor-pointer hover:opacity-90 transition-opacity"
                />
            </PopoverTrigger>
            <PopoverContent className="w-56 p-1 bg-background border rounded-md shadow-lg">
                <div className="grid gap-1">
                    {UserDropdownItems.map((item) => {
                        if (item.action === "logout") {
                            return (
                                <Button
                                    key={item.label}
                                    variant="ghost"
                                    className="w-full flex items-center justify-start text-left h-10 px-3 py-2 rounded-sm text-sm hover:bg-accent focus:bg-accent"
                                    onClick={handleLogout}
                                >
                                    <span>{item.label}</span>
                                </Button>
                            );
                        }
                        return (
                            <Link key={item.href} href={item.href} passHref>
                                <Button
                                    variant="ghost"
                                    className="w-full flex items-center justify-start text-left h-10 px-3 py-2 rounded-sm text-sm hover:bg-accent focus:bg-accent"
                                    onClick={() => setOpen(false)}
                                >
                                    <span>{item.label}</span>
                                </Button>
                            </Link>
                        );
                    })}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default function HeaderComponent() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const token = authUtils.isAuthenticated();    

    const MobileMenuContent = () => (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 px-4 py-6 border-b">
                <Dumbbell className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-xl">FitTracker</span>
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid gap-1 px-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="border-t p-4 space-y-2">
                {token ? (
                    <UserDropdown />
                ) : (
                    authNavItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Button variant={item.variant} className="w-full">
                                {item.label}
                            </Button>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Dumbbell className="h-6 w-6 text-blue-600" />
                    <span className="font-bold text-xl">FitTracker</span>
                </Link>
                <div className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium hover:text-blue-600 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                    {token ? (
                        <UserDropdown />
                    ) : (
                        <>
                            {authNavItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Button variant={item.variant} size="sm">
                                        {item.label}
                                    </Button>
                                </Link>
                            ))}
                        </>
                    )}
                </div>
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="sm" className="md:hidden">
                            <Menu className="h-4 w-4" />
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="p-0 w-64">
                        <MobileMenuContent />
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
}
