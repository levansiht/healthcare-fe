import type { Metadata, Viewport } from "next"; // Thêm Viewport vào import
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/error-boundary";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HealthCare Pro - Quản lý sức khỏe thông minh",
  description:
    "Ứng dụng quản lý sức khỏe, theo dõi tập luyện và dinh dưỡng một cách thông minh",
  keywords: [
    "healthcare",
    "fitness",
    "workout",
    "nutrition",
    "health tracking",
  ],
  authors: [{ name: "HealthCare Pro Team" }],
};

// Export viewport riêng
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Bạn có thể thêm các thuộc tính viewport khác ở đây nếu cần
  // maximumScale: 1,
  // userScalable: false,
  // themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <QueryProvider>
            {children}
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                style: {
                  fontFamily: "var(--font-geist-sans)",
                },
              }}
            />
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
