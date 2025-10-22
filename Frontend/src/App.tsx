import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login/Login';
import SignUp from './pages/auth/SignUp/SignUp';
import PublicHome from './pages/public/Home/Home';
import NotFoundPage from './pages/public/NotFoundPage/NotFoundPage';
import HomeVoluntario from './pages/voluntario/HomeVoluntario/HomeVoluntario';
import PerfilVoluntario from './pages/voluntario/PerfilVoluntario/PerfilVoluntario';
import PerfilOng from './pages/ong/PerfilOng_/PerfilOng';
import ConviteVoluntario from './pages/voluntario/ConviteVoluntario/ConviteVoluntario';
import ProjetosDisponiveis from './pages/voluntario/ProjetosDisponiveis/ProjetoDisponiveis';
import ProjetosOng from './pages/ong/Projetos/projetos';

import { Layout } from './Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home/voluntario" element={<HomeVoluntario />} />
          <Route path="/perfil/voluntario" element={<PerfilVoluntario />} />
          <Route path="/perfil/ong" element={<PerfilOng />} />
          <Route path="/convite/voluntario" element={<ConviteVoluntario />} />
          <Route path="/projetos/voluntario" element={<ProjetosDisponiveis />} />
          <Route path="/projetos/ong" element={<ProjetosOng />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
