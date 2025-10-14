import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login/Login';
import SignUp from './pages/auth/SignUp/SignUp';
import PublicHome from './pages/public/Home/Home';
import NotFoundPage from './pages/public/NotFoundPage/NotFoundPage';
import HomeVoluntario from './pages/voluntario/HomeVoluntario/HomeVoluntario';
import PerfilVoluntario from './pages/voluntario/Perfil/PerfilVoluntario'
import { Layout } from './Layout';

function App() {
  return (
    <Router basename="/ONGFlow/">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home/voluntario" element={<HomeVoluntario />} />
          <Route path="/perfil/voluntario" element={<PerfilVoluntario />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
