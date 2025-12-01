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
import ProjetosOng from './pages/ong/Projetos/Projetos'
import DashboardOng from './pages/ong/Dashboard/Dashboard';
import ListagemVoluntario from './pages/ong/ListagemVoluntario/ListagemVoluntario';
import ConviteOng from './pages/ong/ConviteOng/ConviteOng';
import CriarProjeto from './pages/ong/CriarProjeto/CriarProjeto'
import EditarProjeto from './pages/ong/EditarProjeto/EditarProjeto';
import PrivateRoute from './router/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        
          <Route element={<PrivateRoute />}>
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
            <Route path="/criar/projeto/ong" element={<CriarProjeto />} />
            <Route path="/editar/projeto/ong/:id" element={<EditarProjeto />} />
          </Route>
        </Route>
        
        <Route path="*" element={<NotFoundPage />}  />
      </Routes>
    </Router>
  );
}

export default App;
