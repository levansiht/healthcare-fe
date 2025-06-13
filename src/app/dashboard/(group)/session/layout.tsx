import SelectViewComponent from "@/components/select-view-component";

export default function DashboardSessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const routeItems = [
    { label: "Today", href: "/dashboard/session/today" },
    { label: "Calendar", href: "/dashboard/session/calendar" },
    { label: "Plan", href: "/dashboard/session/plan" },
  ];
  const content = {
    title: "Quản lý phiên tập",
    description:
      "Theo dõi và quản lý các phiên tập luyện của bạn hôm nay và lên kế hoạch cho tương lai.",
  };

  return (
    <div>
      <SelectViewComponent routes={routeItems} content={content} />
      {children}
    </div>
  );
}
