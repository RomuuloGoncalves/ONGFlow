import { Outlet } from "react-router-dom";
import { cn } from "./lib/utils";

export function Layout() {
  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased")}>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
