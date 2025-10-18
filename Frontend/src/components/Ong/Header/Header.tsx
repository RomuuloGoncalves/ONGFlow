import Logo from '@/assets/Logo.svg';
import { Dashboard } from '@/assets/icons/Dashboard';
import { Projetos } from '@/assets/icons/Projetos';
import { Convite } from '@/assets/icons/Convite';
import { Usuario } from '@/assets/icons/Usuario';
import { Logout } from '@/assets/icons/Logout';

const Header = () => {
  return (
    <aside className="h-screen w-64 bg-[var(--secondary-grey-200)] text-[var(--secondary-grey-700)] flex flex-col justify-between p-6 font-poppins">
      <div className="mb-12">
        <img src={Logo} alt="ONGFLOW" className="h-10 w-auto" /> 
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <a href="/dashboard" className="flex items-center gap-3 py-3 px-4 text-[var(--secondary-grey-700)] hover:bg-[var(--secondary-grey-300)] rounded-md transition-colors">
              <Dashboard />
              Dashboard
            </a>
          </li>
          <li>
            <a href="/projetos" className="flex items-center gap-3 py-3 px-4 text-[var(--secondary-grey-700)] hover:bg-[var(--secondary-grey-300)] rounded-md transition-colors">
              <Projetos />
              Projetos
            </a>
          </li>
          <li>
            <a href="/voluntarios" className="flex items-center gap-3 py-3 px-4 text-[var(--secondary-grey-700)] hover:bg-[var(--secondary-grey-300)] rounded-md transition-colors">
              <Usuario />
              Voluntários
            </a>
          </li>
          <li>
            <a href="/convites" className="flex items-center gap-3 py-3 px-4 text-[var(--secondary-grey-700)] hover:bg-[var(--secondary-grey-300)] rounded-md transition-colors">
              <Convite />
              Convites
            </a>
          </li>
          <li>
            <a href="/Usuario" className="flex items-center gap-3 py-3 px-4 bg-[var(--primary-purple-blue-500-primary)] text-white rounded-md shadow-[var(--shadow-5)]">
                <Usuario />
                Perfil
            </a>
          </li>
        </ul>
      </nav>
      <div className="mt-auto">
        <a href="/logout" className="flex items-center gap-3 py-3 px-4 text-[var(--secondary-grey-700)] hover:bg-[var(--secondary-grey-300)] rounded-md transition-colors">
          <Logout />
          Log Out
        </a>
      </div>
    </aside>
  );
};

export default Header;
