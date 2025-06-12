import SelectViewComponent from "@/components/select-view-component";

export default function DashboardBodyTrackLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const routeItems = [
        { label: "BMI", href: "/dashboard/bodyTrack/BMI" },
        { label: "Body Weight", href: "/dashboard/bodyTrack/body-weight" },
        { label: "Training Volume", href: "/dashboard/bodyTrack/training-volume" },
    ];
    const content = { 
        title: "Theo dõi sức khỏe",
        description: "Theo dõi sức khỏe của bạn với các chỉ số như BMI, bài tập và kế hoạch dinh dưỡng.",
    }

    return (
        <div>
            <SelectViewComponent routes={routeItems} content={content} />
            {children}
        </div>
    );
}
