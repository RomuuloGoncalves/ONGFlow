import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';

import Login from './pages/auth/Login/Login';
import SignUp from './pages/auth/SignUp/SignUp';
import PublicHome from './pages/public/Home/Home';
import NotFoundPage from './pages/public/NotFoundPage/NotFoundPage';
import HomeVoluntario from './pages/voluntario/HomeVoluntario/HomeVoluntario';
import PerfilVoluntario from './pages/voluntario/PerfilVoluntario/PerfilVoluntario';
import PerfilOng from './pages/ong/PerfilOng/PerfilOng';
import ConviteVoluntario from './pages/voluntario/ConviteVoluntario/ConviteVoluntario';
import ProjetosDisponiveis from './pages/voluntario/ProjetosDisponiveis/ProjetoDisponiveis';
import ProjetosOng from './pages/ong/Projetos/projetos';
import DashboardOng from './pages/ong/Dashboard/Dashboard';
import ListagemVoluntario from './pages/ong/ListagemVoluntario/ListagemVoluntario';
import ConviteOng from './pages/ong/ConviteOng/ConviteOng';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Voluntario */}
          <Route path="/home/voluntario" element={<HomeVoluntario />} />
          <Route path="/perfil/voluntario" element={<PerfilVoluntario />} />
          <Route path="/convite/voluntario" element={<ConviteVoluntario />} />
          <Route path="/projetos/voluntario" element={<ProjetosDisponiveis />} />
          {/* ONG */}
          <Route path="/dashboard/ong" element={<DashboardOng/>}/>
          <Route path="/projetos/ong" element={<ProjetosOng />} />
          <Route path="/voluntarios/ong" element={<ListagemVoluntario />} />
          <Route path="/convite/ong" element={<ConviteOng />} />
          <Route path="/perfil/ong" element={<PerfilOng />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
