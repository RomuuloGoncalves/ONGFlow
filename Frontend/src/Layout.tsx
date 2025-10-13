import { Outlet } from "react-router-dom";
import Header from "./components/Voluntario/Header/Header";
import { cn } from "./lib/utils";

export function Layout() {
  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased")}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
