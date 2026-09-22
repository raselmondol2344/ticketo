import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashbordLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-[#080c16]">
      
      <DashboardSidebar />

      <div className="flex-1 w-full min-w-0">
        {children}
      </div>

    </div>
  );
}