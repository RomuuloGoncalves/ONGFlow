import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../services/api';
import Loading from '../components/Loading/Loading';
import useCustomToast from '../components/ui/use-toast';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { showToast } = useCustomToast();

  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get('token');
      if (!token) {
        showToast('Faça login para acessar a página', 'error');
        setIsAuthenticated(false);
        return;
      }

      try {
        await api.get('/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuthenticated(true);
      } catch (error) {
        showToast('Sua sessão expirou. Faça login novamente', 'error');
        Cookies.remove('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, [showToast]);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
