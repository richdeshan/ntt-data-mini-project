import { NavBar } from "./components/layouts/app-navbar";
import { AppSidebar } from "./components/layouts/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { useAuthStore } from "./store/auth-store";
import { Outlet, useNavigate } from "react-router-dom";


function App() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userInitials = `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase();

  return (
    <>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <NavBar user={user} onLogout={handleLogout}/>

          <main className="p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default App;