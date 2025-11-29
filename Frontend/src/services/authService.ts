import Cookies from 'js-cookie';
import api from './api';

const logout = async () => {
  const token = Cookies.get('token');
  if (token) {
    try {
      await api.post('/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Erro ao fazer logout no backend:", error);
    }
  }
  Cookies.remove('token');
  localStorage.removeItem('user');
  localStorage.removeItem('userType');
};

export default { logout };
