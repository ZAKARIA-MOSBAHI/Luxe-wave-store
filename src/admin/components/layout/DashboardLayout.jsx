import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={`md:ml-72 transition-all duration-300`}>
        <Header />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
