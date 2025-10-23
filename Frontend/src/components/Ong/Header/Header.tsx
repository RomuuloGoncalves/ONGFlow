import Logo from '@/assets/Logo.svg';
import { Dashboard } from '@/assets/icons/Dashboard';
import { Projetos } from '@/assets/icons/Projetos';
import { Convite } from '@/assets/icons/Convite';
import { Usuario } from '@/assets/icons/Usuario';
import { Logout } from '@/assets/icons/Logout';
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const links = [
    { to: "/dashboard/ong", label: "Dashboard", icon: <Dashboard /> },
    { to: "/projetos/ong", label: "Projetos", icon: <Projetos /> },
    { to: "/voluntarios/ong", label: "Voluntários", icon: <Usuario /> },
    { to: "/convites/ong", label: "Convites", icon: <Convite /> },
    { to: "/perfil/ong", label: "Perfil", icon: <Usuario /> },
  ];

  return (
    <aside className="h-screen w-64 bg-[var(--secondary-grey-200)] text-[var(--secondary-grey-700)] flex flex-col justify-between p-6 font-poppins">
      <div className="mb-12">
        <img src={Logo} alt="ONGFLOW" className="w-25 m-auto" /> 
      </div>

      <nav>
        <ul className="space-y-4">
          {links.map((link) => {
            const isActive = location.pathname.startsWith(link.to);

            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-3 py-3 px-4 rounded-md transition-colors
                    ${
                      isActive
                        ? "bg-[var(--primary-purple-blue-500-primary)] text-white shadow-[var(--shadow-5)]"
                        : "text-[var(--secondary-grey-700)] hover:bg-[var(--secondary-grey-300)]"
                    }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto">
        <Link
          to="/logout"
          className="flex items-center gap-3 py-3 px-4 text-[var(--secondary-grey-700)] hover:bg-[var(--secondary-grey-300)] rounded-md transition-colors"
        >
          <Logout />
          Log Out
        </Link>
      </div>
    </aside>
  );
};

export default Header;
