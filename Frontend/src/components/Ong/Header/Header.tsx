import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/assets/Logo.svg";
import { Dashboard } from "@/assets/icons/Dashboard";
import { Projetos } from "@/assets/icons/Projetos";
import { Convite } from "@/assets/icons/Convite";
import { Usuario } from "@/assets/icons/Usuario";
import { Logout } from "@/assets/icons/Logout";
import { Menu } from "@/assets/icons/Menu"
import { Fechar } from "@/assets/icons/Fechar"
const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/dashboard/ong", label: "Dashboard", icon: <Dashboard /> },
    { to: "/projetos/ong", label: "Projetos", icon: <Projetos /> },
    { to: "/voluntarios/ong", label: "Voluntários", icon: <Usuario /> },
    { to: "/convite/ong", label: "Convites", icon: <Convite /> },
    { to: "/perfil/ong", label: "Perfil", icon: <Usuario /> },
  ];

  return (
    <>
      <aside className="hidden lg:flex h-screen w-64 bg-white text-[var(--secondary-grey-700)] flex-col justify-between p-6 font-poppins shadow-sm fixed">
        <div className="mb-12">
          <img src={Logo} alt="ONGFLOW" className="h-25 w-auto m-auto" />
        </div>

        <nav>
          <ul className="space-y-4">
            {links.map((link) => {
              const isActive = location.pathname.startsWith(link.to);
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`flex items-center gap-4 py-3 px-4 rounded-md transition-colors
                      ${
                        isActive
                          ? "bg-[var(--primary-purple-blue-500)] text-white shadow-[var(--shadow-5)]"
                          : "text-[var(--secondary-grey-700)] hover:bg-[var(--secondary-grey-300)]"
                      }`}
                  >
                    <span className="w-7 h-7 flex items-center justify-center">
                      {link.icon}
                    </span>
                    <span className="text-[15px] font-medium">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto">
          <Link
            to="/logout"
            className="flex items-center gap-4 py-3 px-4 text-[var(--secondary-grey-700)] hover:bg-[var(--secondary-grey-300)] rounded-md transition-colors"
          >
            <span className="w-7 h-7 flex items-center justify-center">
              <Logout />
            </span>
            Log Out
          </Link>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-[70px] bg-white flex justify-between items-center px-4 py-3 shadow-sm">
        <img src={Logo} alt="ONGFLOW" className="h-15 w-auto" />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-[var(--secondary-grey-700)] focus:outline-none"
        >
          {menuOpen ? <Fechar width={30} /> : <Menu width={30} />}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 mt-[20px] bg-white z-40 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex flex-col justify-between h-full p-6 pt-16 font-poppins">
          <nav>
            <ul className="space-y-4">
              {links.map((link) => {
                const isActive = location.pathname.startsWith(link.to);
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-4 py-3 px-4 rounded-md transition-colors
                        ${
                          isActive
                            ? "bg-[var(--primary-purple-blue-500-primary)] text-white shadow-[var(--shadow-5)]"
                            : "text-[var(--secondary-grey-700)] hover:bg-[var(--secondary-grey-300)]"
                        }`}
                    >
                      <span className="w-7 h-7 flex items-center justify-center">
                        {link.icon}
                      </span>
                      <span className="text-[15px] font-medium">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto">
            <Link
              to="/logout"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-4 py-3 px-4 text-[var(--secondary-grey-700)] hover:bg-[var(--secondary-grey-300)] rounded-md transition-colors"
            >
              <span className="w-7 h-7 flex items-center justify-center">
                <Logout />
              </span>
              Log Out
            </Link>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
        />
      )}
    </>
  );
};

export default Header;
