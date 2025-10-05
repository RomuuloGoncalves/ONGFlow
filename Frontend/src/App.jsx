import { Routes, Route, useLocation } from 'react-router-dom'; 
import { AnimatePresence } from 'framer-motion';

import Home from './pages/Home/Home.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <main className="app-content">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<h1>404: Página Não Encontrada</h1>} />
        </Routes>
      </main>
    </AnimatePresence>
  );
}

export default App;