import HeaderComponent from "@/components/header";
// import SelectViewComponent from "@/components/select-view-component";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
            <HeaderComponent />
            <div className="container mx-auto p-6">
                {children}
            </div>
        </div>
    );
}
