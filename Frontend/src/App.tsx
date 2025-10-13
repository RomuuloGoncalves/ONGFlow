import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login/Login';
import SignUp from './pages/auth/SignUp/SignUp';
import PublicHome from './pages/public/Home/Home';
import NotFoundPage from './pages/public/NotFoundPage/NotFoundPage';
import HomeVoluntario from './pages/voluntario/HomeVoluntario/HomeVoluntario';


function App() {
  return (
    <Router basename="/ONGFlow/">
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/home/voluntario" element={<HomeVoluntario />} />
        {/* Adicione outras rotas aqui */}
      </Routes>
    </Router>
  );
}

export default App;
