import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home/Home.jsx'; 
import SignUp from './pages/SignUp/SignUp.jsx';

function App() {
  return (
    <>
      <main className="app-content">
        <Routes>
          {/* Rotas */}
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<h1>404: Página Não Encontrada</h1>} />
        </Routes>
      </main>
    </>
  )
}

export default App;

