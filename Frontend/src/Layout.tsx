import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export function Layout() {
  return (
    <main>
      <Outlet />
      <Toaster />
    </main>
  );
}
