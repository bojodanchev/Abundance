import { isAdminAuthenticated } from "@/lib/admin-auth";
import AdminSidebar from "./AdminSidebar";

export const metadata = {
  title: "Admin | CODE: ABUNDANCE",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await isAdminAuthenticated();

  if (!isAuth) {
    // Bare layout for login page (no sidebar)
    return (
      <div className="min-h-screen bg-surface-dark font-body text-text-primary">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-dark font-body text-text-primary flex">
      <AdminSidebar />
      <main className="flex-1 ml-60 p-8 overflow-auto">{children}</main>
    </div>
  );
}
