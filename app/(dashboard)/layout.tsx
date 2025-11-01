import { Navbar } from "@/components/shared/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col items-stretch">
      <Navbar />
      <div className="flex-1 p-6 overflow-x-hidden overflow-y-auto relative">
        {children}
      </div>
    </div>
  );
}
