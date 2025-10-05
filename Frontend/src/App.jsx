import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastProvider } from './context/ToastContext';

import Home from './pages/Home/Home.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';

function App() {
  const location = useLocation();

  return (
    <ToastProvider>
      <AnimatePresence mode="wait">
        <main className="app-content">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </AnimatePresence>
    </ToastProvider>

  );
}

export default App;